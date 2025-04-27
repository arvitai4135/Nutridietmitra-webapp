import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://backend.nutridietmitra.com/docs',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
});