import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssr: {
    // Configurações para evitar erros de SSR na Vercel
    noExternal: ['react-router-dom'],
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
  },
  build: {
    // Configurações para build otimizado
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
  server: {
    // Configurações do servidor de desenvolvimento
    middlewareMode: false,
  },
})
