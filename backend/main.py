from flask import Flask, request, jsonify
from flask_cors import CORS
import yt_dlp
import os
import threading

app = Flask(__name__)
CORS(app)

# Track progress status dynamically across background worker threads
progress_registry = {}

def progress_hook(d):
    if d['status'] == 'downloading':
        filename = d.get('filename', '')
        video_id = os.path.basename(filename).split('.')[0]
        
        percent_str = d.get('_percent_str', '0.0%').strip()
        # Clean up any potential terminal color formatting codes
        percent_str = ''.join(c for c in percent_str if c.isdigit() or c in ['.', '%'])
        
        if video_id:
            progress_registry[video_id] = percent_str
            
    elif d['status'] == 'finished':
        filename = d.get('filename', '')
        video_id = os.path.basename(filename).split('.')[0]
        if video_id:
            progress_registry[video_id] = '100%'

def run_download_worker(url, resolution, video_id):
    outtmpl = f'downloads/{resolution}/%(title)s.%(ext)s'
    
    ydl_opts = {
        'format': 'bestvideo[height<=1080]+bestaudio/best' if resolution == '1080p' else 'best',
        'outtmpl': outtmpl,
        'progress_hooks': [progress_hook],
        'quiet': True,
        'no_warnings': True
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
    except Exception as e:
        print(f"Worker download crash: {str(e)}")
        progress_registry[video_id] = 'Error'

@app.route('/download/<resolution>', methods=['POST'])
def start_download(resolution):
    data = request.json or {}
    url = data.get('url')
    
    if not url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        # Fetch data context cleanly first to bypass Windows thread locks
        meta_opts = {'extract_flat': True, 'quiet': True}
        with yt_dlp.YoutubeDL(meta_opts) as ydl:
            meta = ydl.extract_info(url, download=False)
            
        video_id = meta.get('id', 'unknown_id')
        title = meta.get('title', 'Unknown Title')
        author = meta.get('uploader', 'Unknown Channel')
        thumbnail = meta.get('thumbnail') or (meta.get('thumbnails')[0]['url'] if meta.get('thumbnails') else '')

        progress_registry[video_id] = '0%'

        # Spin off processing down to background thread workers asynchronously
        threading.Thread(target=run_download_worker, args=(url, resolution, video_id), daemon=True).start()

        return jsonify({
            "video_id": video_id,
            "title": title,
            "author": author,
            "thumbnail": thumbnail
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/progress/<video_id>', methods=['GET'])
def get_progress(video_id):
    current_progress = progress_registry.get(video_id, '0%')
    return jsonify({"video_id": video_id, "progress": current_progress})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, debug=False)