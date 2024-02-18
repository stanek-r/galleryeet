import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { GalleryList } from './pages/GalleryList';
import { Gallery } from './pages/Gallery';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryList />} />
        <Route path="/gallery/:galleryId" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
