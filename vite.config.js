import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works on GitHub Pages (/wedding-invitation/) and any other host.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { target: 'es2019', cssCodeSplit: false },
});
