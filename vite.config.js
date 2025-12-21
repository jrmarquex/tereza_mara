import { defineConfig } from 'vite';

// Para GitHub Pages, use o nome do repositório como base
// Se o repositório for 'Site_t', deixe base como '/'
// Se for outro nome, use '/nome-do-repositorio/'
const base = process.env.NODE_ENV === 'production' ? '/' : '/';

export default defineConfig({
  base: base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        sobre: './sobre.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});

