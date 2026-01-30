// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Faster than @vitejs/plugin-react

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    sourcemap: false, // Disabling sourcemaps significantly speeds up the 'transforming' phase
    rollupOptions: {
      cache: false, // Prevents corrupted cache from causing loops
      output: {
        manualChunks: {
          // Splitting large vendor modules helps the transformer handle chunks more efficiently
          vendor: ['lucide-react', '@google/generative-ai'], 
        },
      },
    },
  },
});
