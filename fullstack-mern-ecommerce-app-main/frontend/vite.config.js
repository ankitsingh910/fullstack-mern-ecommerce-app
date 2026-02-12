import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  server: mode === 'development'
    ? {
        port: 5173,
        proxy: {
          '/api': 'http://localhost:5000',
        },
        hmr: {
          host: 'localhost',
          port: 5173,
          protocol: 'ws',
        },
      }
    : undefined,
}))
