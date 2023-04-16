import solid from 'solid-start/vite';
import { defineConfig } from 'vite';

const {
  SMEARGLE_PORT
} = process.env

export default defineConfig({
  plugins: [solid()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    port: Number(SMEARGLE_PORT) || 3000
  },
});
