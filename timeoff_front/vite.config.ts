import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ open: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('chart.js')) return 'charts';
            if (id.includes('react-day-picker')) return 'calendar';
            if (id.includes('recharts')) return 'recharts';
            return 'vendor'; // everything else
          }
        }
      },
    },
  },
})

