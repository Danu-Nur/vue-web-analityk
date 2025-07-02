import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'landing',
        component: () => import('../pages/landingnew/LandingNew.vue')
    },

    // ========================================== AUTH ===========================================
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
    // ========================================== END AUTH ===========================================

    // ========================================== ADMIN ===========================================
    {
        path: '/admin-overview',
        name: 'admin.overview',
        component: () => import('../pages/admin/Overview.vue')
    },
    {
        path: '/admin-visitor',
        name: 'admin.visitor',
        component: () => import('../pages/admin/Visitors.vue')
    },
    // ========================================== END ADMIN ===========================================
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router