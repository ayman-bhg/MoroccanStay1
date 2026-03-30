// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind plugin (required)
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @ points to src
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'], // support raw imports
  base: '/MoroccanStay1/', // ✅ GitHub Pages base path
});