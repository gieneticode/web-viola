import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  // Allow the Cloudflare quick-tunnel hostname (and any proxy) to reach the
  // dev/preview server — otherwise Vite returns 403 "Invalid Host header".
  server: { allowedHosts: true },
  preview: { allowedHosts: true },
})
