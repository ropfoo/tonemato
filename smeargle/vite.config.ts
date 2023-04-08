import solid from 'solid-start/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [solid()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
  },
});
