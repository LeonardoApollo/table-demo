import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import {resolve} from 'path';
export default defineConfig({
    base: '/',
    plugins: [react()],
    server: {
      open: true,
      port: 3000,
      host: true,
    },
    resolve: {
        alias: {
          '@app': resolve(__dirname, './src/app'),
          '@entities': resolve(__dirname, './src/entities'),
          '@features': resolve(__dirname, './src/features'),
          '@pages': resolve(__dirname, './src/pages'),
          '@widgets': resolve(__dirname, './src/widgets'),
          '@shared': resolve(__dirname, './src/shared')
        }
    }
  });