import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { PlaylistInputCard, DirectSearchCard } from '../components/SearchCards';
import ResultsQueue from '../components/ResultsQueue';

function Home() {
  const [queueItems, setQueueItems] = useState([]);

  const handleNewVideoDispatched = (videoData) => {
    const newTrack = {
      id: videoData.video_id,         
      video_id: videoData.video_id,   
      title: videoData.title,         
      author: videoData.author,       
      thumbnail: videoData.thumbnail  
    };

    setQueueItems((prevItems) => [...prevItems, newTrack]);
  };

  const faqs = [
    { q: "Can I download an entire YouTube playlist with yt-downloader?", a: "Yes. yt-downloader supports downloading full YouTube playlists by processing all videos from a single playlist link." },
    { q: "Can I download YouTube playlists as MP3?", a: "Yes. You can convert and download complete YouTube playlists as MP3 audio files using yt-downloader." },
    { q: "Is there a length limit for playlists?", a: "No. yt-downloader supports downloading playlists of different sizes without length restrictions." },
    { q: "Does yt-downloader require software installation?", a: "No. yt-downloader works online directly in your browser without installing any software." },
    { q: "Does yt-downloader work on mobile devices?", a: "Yes. yt-downloader works on both Android and iOS devices through mobile browsers." }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 via-gray-100/70 to-white font-sans antialiased flex flex-col selection:bg-blue-600 selection:text-white">

      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 space-y-8 flex-grow">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PlaylistInputCard 
            hasResults={queueItems.length > 0} 
            onVideoDispatched={handleNewVideoDispatched} 
          />
          <DirectSearchCard />
        </div>

        {queueItems.length > 0 && (
          <ResultsQueue items={queueItems} />
        )}

        <hr className="border-gray-200/80 my-6" />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-4">
          <div className="lg:col-span-7 space-y-6 text-gray-600 text-xs sm:text-sm leading-relaxed">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-[#0d3559] mb-3">
                Download YouTube Playlists Online with yt-downloader
              </h2>
              <p>
                <strong>yt-downloader</strong> is an online YouTube playlist downloader that supports downloading both single videos and full YouTube playlists. Instead of downloading videos one by one, our engine allows you to process and download all videos from a playlist using a single playlist link.
              </p>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#0d3559] mb-1.5">
                Download Full YouTube Playlists Easily
              </h3>
              <p>
                Built for users who want to save entire music playlists, video series, or audio collections without unnecessary configurations. The platform automatically indexes all tracks, mapping formats to high-speed MP3 audio tracks or rich crisp MP4 video packages effortlessly directly inside your browser framework.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <h3 className="text-xs font-black uppercase text-[#0d3559] tracking-wider mb-2">
                How to Download a YouTube Playlist
              </h3>
              <ul className="list-decimal list-inside space-y-1 text-xs font-medium text-gray-700">
                <li>Copy the URL link of the YouTube playlist you want to process.</li>
                <li>Paste the playlist link into the dynamic wrapper input box above.</li>
                <li>Choose your target MP3 or MP4 format structures.</li>
                <li>Click the start button and download all compressed files directly to your device.</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-black tracking-tight text-[#0d3559]">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-gray-300 transition duration-200">
                  <h4 className="text-[11px] font-black text-[#0d3559] uppercase tracking-wider mb-1.5">
                    {faq.q}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-gray-400 gap-4">
          <div>© 2026 yt-downloader. All Rights Reserved.</div>
          <div className="flex gap-4">
            <span className="hover:text-gray-600 cursor-pointer transition">Report DMCA</span>
            <span className="hover:text-gray-600 cursor-pointer transition">Copyright Disclaimer</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Home;