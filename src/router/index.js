import { createRouter, createWebHistory } from "vue-router";
import Landing from '../pages/landing/Landing.vue'
import Login from '../pages/auth/Login.vue';
import SignUp from '../pages/auth/SignUp.vue';
import ForgotPassword from '../pages/auth/ForgotPassword.vue';

const routes = [
    {
        path: '/',
        name: 'landing',
        component: Landing
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUp
    },
    {
        path: '/forgot-password',
        name: 'forgot.password',
        component: ForgotPassword
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router