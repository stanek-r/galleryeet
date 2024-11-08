import { Route, Routes } from 'react-router-dom';
import { Admin } from './Admin';
import { ColumnPage } from 'gtomy-lib';
import { CreateGallery } from './gallery/CreateGallery';
import { Instax } from './Instax';
import { EditGallery } from './gallery/EditGallery';
import { CreatePost } from './post/CreatePost';
import { EditPost } from './post/EditPost';

export default function AdminModule() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ColumnPage>
            <Admin />
          </ColumnPage>
        }
      />
      <Route
        path="/create-gallery"
        element={
          <ColumnPage>
            <CreateGallery />
          </ColumnPage>
        }
      />
      <Route
        path="/create-post"
        element={
          <ColumnPage>
            <CreatePost />
          </ColumnPage>
        }
      />
      <Route
        path="/instax"
        element={
          <ColumnPage>
            <Instax />
          </ColumnPage>
        }
      />
      <Route
        path="/edit-gallery/:galleryId"
        element={
          <ColumnPage>
            <EditGallery />
          </ColumnPage>
        }
      />
      <Route
        path="/edit-post/:postId"
        element={
          <ColumnPage>
            <EditPost />
          </ColumnPage>
        }
      />
    </Routes>
  );
}
