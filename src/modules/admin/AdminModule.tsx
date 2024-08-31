import { Route, Routes } from 'react-router-dom';
import { Admin } from './Admin';
import { withColumnPage } from 'gtomy-lib';
import { CreateGallery } from './CreateGallery';
import { Galleries } from './Galleries';
import { Instax } from './Instax';
import { EditGallery } from './EditGallery';
import { CreatePost } from './CreatePost';

export default function AdminModule() {
  return (
    <Routes>
      <Route path="/" element={withColumnPage(Admin)} />
      <Route path="/galleries" element={withColumnPage(Galleries)} />
      <Route path="/create-gallery" element={withColumnPage(CreateGallery)} />
      <Route path="/create-post" element={withColumnPage(CreatePost)} />
      <Route path="/instax" element={withColumnPage(Instax)} />
      <Route path="/edit-gallery/:galleryId" element={withColumnPage(EditGallery)} />
    </Routes>
  );
}
