import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // Change this if your app is not hosted at the root
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true
  },
  server: {
    port: 3306,
    strictPort: true,
    host: true
  }
});