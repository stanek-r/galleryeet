import { Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/home/HomePage';
import {
  ColumnPage,
  GoogleAnalyticsProvider,
  GTomyProvider,
  LazyPage,
  LoginPage,
  NotFoundPage,
  PrivacyPolicyPage,
  ProfilePage,
  RegisterPage,
  RequireAuth,
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
        <Route
          path="/"
          element={
            <ColumnPage>
              <HomePage />
            </ColumnPage>
          }
        />
        <Route path="/gallery/*" element={<LazyPage Component={GalleryModule} />} />
        <Route path="/posts/*" element={<LazyPage Component={PostsModule} />} />
        <Route path="/instax/*" element={<LazyPage Component={InstaxModule} />} />
        <Route
          path="/admin/*"
          element={
            <RequireAuth minimalRole="owner">
              <LazyPage Component={AdminModule} />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<LoginPage showLanguage />} />
        <Route path="/register" element={<RegisterPage showLanguage />} />

        <Route
          path="/profile"
          element={
            <RequireAuth minimalRole="user">
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </GTomyProvider>
  );
}

export default App;
