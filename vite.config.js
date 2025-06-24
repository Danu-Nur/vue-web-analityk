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
    // minify: 'terser', // Use terser for better minification
    // terserOptions: {
    //   compress: {
    //     drop_console: true, // Remove console.logs
    //     drop_debugger: true,
    //   },
    // },
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          apexcharts: ['apexcharts'],
          // 'vue3-apexcharts': ['vue3-apexcharts'],
          papaparse: ['papaparse'],
          'xlsx': ['xlsx'],
          // 'xlsx-js-style': ['xlsx-js-style'],
          'file-saver': ['file-saver'],
          'jspdf': ['jspdf'],
          'jspdf-autotable': ['jspdf-autotable'],
        },
      },
    },
  }
})
