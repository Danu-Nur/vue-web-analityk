export const funnels = {
    headers: [
        { text: 'Name', value: 'funnel_name', sortable: true },
        { text: 'Drop %', value: 'drop_percentage', sortable: true },
        { text: 'Completed', value: 'completed', sortable: true }
    ],
    items: [
        { funnel_name: 'Signup Funnel', drop_percentage: 25, completed: 7500 },
        { funnel_name: 'Checkout Funnel', drop_percentage: 30, completed: 5800 },
        { funnel_name: 'Newsletter Funnel', drop_percentage: 40, completed: 4200 },
        { funnel_name: 'Product Demo Funnel', drop_percentage: 20, completed: 4250 },
        { funnel_name: 'Purchase Funnel', step: 1, drop_percentage: 0, completed: 10000 },
        { funnel_name: 'Purchase Funnel', step: 2, drop_percentage: 15, completed: 8500 },
        { funnel_name: 'Purchase Funnel', step: 3, drop_percentage: 30, completed: 5950 },
        { funnel_name: 'Purchase Funnel', step: 4, drop_percentage: 40, completed: 3570 },
        { funnel_name: 'Purchase Funnel', step: 5, drop_percentage: 50, completed: 1785 },
        { funnel_name: 'Signup Funnel', step: 1, drop_percentage: 0, completed: 10000 },
        { funnel_name: 'Signup Funnel', step: 2, drop_percentage: 25, completed: 7500 },
        { funnel_name: 'Signup Funnel', step: 3, drop_percentage: 40, completed: 4500 },
        { funnel_name: 'Signup Funnel', step: 4, drop_percentage: 50, completed: 2250 },
        { funnel_name: 'Checkout Funnel', step: 1, drop_percentage: 0, completed: 8300 },
        { funnel_name: 'Checkout Funnel', step: 2, drop_percentage: 30, completed: 5810 },
        { funnel_name: 'Checkout Funnel', step: 3, drop_percentage: 45, completed: 3196 },
        { funnel_name: 'Newsletter Funnel', step: 1, drop_percentage: 0, completed: 7000 },
        { funnel_name: 'Newsletter Funnel', step: 2, drop_percentage: 40, completed: 4200 },
        { funnel_name: 'Newsletter Funnel', step: 3, drop_percentage: 60, completed: 1680 },
        { funnel_name: 'Product Demo Funnel', step: 1, drop_percentage: 0, completed: 5313 },
        { funnel_name: 'Product Demo Funnel', step: 2, drop_percentage: 20, completed: 4250 },
        { funnel_name: 'Product Demo Funnel', step: 3, drop_percentage: 35, completed: 2763 },
        { funnel_name: 'Contact Funnel', step: 1, drop_percentage: 0, completed: 6500 },
        { funnel_name: 'Contact Funnel', step: 2, drop_percentage: 35, completed: 4225 },
        { funnel_name: 'Contact Funnel', step: 3, drop_percentage: 60, completed: 1690 }
    ]
};

export const funnelChart = {
    headers: [
        { text: 'Funnel Name', value: 'funnel_name', sortable: true },
        { text: 'Step', value: 'step', sortable: true },
        { text: 'Drop-off %', value: 'dropoff_percentage', sortable: true },
        { text: 'Completed', value: 'completed', sortable: true }
    ],
    items: [
        { funnel_name: 'Signup Funnel', step: 1, dropoff_percentage: 0, completed: 10000 },
        { funnel_name: 'Signup Funnel', step: 2, dropoff_percentage: 25, completed: 7500 },
        { funnel_name: 'Signup Funnel', step: 3, dropoff_percentage: 40, completed: 4500 },
        { funnel_name: 'Signup Funnel', step: 4, dropoff_percentage: 50, completed: 2250 },
        { funnel_name: 'Checkout Funnel', step: 1, dropoff_percentage: 0, completed: 8300 },
        { funnel_name: 'Checkout Funnel', step: 2, dropoff_percentage: 30, completed: 5810 },
        { funnel_name: 'Checkout Funnel', step: 3, dropoff_percentage: 45, completed: 3196 },
        { funnel_name: 'Newsletter Funnel', step: 1, dropoff_percentage: 0, completed: 7000 },
        { funnel_name: 'Newsletter Funnel', step: 2, dropoff_percentage: 40, completed: 4200 },
        { funnel_name: 'Newsletter Funnel', step: 3, dropoff_percentage: 60, completed: 1680 },
        { funnel_name: 'Product Demo Funnel', step: 1, dropoff_percentage: 0, completed: 5313 },
        { funnel_name: 'Product Demo Funnel', step: 2, dropoff_percentage: 20, completed: 4250 },
        { funnel_name: 'Product Demo Funnel', step: 3, dropoff_percentage: 35, completed: 2763 },
        { funnel_name: 'Purchase Funnel', step: 1, dropoff_percentage: 0, completed: 10000 },
        { funnel_name: 'Purchase Funnel', step: 2, dropoff_percentage: 15, completed: 8500 },
        { funnel_name: 'Purchase Funnel', step: 3, dropoff_percentage: 30, completed: 5950 },
        { funnel_name: 'Purchase Funnel', step: 4, dropoff_percentage: 40, completed: 3570 },
        { funnel_name: 'Purchase Funnel', step: 5, dropoff_percentage: 50, completed: 1785 },
        { funnel_name: 'Contact Funnel', step: 1, dropoff_percentage: 0, completed: 6500 },
        { funnel_name: 'Contact Funnel', step: 2, dropoff_percentage: 35, completed: 4225 }
    ]
};

export const completedFunnels = {
    headers: [
        { text: 'Funnel Name', value: 'funnel_name', sortable: true },
        { text: 'Completions', value: 'completions', sortable: true },
        { text: 'Session ID', value: 'session_id', sortable: true },
        { text: 'Completed At', value: 'completed_at', sortable: true }
    ],
    items: [
        { funnel_name: 'Signup Funnel', completions: 7500, session_id: 'sess180', completed_at: '2025-07-03 15:45:00' },
        { funnel_name: 'Checkout Funnel', completions: 5800, session_id: 'sess181', completed_at: '2025-07-03 15:43:00' },
        { funnel_name: 'Newsletter Funnel', completions: 4200, session_id: 'sess182', completed_at: '2025-07-03 15:41:00' },
        { funnel_name: 'Product Demo Funnel', completions: 4250, session_id: 'sess183', completed_at: '2025-07-03 15:39:00' },
        { funnel_name: 'Purchase Funnel', completions: 1785, session_id: 'sess184', completed_at: '2025-07-03 15:37:00' },
        { funnel_name: 'Signup Funnel', completions: 7500, session_id: 'sess185', completed_at: '2025-07-03 15:35:00' },
        { funnel_name: 'Checkout Funnel', completions: 5800, session_id: 'sess186', completed_at: '2025-07-03 15:33:00' },
        { funnel_name: 'Newsletter Funnel', completions: 4200, session_id: 'sess187', completed_at: '2025-07-03 15:31:00' },
        { funnel_name: 'Product Demo Funnel', completions: 4250, session_id: 'sess188', completed_at: '2025-07-03 15:29:00' },
        { funnel_name: 'Purchase Funnel', completions: 1785, session_id: 'sess189', completed_at: '2025-07-03 15:27:00' },
        { funnel_name: 'Signup Funnel', completions: 7500, session_id: 'sess190', completed_at: '2025-07-03 15:25:00' },
        { funnel_name: 'Checkout Funnel', completions: 5800, session_id: 'sess191', completed_at: '2025-07-03 15:23:00' },
        { funnel_name: 'Newsletter Funnel', completions: 4200, session_id: 'sess192', completed_at: '2025-07-03 15:21:00' },
        { funnel_name: 'Product Demo Funnel', completions: 4250, session_id: 'sess193', completed_at: '2025-07-03 15:19:00' },
        { funnel_name: 'Purchase Funnel', completions: 1785, session_id: 'sess194', completed_at: '2025-07-03 15:17:00' },
        { funnel_name: 'Signup Funnel', completions: 7500, session_id: 'sess195', completed_at: '2025-07-03 15:15:00' },
        { funnel_name: 'Checkout Funnel', completions: 5800, session_id: 'sess196', completed_at: '2025-07-03 15:13:00' },
        { funnel_name: 'Newsletter Funnel', completions: 4200, session_id: 'sess197', completed_at: '2025-07-03 15:11:00' },
        { funnel_name: 'Product Demo Funnel', completions: 4250, session_id: 'sess198', completed_at: '2025-07-03 15:09:00' },
        { funnel_name: 'Purchase Funnel', completions: 1785, session_id: 'sess199', completed_at: '2025-07-03 15:07:00' },
        { funnel_name: 'Signup Funnel', completions: 7500, session_id: 'sess200', completed_at: '2025-07-03 15:05:00' },
        { funnel_name: 'Checkout Funnel', completions: 5800, session_id: 'sess201', completed_at: '2025-07-03 15:03:00' },
        { funnel_name: 'Newsletter Funnel', completions: 4200, session_id: 'sess202', completed_at: '2025-07-03 15:01:00' },
        { funnel_name: 'Product Demo Funnel', completions: 4250, session_id: 'sess203', completed_at: '2025-07-03 14:59:00' },
        { funnel_name: 'Purchase Funnel', completions: 1785, session_id: 'sess204', completed_at: '2025-07-03 14:57:00' }
    ]
};

export const conversionByDevice = {
    headers: [
        { text: 'Device Type', value: 'device_type', sortable: true },
        { text: 'Conversion Rate', value: 'conversion_rate', sortable: true }
    ],
    items: [
        { device_type: 'Desktop', conversion_rate: 65 },
        { device_type: 'Mobile', conversion_rate: 45 },
        { device_type: 'Tablet', conversion_rate: 35 },
        { device_type: 'Laptop', conversion_rate: 55 },
        { device_type: 'Desktop', conversion_rate: 60 }, // Additional entries to exceed 20
        { device_type: 'Mobile', conversion_rate: 50 },
        { device_type: 'Tablet', conversion_rate: 30 },
        { device_type: 'Laptop', conversion_rate: 58 },
        { device_type: 'Desktop', conversion_rate: 62 },
        { device_type: 'Mobile', conversion_rate: 40 },
        { device_type: 'Tablet', conversion_rate: 33 },
        { device_type: 'Laptop', conversion_rate: 52 },
        { device_type: 'Desktop', conversion_rate: 45 },
        { device_type: 'Mobile', conversion_rate: 38 },
        { device_type: 'Tablet', conversion_rate: 28 },
        { device_type: 'Laptop', conversion_rate: 50 },
        { device_type: 'Desktop', conversion_rate: 55 },
        { device_type: 'Mobile', conversion_rate: 35 },
        { device_type: 'Tablet', conversion_rate: 25 },
        { device_type: 'Laptop', conversion_rate: 48 }
    ]
};

export const flowDiagram = {
    headers: [
        { text: 'Step', value: 'step', sortable: true },
        { text: 'URL', value: 'url', sortable: true },
        { text: 'Conversion Rate', value: 'conversion_rate', sortable: true }
    ],
    items: [
        { step: 'Awareness', url: '/home', conversion_rate: 100 },
        { step: 'Interest', url: '/product', conversion_rate: 85 },
        { step: 'Consideration', url: '/cart', conversion_rate: 70 },
        { step: 'Engagement', url: '/checkout', conversion_rate: 60 },
        { step: 'Conversion', url: '/thank-you', conversion_rate: 50 },
        { step: 'Awareness', url: '/home', conversion_rate: 100 }, // Additional entries to exceed 20
        { step: 'Interest', url: '/signup', conversion_rate: 75 },
        { step: 'Consideration', url: '/verify', conversion_rate: 60 },
        { step: 'Engagement', url: '/welcome', conversion_rate: 50 },
        { step: 'Conversion', url: '/dashboard', conversion_rate: 40 },
        { step: 'Awareness', url: '/home', conversion_rate: 100 },
        { step: 'Interest', url: '/contact', conversion_rate: 65 },
        { step: 'Consideration', url: '/submit', conversion_rate: 40 },
        { step: 'Engagement', url: '/help', conversion_rate: 70 },
        { step: 'Conversion', url: '/chat', conversion_rate: 45 },
        { step: 'Awareness', url: '/home', conversion_rate: 100 },
        { step: 'Interest', url: '/download', conversion_rate: 80 },
        { step: 'Consideration', url: '/confirm', conversion_rate: 60 },
        { step: 'Engagement', url: '/login', conversion_rate: 85 },
        { step: 'Conversion', url: '/search', conversion_rate: 70 },
        { step: 'Awareness', url: '/home', conversion_rate: 100 },
        { step: 'Interest', url: '/product', conversion_rate: 90 },
        { step: 'Consideration', url: '/results', conversion_rate: 75 },
        { step: 'Engagement', url: '/detail', conversion_rate: 60 },
        { step: 'Conversion', url: '/thank-you', conversion_rate: 50 },
        { step: 'Awareness', url: '/home', conversion_rate: 100 },
        { step: 'Interest', url: '/signup', conversion_rate: 75 },
        { step: 'Consideration', url: '/verify', conversion_rate: 60 },
        { step: 'Engagement', url: '/welcome', conversion_rate: 50 },
        { step: 'Conversion', url: '/dashboard', conversion_rate: 40 }
    ]
};