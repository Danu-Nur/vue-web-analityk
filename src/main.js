import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Alpine from 'alpinejs'
import './style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';

window.Alpine = Alpine

Alpine.start()

// Inisialisasi aplikasi Vue
const app = createApp(App)

// Inisialisasi Pinia
const pinia = createPinia()

// Gunakan plugin di aplikasi Vue
app.use(pinia) // 4. "Pasang" Pinia ke aplikasi
app.use(router) // 5. "Pasang" router ke aplikasi

// "Mount" atau tampilkan aplikasi di elemen dengan id="app" pada file index.html
app.mount('#app')
