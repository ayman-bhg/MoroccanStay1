// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // ✅ Plugins
  plugins: [
    // React plugin
    react(),
    // Tailwind plugin (required for Make)
    tailwindcss(),
  ],

  // ✅ Resolve aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @ points to src
    },
  },

  // ✅ File types to support raw imports
  assetsInclude: ['**/*.svg', '**/*.csv'],

  // ✅ Base path for GitHub Pages
  base: '/MoroccanStay1/', // <-- THIS IS THE KEY CHANGE
});