import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/GOA-EXAM-PREP-GAME/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
