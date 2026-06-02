import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Wang_art/' : '/',
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        home:        resolve(import.meta.dirname, 'index.html'),
        works:       resolve(import.meta.dirname, 'works/index.html'),
        worlds:      resolve(import.meta.dirname, 'worlds/index.html'),
        artist:      resolve(import.meta.dirname, 'artist/index.html'),
        collections: resolve(import.meta.dirname, 'collections/index.html'),
      }
    }
  },
  server: {
    open: '/'
  }
}))
