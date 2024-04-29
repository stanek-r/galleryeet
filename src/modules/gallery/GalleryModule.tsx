import { withColumnPage } from 'gtomy-lib';
import { Route, Routes } from 'react-router-dom';
import { Galleries } from './Galleries';
import { Gallery } from './Gallery';

export default function GalleryModule() {
  return (
    <Routes>
      <Route path="/" element={withColumnPage(Galleries)} />
      <Route path="/:galleryId" element={withColumnPage(Gallery)} />
    </Routes>
  );
}
