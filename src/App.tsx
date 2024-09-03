import { Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/home/HomePage';
import {
  BASE_PROFILE_ROUTE,
  GoogleAnalyticsProvider,
  GTomyProvider,
  LoginPage,
  NOT_FOUND_ROUTE,
  PRIVACY_POLICY_ROUTE,
  RegisterPage,
  withColumnPage,
  withLazyPage,
  withRequireAuth,
} from 'gtomy-lib';
import { GalleryeetMenu } from './components/GalleryeetMenu';
import { GalleryeetFooter } from './components/GalleryeetFooter';
import { lazy } from 'react';

const GalleryModule = lazy(() => import('./modules/gallery/GalleryModule'));
const PostsModule = lazy(() => import('./modules/posts/PostsModule'));
const InstaxModule = lazy(() => import('./modules/instax/InstaxModule'));
const AdminModule = lazy(() => import('./modules/admin/AdminModule'));

function App() {
  return (
    <GTomyProvider MenuComponent={GalleryeetMenu} FooterComponent={GalleryeetFooter} displayCookies>
      <GoogleAnalyticsProvider />
      <Routes>
        <Route path="/" element={withColumnPage(HomePage)} />
        <Route path="/gallery/*" element={withLazyPage(GalleryModule)} />
        <Route path="/posts/*" element={withLazyPage(PostsModule)} />
        <Route path="/instax/*" element={withLazyPage(InstaxModule)} />
        <Route path="/admin/*" element={withRequireAuth(withLazyPage(AdminModule), 'owner')} />
        <Route path="/login" element={<LoginPage showLanguage />} />
        <Route path="/register" element={<RegisterPage showLanguage />} />
        {BASE_PROFILE_ROUTE}
        {PRIVACY_POLICY_ROUTE}
        {NOT_FOUND_ROUTE}
      </Routes>
    </GTomyProvider>
  );
}

export default App;
