import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import postcssConfig from './postcss.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: path.resolve(root, 'backend/src/main/resources/static'),
    sourcemap: false,
    emptyOutDir: true,
  },
  css: {
    postcss: postcssConfig,
  },
  root: root,
});
