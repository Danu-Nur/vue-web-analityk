import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import Alpine from 'alpinejs'
import 'bootstrap-icons/font/bootstrap-icons.css';
import VueApexCharts from "vue3-apexcharts";

window.Alpine = Alpine

Alpine.start()

createApp(App).use(router).use(VueApexCharts).mount('#app')
