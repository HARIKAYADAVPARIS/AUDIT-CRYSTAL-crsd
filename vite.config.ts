// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // SWC is faster and more stable for large builds

export default defineConfig({
  plugins: [react()],
  build: {
    // Disabling sourcemaps can prevent the transformer from hanging on large files
    sourcemap: false, 
    rollupOptions: {
      // Prevents memory loops by clearing the build cache
      cache: false,
      output: {
        manualChunks: {
          // Splitting heavy dependencies unburdens the transformer
          vendor: ['lucide-react', '@google/generative-ai'],
        },
      },
    },
  },
});
