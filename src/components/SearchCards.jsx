import React from 'react';

import React, { useState } from 'react';

export const PlaylistInputCard = ({ hasResults, onToggleResults, onVideoDispatched }) => {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartDownload = async () => {
    if (!playlistUrl) return alert("Please enter a valid link!");
    
    setLoading(true);
    try {
      // Send a POST request to the Flask server
      const response = await fetch('http://localhost:8888/download/1080p', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: playlistUrl }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Pass the new video_id up to the parent layout to track progress
        onVideoDispatched(data.video_id);
        if (!hasResults) onToggleResults(); 
      } else {
        alert("Server Error: " + data.error);
      }
    } catch (err) {
      console.error("Failed to connect to backend:", err);
      alert("Could not reach backend. Make sure your Python server is running on port 8888!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[2rem] bg-white p-6 sm:p-8 shadow-xl border border-gray-200/60 flex flex-col justify-between">
      <div>
        <h2 className="text-center text-2xl font-black text-[#0d3559] mb-4">
          YouTube Playlist Downloader
        </h2>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              placeholder="Paste playlist URL here..."
              className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-3.5 pl-5 pr-12 text-sm font-medium text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-blue-500 transition"
            />
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button 
              onClick={handleStartDownload}
              type="button" 
              disabled={loading}
              className="rounded-full bg-blue-600 text-white px-6 py-2 text-xs font-black tracking-wide hover:bg-blue-700 disabled:opacity-50 transition shadow-md"
            >
              {loading ? "Processing..." : "Start"}
            </button>
          </div>
        </div>
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