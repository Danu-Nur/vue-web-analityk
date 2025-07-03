import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          apexcharts: ['apexcharts'],
          // 'chart-js': ['chart.js'],
          // 'vue-chartjs': ['vue-chartjs'],
          // 'vue3-apexcharts': ['vue3-apexcharts'],
          papaparse: ['papaparse'],
          'xlsx': ['xlsx'],
          // 'xlsx-js-style': ['xlsx-js-style'],
          'file-saver': ['file-saver'],
          'jspdf': ['jspdf'],
          'jspdf-autotable': ['jspdf-autotable'],
          'leaflet': ['leaflet'],
        },
      },
    },
  }
})
