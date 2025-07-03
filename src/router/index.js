import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'landing',
        component: () => import('../pages/landingnew/LandingNew.vue'),
        meta: { title: 'Home' }
    },
    // ========================================== AUTH ===========================================
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/auth/Login.vue'),
        meta: { title: 'Login' }
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../pages/auth/SignUp.vue'),
        meta: { title: 'Sign Up' }
    },
    {
        path: '/forgot-password',
        name: 'forgot.password',
        component: () => import('../pages/auth/ForgotPassword.vue'),
        meta: { title: 'Forgot Password' }
    },
    // ========================================== END AUTH ===========================================
    // ========================================== ADMIN ===========================================
    {
        path: '/admin-overview',
        name: 'admin.overview',
        component: () => import('../pages/admin/Overview.vue'),
        meta: { title: 'Overview' }
    },
    {
        path: '/admin-visitor',
        name: 'admin.visitor',
        component: () => import('../pages/admin/Visitors.vue'),
        meta: { title: 'Visitors' }
    },
    // ========================================== END ADMIN ===========================================
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Set page title dynamically based on meta.title
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'My App';
    next();
});

export default router;