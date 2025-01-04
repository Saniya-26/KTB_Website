import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: 
  [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Proxy API requests to Express server
    },
  }
  [vue()],
  resolve: {
    alias: {
      'style': path.resolve(__dirname, 'src/styles')
    }
  } 
});

