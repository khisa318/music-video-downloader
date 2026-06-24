from flask import Flask , request, jsonify
from flask_cors import CORS
import yt_dlp
import os
import re
import sys
import threading

app = Flask(__name__)

DOWNLOAD_DIR = "./downloads"

# 🔥 Thread-safe memory stores
DOWNLOAD_PROGRESS = {}
DOWNLOAD_RESULT = {}


# 🔧 Common yt-dlp config
def get_ydl_opts(extra_opts=None):
    base_opts = {
        "quiet": True,
        "http_headers": {
            "User-Agent": "com.google.android.youtube/17.31.35 (Linux; U; Android 11)"
        },
        "extractor_args": {
            "youtube": {
                "player_client": ["android", "web"]
            }
        }
    }

    if extra_opts:
        base_opts.update(extra_opts)

    return base_opts


# 🎯 Extract video ID cleanly
def get_video_id(url):
    match = re.search(r"(?:v=|\/v\/|youtu\.be\/|\/embed\/)([\w-]+)", url)
    return match.group(1) if match else "unknown"


# 📊 Progress hook
def progress_hook(video_id):
    def hook(d):
        if d['status'] == 'downloading':
            percent = d.get('_percent_str', '0%').strip()
            speed = d.get('_speed_str', '').strip()
            eta = d.get('_eta_str', '').strip()

            DOWNLOAD_PROGRESS[video_id] = percent
            print(f"[{video_id}] {percent} | Speed: {speed} | ETA: {eta}")
            sys.stdout.flush()

        elif d['status'] == 'finished':
            DOWNLOAD_PROGRESS[video_id] = "100%"
            print(f"[{video_id}] Download completed ✅")
            sys.stdout.flush()

    return hook


# ⬇️ Async Download Task Worker
def download_video(url, resolution):
    video_id = get_video_id(url)
    actual_resolution = "unknown"

    try:
        height = resolution.replace("p", "")
        DOWNLOAD_PROGRESS[video_id] = "0%"

        video_dir = os.path.join(DOWNLOAD_DIR, resolution)
        # Fixed variable mismatch bug here (output_path -> video_dir)
        os.makedirs(video_dir, exist_ok=True)

        ydl_opts = get_ydl_opts({
            "format": f"bv*[height={height}]+ba/b",
            "outtmpl": os.path.join(video_dir, "%(title)s.%(ext)s"),
            "merge_output_format": "mp4",
            "progress_hooks": [progress_hook(video_id)],
        })

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                if info and isinstance(info, dict):
                    height_val = info.get("height")
                    if height_val:
                        actual_resolution = f"{height_val}p"

        except Exception as fallback_err:
            print(f"[{video_id}] Exact match failed, triggering fallback option... {fallback_err}")
            sys.stdout.flush()

            fallback_opts = get_ydl_opts({
                "format": f"bv*[height<={height}]+ba/b",
                "outtmpl": os.path.join(video_dir, "%(title)s.%(ext)s"),
                "merge_output_format": "mp4",
                "progress_hooks": [progress_hook(video_id)],
            })

            with yt_dlp.YoutubeDL(fallback_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                if info and isinstance(info, dict):
                    height_val = info.get("height")
                    if height_val:
                        actual_resolution = f"{height_val}p"

    except Exception as e:
        print(f"[ERROR ON WORKER THREAD] {e}")
        sys.stdout.flush()

    # Always write to memory state registry safely
    DOWNLOAD_RESULT[video_id] = {
        "requested_resolution": resolution,
        "actual_resolution": actual_resolution,
        "status": "completed" if actual_resolution != "unknown" else "failed"
    }


# 🌐 API Routing Layout

@app.route("/")
def home():
    return jsonify({"status": "online", "engine": "yt-dlp framework API"}), 200


@app.route("/download/<resolution>", methods=["POST"])
def download(resolution):
    data = request.get_json() or {}
    url = data.get("url")

    if not url:
        return jsonify({"error": "Missing 'url' parameter in payload"}), 400

    video_id = get_video_id(url)

    # Spawn daemon fallback worker thread
    thread = threading.Thread(
        target=download_video,
        args=(url, resolution),
        daemon=True
    )
    thread.start()

    return jsonify({
        "message": "Download thread dispatched successfully",
        "video_id": video_id
    }), 200


@app.route("/progress/<video_id>", methods=["GET"])
def get_progress(video_id):
    return jsonify({
        "video_id": video_id,
        "progress": DOWNLOAD_PROGRESS.get(video_id, "0%")
    }), 200


@app.route("/result/<video_id>", methods=["GET"])
def get_result(video_id):
    return jsonify(
        DOWNLOAD_RESULT.get(video_id, {
            "status": "processing",
            "message": "Download sequence stream is working or track is missing"
        })
    ), 200


if __name__ == "__main__":
    os.makedirs(DOWNLOAD_DIR, exist_ok=True)
    port = int(os.environ.get("PORT", 8888))
    app.run(host="0.0.0.0", port=port, threaded=True)