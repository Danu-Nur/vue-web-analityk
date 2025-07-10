import { createRouter, createWebHistory } from 'vue-router';
import DashboardAdminLayout from '../layouts/DashboardAdminLayout.vue';

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
        path: '/admin',
        component: DashboardAdminLayout,
        children: [
            {
                path: 'admin-overview',
                name: 'admin.overview',
                component: () => import('../pages/admin/Overview.vue'),
                meta: { title: 'Overview' }
            },
            {
                path: 'admin-visitor',
                name: 'admin.visitor',
                component: () => import('../pages/admin/Visitors.vue'),
                meta: { title: 'Visitors' }
            },

            {
                path: 'admin-behavior',
                name: 'admin.behavior',
                component: () => import('../pages/admin/Behavior.vue'),
                meta: { title: 'Behavior' }
            },
            {
                path: 'admin-conversion',
                name: 'admin.conversion',
                component: () => import('../pages/admin/Conversions.vue'),
                meta: { title: 'Conversions' }
            },

            {
                path: 'admin-diagnostics',
                name: 'admin.diagnostics',
                component: () => import('../pages/admin/Diagnostics.vue'),
                meta: { title: 'Diagnostics' }
            },
            {
                path: 'admin-setting',
                name: 'admin.setting',
                component: () => import('../pages/admin/Setting.vue'),
                meta: { title: 'Settings & API' }
            },

            {
                path: 'admin-billing',
                name: 'admin.billing',
                component: () => import('../pages/admin/Billing.vue'),
                meta: { title: 'Billing & Plan' }
            },
            {
                path: 'admin-affiliate',
                name: 'admin.affiliate',
                component: () => import('../pages/admin/Affiliate.vue'),
                meta: { title: 'Affiliate / Partnership' }
            },
        ]
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