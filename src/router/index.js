import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'landing',
        component: () => import('../pages/landing/Landing.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/auth/Login.vue')
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../pages/auth/SignUp.vue')
    },
    {
        path: '/forgot-password',
        name: 'forgot.password',
        component: () => import('../pages/auth/ForgotPassword.vue')
    },
    {
        path: '/admin-dashboard',
        name: 'admin.dashboard',
        component: () => import('../pages/admin/dashboard/Dashboard.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router