export const clickEvents = {
    headers: [
        { text: 'Selector', value: 'selector', sortable: true },
        { text: 'Clicks', value: 'clicks', sortable: true }
    ],
    items: [
        { selector: '#btn-buy', clicks: 342 },
        { selector: '#btn-add-cart', clicks: 215 },
        { selector: '.product-item', clicks: 189 },
        { selector: '#nav-menu', clicks: 145 },
        { selector: '.search-bar', clicks: 130 },
        { selector: '#btn-login', clicks: 98 },
        { selector: '.category-link', clicks: 87 },
        { selector: '#btn-signup', clicks: 76 },
        { selector: '.footer-link', clicks: 65 },
        { selector: '#video-play', clicks: 54 },
        { selector: '.social-icon', clicks: 43 },
        { selector: '#btn-contact', clicks: 39 },
        { selector: '.promo-banner', clicks: 32 },
        { selector: '#btn-search', clicks: 28 },
        { selector: '.user-profile', clicks: 25 },
        { selector: '#btn-help', clicks: 22 },
        { selector: '.cart-icon', clicks: 19 },
        { selector: '#btn-share', clicks: 17 },
        { selector: '.language-switch', clicks: 15 },
        { selector: '#btn-faq', clicks: 13 },
        { selector: '.newsletter-signup', clicks: 11 },
        { selector: '#btn-feedback', clicks: 9 },
        { selector: '.privacy-link', clicks: 8 },
        { selector: '#btn-terms', clicks: 7 },
        { selector: '.support-chat', clicks: 6 }
    ]
};

export const scrollDepth = {
    headers: [
        { text: 'Percentage', value: 'percentage', sortable: true },
        { text: 'Depth', value: 'depth', sortable: true }
    ],
    items: [
        { percentage: '0-25%', depth: 1000 },
        { percentage: '26-50%', depth: 750 },
        { percentage: '51-75%', depth: 500 },
        { percentage: '76-100%', depth: 300 },
        { percentage: '0-10%', depth: 1200 },
        { percentage: '11-20%', depth: 950 },
        { percentage: '21-30%', depth: 800 },
        { percentage: '31-40%', depth: 650 },
        { percentage: '41-50%', depth: 550 },
        { percentage: '51-60%', depth: 450 },
        { percentage: '61-70%', depth: 400 },
        { percentage: '71-80%', depth: 350 },
        { percentage: '81-90%', depth: 320 },
        { percentage: '91-100%', depth: 280 },
        { percentage: '0-15%', depth: 1100 },
        { percentage: '16-30%', depth: 900 },
        { percentage: '31-45%', depth: 700 },
        { percentage: '46-60%', depth: 600 },
        { percentage: '61-75%', depth: 480 },
        { percentage: '76-90%', depth: 340 }
    ]
};

export const heatmapData = {
    headers: [
        { text: 'X', value: 'x', sortable: true },
        { text: 'Y', value: 'y', sortable: true },
        { text: 'Clicks', value: 'clicks', sortable: true }
    ],
    items: [
        { x: 150, y: 200, clicks: 45 },
        { x: 300, y: 400, clicks: 32 },
        { x: 450, y: 600, clicks: 28 },
        { x: 600, y: 800, clicks: 25 },
        { x: 750, y: 1000, clicks: 20 },
        { x: 100, y: 150, clicks: 18 },
        { x: 250, y: 350, clicks: 15 },
        { x: 400, y: 550, clicks: 14 },
        { x: 550, y: 700, clicks: 12 },
        { x: 700, y: 900, clicks: 10 },
        { x: 200, y: 300, clicks: 9 },
        { x: 350, y: 500, clicks: 8 },
        { x: 500, y: 650, clicks: 7 },
        { x: 650, y: 850, clicks: 6 },
        { x: 800, y: 950, clicks: 5 },
        { x: 120, y: 180, clicks: 4 },
        { x: 280, y: 420, clicks: 3 },
        { x: 430, y: 580, clicks: 3 },
        { x: 580, y: 720, clicks: 2 },
        { x: 730, y: 880, clicks: 2 },
        { x: 160, y: 240, clicks: 2 },
        { x: 310, y: 460, clicks: 1 },
        { x: 460, y: 620, clicks: 1 },
        { x: 610, y: 780, clicks: 1 },
        { x: 760, y: 940, clicks: 1 }
    ]
};

export const customEvents = {
    headers: [
        { text: 'Event Name', value: 'event_name', sortable: true },
        { text: 'Event Data', value: 'event_data', sortable: true }
    ],
    items: [
        { event_name: 'play_video', event_data: '{"video_id": "vid123"}' },
        { event_name: 'pause_video', event_data: '{"video_id": "vid124"}' },
        { event_name: 'video_end', event_data: '{"video_id": "vid125"}' },
        { event_name: 'form_submit', event_data: '{"form_id": "form001"}' },
        { event_name: 'download_file', event_data: '{"file_id": "file001"}' },
        { event_name: 'login_success', event_data: '{"user_id": "user001"}' },
        { event_name: 'signup_complete', event_data: '{"user_id": "user002"}' },
        { event_name: 'add_to_wishlist', event_data: '{"product_id": "prod001"}' },
        { event_name: 'remove_from_wishlist', event_data: '{"product_id": "prod002"}' },
        { event_name: 'chat_opened', event_data: '{"chat_id": "chat001"}' },
        { event_name: 'chat_closed', event_data: '{"chat_id": "chat002"}' },
        { event_name: 'filter_applied', event_data: '{"filter": "category"}' },
        { event_name: 'sort_changed', event_data: '{"sort": "price"}' },
        { event_name: 'product_view', event_data: '{"product_id": "prod003"}' },
        { event_name: 'cart_updated', event_data: '{"cart_id": "cart001"}' },
        { event_name: 'checkout_started', event_data: '{"order_id": "order001"}' },
        { event_name: 'payment_success', event_data: '{"order_id": "order002"}' },
        { event_name: 'feedback_submitted', event_data: '{"feedback_id": "fb001"}' },
        { event_name: 'page_error', event_data: '{"error_code": "404"}' },
        { event_name: 'page_load', event_data: '{"page_id": "page001"}' }
    ]
};

export const eventTimeline = {
    headers: [
        { text: 'Timestamp', value: 'timestamp', sortable: true },
        { text: 'Event Type', value: 'event_type', sortable: true },
        { text: 'Details', value: 'details', sortable: true }
    ],
    items: [
        { timestamp: '2025-07-03 15:00:00', event_type: 'Click', details: 'Selector: #btn-buy, Clicks: 342' },
        { timestamp: '2025-07-03 15:01:00', event_type: 'Scroll', details: '0-25%, Depth: 1000' },
        { timestamp: '2025-07-03 15:02:00', event_type: 'Custom', details: 'play_video, {"video_id": "vid123"}' },
        { timestamp: '2025-07-03 15:03:00', event_type: 'Click', details: 'Selector: #btn-add-cart, Clicks: 215' },
        { timestamp: '2025-07-03 15:04:00', event_type: 'Scroll', details: '26-50%, Depth: 750' },
        { timestamp: '2025-07-03 15:05:00', event_type: 'Custom', details: 'pause_video, {"video_id": "vid124"}' },
        { timestamp: '2025-07-03 15:06:00', event_type: 'Click', details: 'Selector: .product-item, Clicks: 189' },
        { timestamp: '2025-07-03 15:07:00', event_type: 'Scroll', details: '51-75%, Depth: 500' },
        { timestamp: '2025-07-03 15:08:00', event_type: 'Custom', details: 'video_end, {"video_id": "vid125"}' },
        { timestamp: '2025-07-03 15:09:00', event_type: 'Click', details: 'Selector: #nav-menu, Clicks: 145' },
        { timestamp: '2025-07-03 15:10:00', event_type: 'Scroll', details: '76-100%, Depth: 300' },
        { timestamp: '2025-07-03 15:11:00', event_type: 'Custom', details: 'form_submit, {"form_id": "form001"}' },
        { timestamp: '2025-07-03 15:12:00', event_type: 'Click', details: 'Selector: .search-bar, Clicks: 130' },
        { timestamp: '2025-07-03 15:13:00', event_type: 'Scroll', details: '0-10%, Depth: 1200' },
        { timestamp: '2025-07-03 15:14:00', event_type: 'Custom', details: 'download_file, {"file_id": "file001"}' },
        { timestamp: '2025-07-03 15:15:00', event_type: 'Click', details: 'Selector: #btn-login, Clicks: 98' },
        { timestamp: '2025-07-03 15:16:00', event_type: 'Scroll', details: '11-20%, Depth: 950' },
        { timestamp: '2025-07-03 15:17:00', event_type: 'Custom', details: 'login_success, {"user_id": "user001"}' },
        { timestamp: '2025-07-03 15:18:00', event_type: 'Click', details: 'Selector: .category-link, Clicks: 87' },
        { timestamp: '2025-07-03 15:19:00', event_type: 'Scroll', details: '21-30%, Depth: 800' },
        { timestamp: '2025-07-03 15:20:00', event_type: 'Custom', details: 'signup_complete, {"user_id": "user002"}' },
        { timestamp: '2025-07-03 15:21:00', event_type: 'Click', details: 'Selector: #btn-signup, Clicks: 76' },
        { timestamp: '2025-07-03 15:22:00', event_type: 'Scroll', details: '31-40%, Depth: 650' },
        { timestamp: '2025-07-03 15:23:00', event_type: 'Custom', details: 'add_to_wishlist, {"product_id": "prod001"}' },
        { timestamp: '2025-07-03 15:24:00', event_type: 'Click', details: 'Selector: .footer-link, Clicks: 65' },
        { timestamp: '2025-07-03 15:25:00', event_type: 'Scroll', details: '41-50%, Depth: 550' },
        { timestamp: '2025-07-03 15:26:00', event_type: 'Custom', details: 'remove_from_wishlist, {"product_id": "prod002"}' },
        { timestamp: '2025-07-03 15:27:00', event_type: 'Click', details: 'Selector: #video-play, Clicks: 54' },
        { timestamp: '2025-07-03 15:28:00', event_type: 'Scroll', details: '51-60%, Depth: 450' },
        { timestamp: '2025-07-03 15:29:00', event_type: 'Custom', details: 'chat_opened, {"chat_id": "chat001"}' }
    ]
};