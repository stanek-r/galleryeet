import { ColumnPage } from 'gtomy-lib';
import { Route, Routes } from 'react-router-dom';
import { Galleries } from './Galleries';
import { Gallery } from './Gallery';

export default function GalleryModule() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ColumnPage>
            <Galleries />
          </ColumnPage>
        }
      />
      <Route
        path="/:galleryId"
        element={
          <ColumnPage>
            <Gallery />
          </ColumnPage>
        }
      />
    </Routes>
  );
}
