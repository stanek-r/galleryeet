import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
import { addTranslationResources, initGTomyLib } from 'gtomy-lib';
import { CS } from './locales/cs';
import { EN } from './locales/en';

initGTomyLib({
  appName: 'galleryeet',
  appDisplayName: 'GallerYeet',
});

addTranslationResources('galleryeet', { cs: CS, en: EN });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
