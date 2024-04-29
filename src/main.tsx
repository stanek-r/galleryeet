import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
import { addTranslationResources, initGTomyLib } from 'gtomy-lib';
import { version } from '../package.json';
import { CS } from './locales/cs';
import { EN } from './locales/en';

initGTomyLib({
  appName: 'galleryeet',
  appDisplayName: 'GallerYeet',
  authUrl: 'https://auth.gtomy.net',
  storageUrl: 'https://services.gtomy.net/storage',
  backendUrl: 'https://services.gtomy.net/other/galleryeet',
  sentryConfig: {
    enabled: import.meta.env.VITE_SENTRY_ENABLED === 'true',
    dsn: import.meta.env.VITE_SENTRY_DSN,
    release: version,
    environment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
    additionalTracePropagationTargets: [],
  },
  googleConfig: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    googleMeasurementId: import.meta.env.VITE_GOOGLE_MEASUREMENT_ID,
  },
});

addTranslationResources('galleryeet', { cs: CS, en: EN });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
