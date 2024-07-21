import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://localhost:3000/",
      '/socket.io': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
    origin: "http://localhost:3000"
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: 'src/main.jsx'
    }
  }
})
