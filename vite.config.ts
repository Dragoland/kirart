import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// base '/' (no './'): con rutas como /gallery/comics los assets deben cargarse desde la raíz.
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: { alias: { '@': resolve(__dirname, './src') } },
  build: { outDir: 'dist', sourcemap: false },
  server: { port: 5173 },
});
