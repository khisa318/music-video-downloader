import React, { useState } from 'react';
import { startDownload } from '../api';

export const PlaylistInputCard = ({ hasResults, onToggleResults, onVideoDispatched }) => {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [resolution, setResolution] = useState('1080p');
  const [formatType, setFormatType] = useState('MP3');
  const [loading, setLoading] = useState(false);

  const handleStartDownload = async () => {
    if (!playlistUrl) return alert("Please enter a valid link!");
    
    setLoading(true);
    try {
      const targetQuality = formatType === 'MP3' ? '1080p' : resolution;
      const data = await startDownload(playlistUrl, targetQuality);
      
      if (data && data.video_id) {
        onVideoDispatched(data);
        if (!hasResults && onToggleResults) onToggleResults();
      }
    } catch (err) {
      console.error("Failed to connect to backend:", err);
      alert(err.response?.data?.error || "Could not reach backend. Make sure your Python server is running on port 8888!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[2rem] bg-white p-6 sm:p-8 shadow-xl shadow-gray-200/50 border border-gray-200/60 flex flex-col justify-between transition hover:shadow-2xl hover:shadow-gray-200/60 duration-300">
      <div>
        <h2 className="text-center text-2xl font-black tracking-tight text-[#0d3559] mb-4">
          YouTube Playlist Downloader
        </h2>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              placeholder="Paste playlist URL here..."
              className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-3.5 pl-5 pr-12 text-sm font-medium text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition shadow-inner"
            />
            <span 
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                setPlaylistUrl(text);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg cursor-pointer hover:text-gray-600 select-none"
              title="Paste from clipboard"
            >
              📋
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-full bg-gray-100 p-1 font-bold text-xs">
                <button 
                  type="button" 
                  onClick={() => setFormatType('MP3')}
                  className={`rounded-full px-4 py-1.5 shadow-sm transition ${formatType === 'MP3' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  MP3
                </button>
                <button 
                  type="button" 
                  onClick={() => setFormatType('MP4')}
                  className={`rounded-full px-4 py-1.5 shadow-sm transition ${formatType === 'MP4' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  MP4
                </button>
              </div>

              {formatType === 'MP4' ? (
                <select 
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 outline-none cursor-pointer shadow-sm focus:border-blue-500"
                >
                  <option value="1080p">1080p Quality</option>
                  <option value="720p">720p HD</option>
                  <option value="480p">480p Medium</option>
                </select>
              ) : (
                <select className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 outline-none cursor-pointer shadow-sm focus:border-blue-500">
                  <option>MP3 - 320kbps</option>
                  <option>MP3 - 128kbps</option>
                </select>
              )}

              <select className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 outline-none cursor-pointer shadow-sm focus:border-blue-500">
                <option>Origin</option>
              </select>
            </div>

            <button 
              onClick={handleStartDownload} 
              type="button" 
              disabled={loading}
              className="rounded-full bg-blue-600 text-white px-6 py-2 text-xs font-black tracking-wide hover:bg-blue-700 disabled:opacity-50 active:scale-95 transition shadow-md shadow-blue-500/20"
            >
              {loading ? "Processing..." : "Start"}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-blue-50/50 p-3 border border-blue-100/70 mt-6">
        <label className="flex items-start gap-2.5 select-none cursor-pointer">
          <input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/30" />
          <span className="text-[11px] font-medium leading-relaxed text-gray-600">
            I confirm that I agree to the standards in the <span className="text-blue-600 underline font-semibold">Copyright Disclaimer</span> and will not download copyrighted content.
          </span>
        </label>
      </div>
    </div>
  );
};

export const DirectSearchCard = () => {
  return (
    <div className="rounded-[2rem] bg-white p-6 sm:p-8 shadow-xl shadow-gray-200/50 border border-gray-200/60 flex flex-col justify-between transition hover:shadow-2xl hover:shadow-gray-200/60 duration-300">
      <div>
        <h2 className="text-lg font-black tracking-tight text-[#0d3559]">
          Direct Song Search
        </h2>
        <p className="mt-0.5 text-xs text-gray-400">Find track audio streams instantly without web listing links.</p>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">Track Title Keywords</label>
            <input
              type="text"
              placeholder="e.g., Drake Passionfruit audio stream..."
              className="w-full rounded-full border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition shadow-inner"
            />
          </div>

          <button type="button" className="w-full rounded-full bg-gray-900 text-white px-4 py-2.5 text-xs font-black tracking-wide hover:bg-gray-800 active:scale-95 transition shadow-md">
            Search Engine
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-gray-200 p-4 text-center text-xs font-semibold text-gray-400 bg-gray-50/50">
        Keyword streams append here.
      </div>
    </div>
  );
};