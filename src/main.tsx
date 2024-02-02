import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
import { initGTomyLib } from 'gtomy-lib';

initGTomyLib({
  appName: 'galleryeet',
  appDisplayName: 'GallerYeet',
  authUrl: 'https://auth.gtomy.net',
  backendUrl: 'https://services.gtomy.net',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
