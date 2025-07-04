export const currentPlan = {
    headers: [
        { text: 'Client ID', value: 'client_id', sortable: true },
        { text: 'Plan Name', value: 'plan_name', sortable: true },
        { text: 'Start Date', value: 'start_date', sortable: true },
        { text: 'End Date', value: 'end_date', sortable: true }
    ],
    items: [
        { client_id: 'client001', plan_name: 'Basic', start_date: '2025-06-04 08:00:00', end_date: '2025-07-04 07:59:59' },
        { client_id: 'client002', plan_name: 'Pro', start_date: '2025-06-15 09:00:00', end_date: '2025-07-15 08:59:59' },
        { client_id: 'client003', plan_name: 'Enterprise', start_date: '2025-06-20 10:00:00', end_date: '2025-07-20 09:59:59' },
        { client_id: 'client004', plan_name: 'Basic', start_date: '2025-06-10 07:30:00', end_date: '2025-07-10 07:29:59' },
        { client_id: 'client005', plan_name: 'Pro', start_date: '2025-06-25 11:00:00', end_date: '2025-07-25 10:59:59' }
    ]
};

export const usage = {
    headers: [
        { text: 'API Key ID', value: 'api_key_id', sortable: true },
        { text: 'Click Events', value: 'click_events', sortable: true },
        { text: 'Page Views', value: 'page_views', sortable: true },
        { text: 'Custom Events', value: 'custom_events', sortable: true }
    ],
    items: [
        { api_key_id: 'abc123-xyz456', click_events: 1500, page_views: 2000, custom_events: 500 },
        { api_key_id: 'def789-pqr012', click_events: 1200, page_views: 1800, custom_events: 400 },
        { api_key_id: 'ghi345-stu678', click_events: 900, page_views: 1500, custom_events: 300 },
        { api_key_id: 'jkl901-vwx234', click_events: 1100, page_views: 1700, custom_events: 350 },
        { api_key_id: 'mno567-yza890', click_events: 800, page_views: 1400, custom_events: 250 },
        { api_key_id: 'pqr123-bcd456', click_events: 1300, page_views: 1900, custom_events: 450 },
        { api_key_id: 'stu789-efg012', click_events: 1000, page_views: 1600, custom_events: 320 },
        { api_key_id: 'vwx345-hij678', click_events: 700, page_views: 1300, custom_events: 200 },
        { api_key_id: 'yza901-klm234', click_events: 1150, page_views: 1750, custom_events: 380 },
        { api_key_id: 'bcd567-mno890', click_events: 1250, page_views: 1850, custom_events: 420 },
        { api_key_id: 'efg123-pqr456', click_events: 850, page_views: 1450, custom_events: 270 },
        { api_key_id: 'hij789-stu012', click_events: 950, page_views: 1550, custom_events: 310 },
        { api_key_id: 'klm345-vwx678', click_events: 1050, page_views: 1650, custom_events: 340 },
        { api_key_id: 'mno901-yza234', click_events: 750, page_views: 1350, custom_events: 220 },
        { api_key_id: 'pqr567-bcd890', click_events: 1200, page_views: 1800, custom_events: 400 },
        { api_key_id: 'stu123-efg456', click_events: 1100, page_views: 1700, custom_events: 350 },
        { api_key_id: 'vwx789-hij012', click_events: 900, page_views: 1500, custom_events: 300 },
        { api_key_id: 'yza345-klm678', click_events: 1300, page_views: 1900, custom_events: 450 },
        { api_key_id: 'bcd901-mno234', click_events: 1000, page_views: 1600, custom_events: 320 },
        { api_key_id: 'efg567-pqr890', click_events: 800, page_views: 1400, custom_events: 250 }
    ]
};

export const billingTable = {
    headers: [
        { text: 'Amount (USD)', value: 'amount', sortable: true },
        { text: 'Date', value: 'date', sortable: true },
        { text: 'Status', value: 'status', sortable: true }
    ],
    items: [
        { amount: 49.99, date: '2025-06-04 08:00:00', status: 'Paid' },
        { amount: 99.99, date: '2025-06-15 09:00:00', status: 'Paid' },
        { amount: 199.99, date: '2025-06-20 10:00:00', status: 'Paid' },
        { amount: 49.99, date: '2025-06-10 07:30:00', status: 'Paid' },
        { amount: 99.99, date: '2025-06-25 11:00:00', status: 'Paid' },
        { amount: 49.99, date: '2025-05-04 08:00:00', status: 'Paid' },
        { amount: 99.99, date: '2025-05-15 09:00:00', status: 'Paid' },
        { amount: 199.99, date: '2025-05-20 10:00:00', status: 'Paid' },
        { amount: 49.99, date: '2025-05-10 07:30:00', status: 'Paid' },
        { amount: 99.99, date: '2025-05-25 11:00:00', status: 'Paid' },
        { amount: 49.99, date: '2025-04-04 08:00:00', status: 'Paid' },
        { amount: 99.99, date: '2025-04-15 09:00:00', status: 'Paid' },
        { amount: 199.99, date: '2025-04-20 10:00:00', status: 'Paid' },
        { amount: 49.99, date: '2025-04-10 07:30:00', status: 'Paid' },
        { amount: 99.99, date: '2025-04-25 11:00:00', status: 'Paid' },
        { amount: 49.99, date: '2025-03-04 08:00:00', status: 'Paid' },
        { amount: 99.99, date: '2025-03-15 09:00:00', status: 'Pending' },
        { amount: 199.99, date: '2025-03-20 10:00:00', status: 'Failed' },
        { amount: 49.99, date: '2025-03-10 07:30:00', status: 'Paid' },
        { amount: 99.99, date: '2025-03-25 11:00:00', status: 'Paid' },
        { amount: 49.99, date: '2025-02-04 08:00:00', status: 'Paid' },
        { amount: 99.99, date: '2025-02-15 09:00:00', status: 'Paid' },
        { amount: 199.99, date: '2025-02-20 10:00:00', status: 'Paid' },
        { amount: 49.99, date: '2025-02-10 07:30:00', status: 'Paid' },
        { amount: 99.99, date: '2025-02-25 11:00:00', status: 'Paid' }
    ]
};

export const upgradeCTA = {
    content: 'https://example.com/billing'
};

export const planComparison = {
    headers: [
        { text: 'Plan Name', value: 'plan_name', sortable: true },
        { text: 'Price (USD/month)', value: 'price', sortable: true },
        { text: 'Event Limit', value: 'event_limit', sortable: true },
        { text: 'Support', value: 'support', sortable: true }
    ],
    items: [
        { plan_name: 'Basic', price: 49.99, event_limit: 10000, support: 'Email' },
        { plan_name: 'Pro', price: 99.99, event_limit: 50000, support: 'Email + Chat' },
        { plan_name: 'Enterprise', price: 199.99, event_limit: 200000, support: '24/7 Phone + Dedicated' },
        { plan_name: 'Starter', price: 29.99, event_limit: 5000, support: 'Email' },
        { plan_name: 'Plus', price: 79.99, event_limit: 25000, support: 'Email + Chat' },
        { plan_name: 'Premium', price: 149.99, event_limit: 100000, support: 'Email + Chat' },
        { plan_name: 'Business', price: 299.99, event_limit: 300000, support: '24/7 Phone + Dedicated' },
        { plan_name: 'Lite', price: 19.99, event_limit: 2000, support: 'Email' },
        { plan_name: 'Advanced', price: 129.99, event_limit: 75000, support: 'Email + Chat' },
        { plan_name: 'Ultimate', price: 399.99, event_limit: 500000, support: '24/7 Phone + Dedicated' }
    ]
};