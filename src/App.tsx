import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { GalleryList } from './pages/GalleryList';
import { Gallery } from './pages/Gallery';
import { GTomyProvider, withColumnPage } from 'gtomy-lib';
import { GalleryeetMenu } from './components/GalleryeetMenu';
import { GalleryeetFooter } from './components/GalleryeetFooter';

function App() {
  return (
    <GTomyProvider MenuComponent={GalleryeetMenu} FooterComponent={GalleryeetFooter}>
      <Routes>
        <Route path="/" element={withColumnPage(HomePage)} />
        <Route path="/gallery" element={withColumnPage(GalleryList)} />
        <Route path="/gallery/:galleryId" element={withColumnPage(Gallery)} />
      </Routes>
    </GTomyProvider>
  );
}

export default App;
