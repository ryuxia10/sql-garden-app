import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path" // <-- Tambahkan baris ini

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Tambahkan bagian resolve di bawah ini
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})