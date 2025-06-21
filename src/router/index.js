import { createRouter, createWebHistory } from "vue-router";
import Landing from '../pages/landing/Landing.vue'
import Login from '../pages/login/Login.vue';
const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'landing',
        component: Landing
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router