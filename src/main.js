import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import Alpine from 'alpinejs'
import 'bootstrap-icons/font/bootstrap-icons.css';

window.Alpine = Alpine

Alpine.start()

// const app = createApp(App);
// app.use(router)
// app.mount('#app')
createApp(App).use(router).mount('#app')
