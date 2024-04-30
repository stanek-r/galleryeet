import { Route, Routes } from 'react-router-dom';
import { Admin } from './Admin';
import { withColumnPage } from 'gtomy-lib';
import { CreateGallery } from './CreateGallery';
import { Galleries } from './Galleries';
import { Instax } from './Instax';

export default function AdminModule() {
  return (
    <Routes>
      <Route path="/" element={withColumnPage(Admin)} />
      <Route path="/galleries" element={withColumnPage(Galleries)} />
      <Route path="/create-gallery" element={withColumnPage(CreateGallery)} />
      <Route path="/instax" element={withColumnPage(Instax)} />
    </Routes>
  );
}
