At its core, this app is a Universal Media Saver. Instead of forcing you to use five different sketchy websites to save a video or a song, this app gives you one clean dashboard to search for, stream, and download media from across the entire internet.

Here are the four core things your app handles:

1. The Social Media Downloader (Videos & Clips)
How it works: You paste a link from apps like TikTok, Instagram Reels, YouTube Shorts, Twitter (X), or Facebook.

The Engine: The Flask backend takes that link and passes it to yt-dlp.

The Result: It strips out the background trackers and ads, grabs the highest quality video file available, and downloads it cleanly to your device as an MP4.

2. The YouTube Music Extractor (Songs & Playlists)
How it works: You paste a standard YouTube video link, a YouTube Music link, or even an entire playlist link.

The Engine: The Flask backend tells yt-dlp to ignore the video completely and only download the raw audio stream. Then, FFmpeg cuts in to convert that audio into a crisp, standardized MP3 file.

The Result: You get high-quality audio tracking with automatic file naming based on the video title.

3. The Spotify Music Downloader
How it works: You paste a Spotify track, album, or playlist URL.

The Engine: Because Spotify encrypts its raw files, you use spot-dl (a Python library built specifically for this). spot-dl looks at the Spotify link, copies the song name/artist, automatically finds the matching high-quality audio on YouTube, downloads it, and injections the official Spotify album art, lyrics, and metadata directly into the file.

The Result: You get a perfectly tagged MP3 file that looks exactly like it came straight out of Spotify, complete with cover art.

4. Direct Music Search & Grab
How it works: You don't even have to open YouTube or Spotify to copy a link. You just type something like "Blinding Lights Weeknd" directly into your app's search bar.

The Engine: The backend uses yt-dlp's search function (ytsearch:) to scour the web for the best match behind the scenes.

The Result: The app finds the best audio match instantly, presents it to you, and lets you hit "Download" right then and there.

🧭 How the Whole System Flows Together
You (The User): Interact with the React frontend (Vite), typing a search term or pasting a TikTok/Spotify/YouTube link.

The Frontend: Sends that data as a request to your Flask backend server.

The Backend: Looks at the request. If it's a Spotify link, it hands it to spot-dl. If it's anything else, it hands it to yt-dlp.

The Processing Engine: The files are downloaded to the server, converted/polished using FFmpeg, and then streamed right back to your browser for instant saving.