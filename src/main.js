import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import router from './router'
import Alpine from 'alpinejs'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';

window.Alpine = Alpine

Alpine.start()

createApp(App)
.use(createPinia())
.use(router).
mount('#app')
