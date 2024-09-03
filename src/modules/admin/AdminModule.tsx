import { Route, Routes } from 'react-router-dom';
import { Admin } from './Admin';
import { withColumnPage } from 'gtomy-lib';
import { CreateGallery } from './gallery/CreateGallery';
import { Instax } from './Instax';
import { EditGallery } from './gallery/EditGallery';
import { CreatePost } from './post/CreatePost';
import { EditPost } from './post/EditPost';

export default function AdminModule() {
  return (
    <Routes>
      <Route path="/" element={withColumnPage(Admin)} />
      <Route path="/create-gallery" element={withColumnPage(CreateGallery)} />
      <Route path="/create-post" element={withColumnPage(CreatePost)} />
      <Route path="/instax" element={withColumnPage(Instax)} />
      <Route path="/edit-gallery/:galleryId" element={withColumnPage(EditGallery)} />
      <Route path="/edit-post/:postId" element={withColumnPage(EditPost)} />
    </Routes>
  );
}
