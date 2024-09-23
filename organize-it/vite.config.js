import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets',  // Source folder
          dest: './'      // Destination folder in dist
        }
      ]
    })
  ],
  base: './',  // This ensures relative paths in the final build
  build: {
    outDir: '../dist',  // Output to root-level dist folder for Electron to access
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
