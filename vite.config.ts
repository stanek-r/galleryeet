import { defineConfig } from 'vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import { version } from './package.json';

const ReactCompilerConfig = {
  target: '18',
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index-[hash].js',
        chunkFileNames: 'assets/chunk-[hash].js',
        assetFileNames: 'assets/asset-[hash].[ext]',
        manualChunks: {
          sentry: ['@sentry/react'],
          'google-oauth': ['@react-oauth/google'],
          'react-ga4': ['react-ga4'],
        },
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    sentryVitePlugin({
      disable: process.env.SENTRY_PLUGIN_ENABLED !== 'true',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'gtomy',
      project: 'galleryeet',
      release: {
        name: version,
        cleanArtifacts: true,
      },
      sourcemaps: {
        filesToDeleteAfterUpload: ['dist/**/*.map'],
      },
    }),
  ],
});
