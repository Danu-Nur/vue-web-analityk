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
        // Tambahkan redirect untuk halaman default saat mengunjungi /admin
        redirect: { name: 'admin.overview' }, // <-- PERBAIKAN 1
        children: [
            {
                // Path disederhanakan dari 'admin-overview' menjadi 'overview'
                // URL akhir akan tetap benar: /admin/overview
                path: 'overview', // <-- PERBAIKAN 2
                name: 'admin.overview',
                component: () => import('../pages/admin/Overview.vue'),
                meta: { title: 'Overview' },
                redirect: { name: 'admin.history' },
                children: [
                    {
                        path: 'history', // <-- Lebih singkat
                        name: 'admin.history',
                        component: () => import('../blocks/dashboard/admin/overview/History.vue'),
                        // meta: { title: 'History' }
                    },
                    {
                        path: 'behavior', // <-- Lebih singkat
                        name: 'admin.behavior',
                        component: () => import('../blocks/dashboard/admin/overview/Behavior.vue'),
                        // meta: { title: 'Behavior' }
                    },
                    {
                        path: 'conversion', // <-- Lebih singkat
                        name: 'admin.conversion',
                        component: () => import('../blocks/dashboard/admin/overview/Conversions.vue'),
                        // meta: { title: 'Conversions' }
                    },
                    {
                        path: 'diagnostics', // <-- Lebih singkat
                        name: 'admin.diagnostics',
                        component: () => import('../blocks/dashboard/admin/overview/Diagnostics.vue'),
                        // meta: { title: 'Diagnostics' }
                    },
                ]
            },
            {
                path: 'visitor', // <-- Lebih singkat
                name: 'admin.visitor',
                component: () => import('../pages/admin/Visitors.vue'),
                meta: { title: 'Real-Time' }
            },

            {
                path: 'setting', // <-- Lebih singkat
                name: 'admin.setting',
                component: () => import('../pages/admin/Setting.vue'),
                meta: { title: 'Settings & API' }
            },
            {
                path: 'billing', // <-- Lebih singkat
                name: 'admin.billing',
                component: () => import('../pages/admin/Billing.vue'),
                meta: { title: 'Billing & Plan' }
            },
            {
                path: 'affiliate', // <-- Lebih singkat
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