import React from 'react';
import {NavLink} from 'react-router-dom';

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
          <NavLink to="/" className="text-blue-600">
            Home
          </NavLink>
          <NavLink to="/audio-to-text" className="text-gray-500 hover:text-gray-900 transition">
            Audio to Text
          </NavLink>
          <NavLink to="/video-to-text" className="text-gray-500 hover:text-gray-900 transition">
            Video to Text
          </NavLink>
          <NavLink to="/subtitle-generator" className="hidden sm:inline-block text-gray-500 hover:text-gray-900 transition">
            Subtitle Generator
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;