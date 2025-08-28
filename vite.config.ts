import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/car-assistance-frontend/',
  plugins: [react()],
  server: {
    port: 5173, // ← змінив тут порт
  },
})
