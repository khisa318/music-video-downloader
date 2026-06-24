import React from 'react';
import Navbar from '../components/Navbar';

function NotFound() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 via-gray-100/70 to-white font-sans antialiased flex flex-col selection:bg-blue-600 selection:text-white">

      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 flex-grow flex items-center justify-center py-16">
        <div className="max-w-md w-full text-center space-y-6 rounded-[2rem] bg-white p-8 sm:p-10 shadow-xl shadow-gray-200/50 border border-gray-200/60 transition hover:shadow-2xl hover:shadow-gray-200/60 duration-300">
          
          {/* Accent Badge Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 font-black text-2xl mb-2 shadow-inner border border-blue-100/40">
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tight text-[#0d3559]">
              Page Not Found
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              The link you followed may be broken, or the directory stream index layout page has been moved.
            </p>
          </div>

          {/* Quick Informational Link Container */}
          <div className="rounded-xl bg-gray-50 p-4 border border-gray-200/60 text-left text-xs font-medium text-gray-600 space-y-1">
            <span className="block text-[11px] font-black uppercase tracking-wider text-[#0d3559] mb-1">
              Looking for something else?
            </span>
            <p>• Extract audio files directly via playlist links.</p>
            <p>• Check indexing stream pipelines configuration status.</p>
          </div>

          {/* Action Buttons styled to match input actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <a 
              href="/"
              className="w-full sm:w-auto inline-block rounded-full bg-blue-600 text-white px-8 py-3 text-xs font-black tracking-wide text-center hover:bg-blue-700 active:scale-95 transition shadow-md shadow-blue-500/20"
            >
              Return Home
            </a>
            <button 
              type="button" 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-block rounded-full bg-gray-900 text-white px-8 py-3 text-xs font-black tracking-wide text-center hover:bg-gray-800 active:scale-95 transition shadow-md"
            >
              Go Back
            </button>
          </div>

        </div>
      </main>

      {/* Simplified Footer Sticky Base */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 border-t border-gray-200 flex items-center justify-between text-xs font-bold text-gray-400">
        <div>© 2026 yt-downloader. All Rights Reserved.</div>
        <div className="flex gap-4">
          <span className="hover:text-gray-600 cursor-pointer transition">Report DMCA</span>
        </div>
      </footer>
    </div>
  );
}

export default NotFound;