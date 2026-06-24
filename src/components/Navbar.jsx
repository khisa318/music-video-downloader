import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-black tracking-tight text-gray-900 cursor-pointer hover:opacity-80 transition">
            yt<span className="text-blue-600">.</span>downloader
          </span>
        </div>
        <div className="flex items-center gap-5 font-bold text-xs sm:text-sm">
          <button type="button" className="text-blue-600">Home</button>
          <button type="button" className="text-gray-500 hover:text-gray-900 transition">Audio to Text</button>
          <button type="button" className="text-gray-500 hover:text-gray-900 transition">Video to Text</button>
          <button type="button" className="hidden sm:inline-block text-gray-500 hover:text-gray-900 transition">Subtitle Generator</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;