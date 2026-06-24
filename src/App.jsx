import react from 'react';
import Home from './pages/Home';
import  {Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';

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