import react from 'react';
import Home from './pages/Home';
import  {Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import AudioToText from './pages/AudioToText';
import VideoToText from './pages/VideoToText';
import SubtitleGenerator from './pages/SubtitleGenerator';

function App(){
  return(
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}


export default App;