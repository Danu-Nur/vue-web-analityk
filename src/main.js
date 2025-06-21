import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Alpine from 'alpinejs'
window.Alpine = Alpine


Alpine.start()


createApp(App).mount('#app')
