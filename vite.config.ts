import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        home:        resolve(__dirname, 'index.html'),
        works:       resolve(__dirname, 'works/index.html'),
        worlds:      resolve(__dirname, 'worlds/index.html'),
        artist:      resolve(__dirname, 'artist/index.html'),
        collections: resolve(__dirname, 'collections/index.html'),
        artwork:     resolve(__dirname, 'artwork/index.html'),
        contact:     resolve(__dirname, 'contact/index.html'),
      }
    }
  },
  server: {
    open: '/index.html'
  }
})
