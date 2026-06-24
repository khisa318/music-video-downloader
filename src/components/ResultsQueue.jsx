import React, { useState, useEffect } from 'react';
import { getDownloadProgress } from '../api';

const QueueItemRow = ({ item, activeTab }) => {
  const [progress, setProgress] = useState('0%');

  useEffect(() => {
    if (!item.video_id || activeTab === 'convert') return;

    const interval = setInterval(async () => {
      try {
        const data = await getDownloadProgress(item.video_id);
        if (data && data.progress) {
          setProgress(data.progress);
          if (data.progress === '100%') {
            clearInterval(interval);
          }
        }
      } catch (err) {
        console.error("Failed to query runtime progress: ", err);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [item.video_id, activeTab]);

  return (
    <div className="p-4 sm:px-6 flex items-start gap-4 hover:bg-gray-50/40 transition">
      <input type="checkbox" className="mt-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500/20" />
      
      <div className="relative flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video w-24 sm:w-28 shadow-sm">
        <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug">
          {item.title}
        </h4>
        <p className="text-[11px] font-medium text-gray-400 mt-0.5">{item.author}</p>

        {activeTab === 'convert' ? (
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] font-bold text-gray-400">
            <span className="hover:text-gray-700 cursor-pointer transition">Origin ▾</span>
            <span className="hover:text-gray-700 cursor-pointer transition">MP3 ▾</span>
            <span className="hover:text-gray-700 cursor-pointer transition">MP3 - 128kbps ▾</span>
          </div>
        ) : (
          <div className="mt-3 max-w-xl">
            <div className="flex items-center justify-between text-[11px] font-bold text-blue-600 mb-1">
              <span className="tracking-wide">
                {progress === '100%' ? "Completed ✅" : "Downloading..."}
              </span>
              <span>{progress}</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-300" 
                style={{ width: progress }}
              />
            </div>
          </div>
        )}
      </div>

      <button className="text-red-400 hover:text-red-600 hover:bg-red-50 text-sm p-2 transition self-center rounded-xl">
        🗑️
      </button>
    </div>
  );
};

const ResultsQueue = ({ items }) => {
  const [activeTab, setActiveTab] = useState('download');
  const [isAutoChecked, setIsAutoChecked] = useState(false);

  return (
    <div className="w-full rounded-[2rem] bg-white overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-200/70 transition-all duration-300">
      <div className="bg-[#f8fafc] border-b border-gray-200/80 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black text-gray-400">^</span>
          <span className="text-base font-extrabold text-[#0d3559]">Download Queue ({items.length} items)</span>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-gray-200/60 p-1 text-xs font-bold">
          <button 
            onClick={() => setActiveTab('convert')}
            className={`rounded-lg px-4 py-1.5 transition ${activeTab === 'convert' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Convert Tab
          </button>
          <button 
            onClick={() => setActiveTab('download')}
            className={`rounded-lg px-4 py-1.5 transition ${activeTab === 'download' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Download Progress
          </button>
        </div>
      </div>

      <div className="px-6 py-3.5 border-b border-gray-100 flex items-center justify-between bg-white">
        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 cursor-pointer select-none">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500/20" defaultChecked />
          <span>{items.length} selected</span>
        </label>

        {activeTab === 'convert' ? (
          <button className="rounded-xl border border-blue-100 bg-blue-50/60 px-5 py-2 text-xs font-bold text-blue-600 hover:bg-blue-100/70 transition shadow-sm">
            Convert selected
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isAutoChecked}
                onChange={() => setIsAutoChecked(!isAutoChecked)}
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500 relative"></div>
              <span>Auto</span>
            </label>

            <button className="flex items-center gap-1.5 rounded-xl bg-[#a3f3cb] text-[#0d3c24] font-black px-5 py-2 text-xs hover:bg-[#8ee7ba] transition shadow-sm">
              <span>📦</span> Download zip
            </button>
          </div>
        )}
      </div>

      <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto bg-white">
        {items.map((item) => (
          <QueueItemRow key={item.id} item={item} activeTab={activeTab} />
        ))}
      </div>
    </div>
  );
};

export default ResultsQueue;