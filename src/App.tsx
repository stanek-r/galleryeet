import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { defaultQueryClient, DialogProvider, LoginForm, RegisterForm } from 'gtomy-lib';
import { HomePage } from './pages/HomePage';
import { QueryClientProvider } from '@tanstack/react-query';
import { GalleryeetMenu } from './components/GalleryeetMenu';
import { GalleryeetFooter } from './components/GalleryeetFooter';

function LoginPage() {
  return (
    <div className="flex h-screen flex-col">
      <GalleryeetMenu />
      <LoginForm />
      <GalleryeetFooter />
    </div>
  );
}

function RegisterPage() {
  return (
    <div className="flex h-screen flex-col">
      <GalleryeetMenu />
      <RegisterForm />
      <GalleryeetFooter />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={defaultQueryClient}>
        <DialogProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </DialogProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
