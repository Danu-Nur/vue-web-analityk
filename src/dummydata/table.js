
// table with chart inside row
export const table1 = {
    headers: [
        { text: 'Lane ID', value: 'lane', sortable: true },
        { text: 'Plaza Name', value: 'plaza', sortable: true },
        { text: 'URL', value: 'url', sortable: true },
        { text: 'Date & time', value: 'date', sortable: true },
        { text: 'Visitors', value: 'visit', sortable: true },
        { text: '24h Visitors', value: 'visitorperhours', sortable: true, class: 'text-blue-500 text-center', formatter: (val) => val.length.toString() },
    ],
    items: [
        {
            lane: 'M01',
            plaza: 'Kingston E',
            url: '/toll/kingston',
            date: '01-01-2025',
            visit: 150,
            visitorperhours: [
                { date: '01-01-2025 08:30 AM' },
                { date: '01-01-2025 09:00 AM' },
                { date: '01-01-2025 09:00 AM' },
                { date: '01-01-2025 10:15 AM' },
                { date: '01-01-2025 10:15 AM' },
                { date: '01-01-2025 11:30 AM' },
                { date: '01-01-2025 12:00 PM' },
            ],
        },
        {
            lane: 'M02',
            plaza: 'May Pen W',
            url: '/toll/maypen',
            date: '02-01-2025',
            visit: 180,
            visitorperhours: [
                { date: '02-01-2025 09:15 AM' },
                { date: '02-01-2025 09:15 AM' },
                { date: '02-01-2025 09:15 AM' },
                { date: '02-01-2025 10:00 AM' },
                { date: '02-01-2025 11:45 AM' },
            ],
        },
        {
            lane: 'M03',
            plaza: 'Spanish Town N',
            url: '/toll/spanishtown',
            date: '03-01-2025',
            visit: 200,
            visitorperhours: [
                { date: '03-01-2025 10:00 AM' },
                { date: '03-01-2025 11:00 AM' },
                { date: '03-01-2025 11:00 AM' },
                { date: '03-01-2025 12:30 PM' },
                { date: '03-01-2025 01:15 PM' },
                { date: '03-01-2025 01:15 PM' },
                { date: '03-01-2025 01:15 PM' },
            ],
        },
        {
            lane: 'M04',
            plaza: 'Vineyard S',
            url: '/toll/vineyard',
            date: '04-01-2025',
            visit: 220,
            visitorperhours: [
                { date: '04-01-2025 00:00 PM' },
                { date: '04-01-2025 01:04 PM' },
                { date: '04-01-2025 02:30 PM' },
                { date: '04-01-2025 02:34 PM' },
                { date: '04-01-2025 02:40 PM' },
                { date: '04-01-2025 03:05 PM' },
                { date: '04-01-2025 03:12 PM' },
            ],
        },
        {
            lane: 'M05',
            plaza: 'Portmore E',
            url: '/toll/portmore',
            date: '05-01-2025',
            visit: 250,
            visitorperhours: [
                { date: '05-01-2025 12:30 PM' },
                { date: '05-01-2025 12:30 PM' },
                { date: '05-01-2025 12:30 PM' },
                { date: '05-01-2025 12:30 PM' },
                { date: '05-01-2025 01:00 PM' },
                { date: '05-01-2025 02:15 PM' },
                { date: '05-01-2025 03:30 PM' },
                { date: '05-01-2025 04:00 PM' },
                { date: '05-01-2025 04:00 PM' },
                { date: '05-01-2025 05:15 PM' },
            ],
        },
    ]
}


// table Top Pages
export const tableTopPages = {
    headers: [
        { text: 'URL', value: 'url', sortable: true },
        { text: 'Views', value: 'views', sortable: true },
        { text: 'Avg. Duration', value: 'avgDuration', sortable: true },
        { text: 'Bounce Rate', value: 'bounceRate', sortable: true }
    ],
    items: [
        {
            url: '/home',
            views: '345,678',
            avgDuration: '4m 12s',
            bounceRate: '38.2%'
        },
        {
            url: '/products',
            views: '234,567',
            avgDuration: '3m 05s',
            bounceRate: '45.1%'
        },
        {
            url: '/blog/how-to-use',
            views: '123,456',
            avgDuration: '5m 22s',
            bounceRate: '29.7%'
        },
        {
            url: '/contact',
            views: '98,765',
            avgDuration: '2m 18s',
            bounceRate: '52.3%'
        },
        {
            url: '/pricing',
            views: '87,654',
            avgDuration: '3m 40s',
            bounceRate: '41.0%'
        },
        {
            url: '/features',
            views: '76,543',
            avgDuration: '4m 05s',
            bounceRate: '36.8%'
        },
        {
            url: '/about',
            views: '65,432',
            avgDuration: '3m 50s',
            bounceRate: '39.5%'
        },
        {
            url: '/faq',
            views: '54,321',
            avgDuration: '2m 45s',
            bounceRate: '48.7%'
        },
        {
            url: '/login',
            views: '43,210',
            avgDuration: '1m 30s',
            bounceRate: '60.2%'
        },
        {
            url: '/signup',
            views: '32,109',
            avgDuration: '2m 10s',
            bounceRate: '55.0%'
        }
    ]
};


// table geo location
export const countryRegionData = {
    headers: [
        { text: 'Country', value: 'country', sortable: true },
        { text: 'Region', value: 'region', sortable: true },
        { text: 'Count', value: 'count', sortable: true }
    ],
    items: [
        {
            country: 'Indonesia',
            region: 'Jakarta',
            count: 1250
        },
        {
            country: 'Indonesia',
            region: 'Bali',
            count: 890
        },
        {
            country: 'Indonesia',
            region: 'Surabaya',
            count: 670
        },
        {
            country: 'Singapore',
            region: 'Central',
            count: 450
        },
        {
            country: 'Singapore',
            region: 'North',
            count: 320
        },
        {
            country: 'Indonesia',
            region: 'Jakarta',
            count: 1250
        },
        {
            country: 'Indonesia',
            region: 'Bali',
            count: 890
        },
        {
            country: 'Indonesia',
            region: 'Surabaya',
            count: 670
        },
        {
            country: 'Singapore',
            region: 'Central',
            count: 450
        },
        {
            country: 'Singapore',
            region: 'North',
            count: 320
        },
        {
            country: 'Malaysia',
            region: 'Kuala Lumpur',
            count: 780
        },
        {
            country: 'Malaysia',
            region: 'Penang',
            count: 560
        },
        {
            country: 'Thailand',
            region: 'Bangkok',
            count: 920
        },
        {
            country: 'Thailand',
            region: 'Chiang Mai',
            count: 410
        },
        {
            country: 'Philippines',
            region: 'Manila',
            count: 650
        }
    ]
};


// table referre
export const referrersData = {
    headers: [
        { text: 'Referrer', value: 'referrer', sortable: true },
        { text: 'Views', value: 'views', sortable: true },
        { text: 'Click Through Rate', value: 'click_through_rate', sortable: true, formatter: (val) => `${val}%` }
    ],
    items: [
        { referrer: 'google.com', views: 1200, click_through_rate: 3.5 },
        { referrer: 'facebook.com', views: 850, click_through_rate: 2.1 },
        { referrer: 'twitter.com', views: 450, click_through_rate: 1.8 },
        { referrer: 'linkedin.com', views: 300, click_through_rate: 1.2 },
        { referrer: 'bing.com', views: 200, click_through_rate: 0.9 }
    ]
};

// table user journey
export const userJourneysData = {
    headers: [
        { text: 'Entry Page', value: 'entry_page', sortable: true },
        { text: 'Exit Page', value: 'exit_page', sortable: true },
        { text: 'Sessions', value: 'sessions', sortable: true }
    ],
    items: [
        { entry_page: '/home', exit_page: '/contact', sessions: 150 },
        { entry_page: '/products', exit_page: '/checkout', sessions: 90 },
        { entry_page: '/blog', exit_page: '/blog/how-to', sessions: 70 },
        { entry_page: '/pricing', exit_page: '/signup', sessions: 60 },
        { entry_page: '/contact', exit_page: '/home', sessions: 40 }
    ]
};

// page 2
// Section 1: Live Users (tracking_sessions)
export const liveUsersData = {
    headers: [
        { text: 'IP Address', value: 'ip_address', sortable: true },
        { text: 'Page', value: 'page', sortable: true },
        { text: 'Country', value: 'country', sortable: true },
        { text: 'Time Active (s)', value: 'time_active', sortable: true }
    ],
    items: [
        { ip_address: '192.168.1.1', page: '/home', country: 'USA', time_active: 120 },
        { ip_address: '172.16.0.1', page: '/products', country: 'UK', time_active: 180 },
        { ip_address: '10.0.0.1', page: '/about', country: 'Canada', time_active: 90 },
        { ip_address: '192.168.1.2', page: '/contact', country: 'Germany', time_active: 60 },
        { ip_address: '172.16.0.2', page: '/blog', country: 'Australia', time_active: 150 },
        { ip_address: '192.168.1.3', page: '/pricing', country: 'Japan', time_active: 200 },
        { ip_address: '172.16.0.3', page: '/home', country: 'Brazil', time_active: 130 },
        { ip_address: '10.0.0.2', page: '/products', country: 'India', time_active: 170 },
        { ip_address: '192.168.1.4', page: '/cart', country: 'France', time_active: 110 },
        { ip_address: '172.16.0.4', page: '/blog', country: 'South Africa', time_active: 140 },
        { ip_address: '10.0.0.3', page: '/contact', country: 'Spain', time_active: 80 },
        { ip_address: '192.168.1.5', page: '/about', country: 'Italy', time_active: 160 }
    ]
};

// Section 2: Sessions (tracking_sessions, page_views)
export const sessionsData = {
    headers: [
        { text: 'Session ID', value: 'session_id', sortable: true },
        { text: 'Page Count', value: 'page_count', sortable: true }
    ],
    items: [
        { session_id: 'sess_001', page_count: 2 },
        { session_id: 'sess_002', page_count: 3 },
        { session_id: 'sess_003', page_count: 1 },
        { session_id: 'sess_004', page_count: 2 },
        { session_id: 'sess_005', page_count: 1 },
        { session_id: 'sess_006', page_count: 4 },
        { session_id: 'sess_007', page_count: 2 },
        { session_id: 'sess_008', page_count: 3 },
        { session_id: 'sess_009', page_count: 1 },
        { session_id: 'sess_010', page_count: 2 },
        { session_id: 'sess_011', page_count: 3 },
        { session_id: 'sess_012', page_count: 1 }
    ]
};

// Section 3: Device Breakdown (devices)
export const deviceBreakdownData = {
    headers: [
        { text: 'Device Type', value: 'device_type', sortable: true },
        { text: 'Browser', value: 'browser', sortable: true },
        { text: 'Count', value: 'count', sortable: true }
    ],
    items: [
        { device_type: 'Desktop', browser: 'Chrome', count: 250 },
        { device_type: 'Desktop', browser: 'Firefox', count: 150 },
        { device_type: 'Mobile', browser: 'Safari', count: 300 },
        { device_type: 'Mobile', browser: 'Chrome', count: 200 },
        { device_type: 'Tablet', browser: 'Safari', count: 100 },
        { device_type: 'Desktop', browser: 'Edge', count: 120 },
        { device_type: 'Mobile', browser: 'Firefox', count: 80 },
        { device_type: 'Tablet', browser: 'Chrome', count: 90 },
        { device_type: 'Desktop', browser: 'Safari', count: 70 },
        { device_type: 'Mobile', browser: 'Edge', count: 60 },
        { device_type: 'Tablet', browser: 'Firefox', count: 50 },
        { device_type: 'Desktop', browser: 'Opera', count: 40 }
    ]
};

// Section 4: Timezones & Language (page_views)
export const timezoneLanguageData = {
    headers: [
        { text: 'Timezone', value: 'timezone', sortable: true },
        { text: 'Language', value: 'language', sortable: true },
        { text: 'Session Count', value: 'session_count', sortable: true },
        { text: 'Avg Duration (s)', value: 'avg_duration', sortable: true }
    ],
    items: [
        { timezone: 'America/New_York', language: 'en', session_count: 500, avg_duration: 120 },
        { timezone: 'Europe/London', language: 'en', session_count: 300, avg_duration: 150 },
        { timezone: 'America/Toronto', language: 'en', session_count: 200, avg_duration: 100 },
        { timezone: 'Europe/Berlin', language: 'de', session_count: 250, avg_duration: 130 },
        { timezone: 'Australia/Sydney', language: 'en', session_count: 180, avg_duration: 140 },
        { timezone: 'Asia/Tokyo', language: 'ja', session_count: 220, avg_duration: 160 },
        { timezone: 'America/Sao_Paulo', language: 'pt', session_count: 150, avg_duration: 110 },
        { timezone: 'Asia/Kolkata', language: 'hi', session_count: 270, avg_duration: 125 },
        { timezone: 'Europe/Paris', language: 'fr', session_count: 190, avg_duration: 135 },
        { timezone: 'Africa/Johannesburg', language: 'en', session_count: 100, avg_duration: 145 },
        { timezone: 'Europe/Madrid', language: 'es', session_count: 170, avg_duration: 115 },
        { timezone: 'Europe/Rome', language: 'it', session_count: 160, avg_duration: 155 }
    ]
};

// Section 5: Map (geo_locations)
export const geoLocationsData = {
    headers: [
        { text: 'Session ID', value: 'session_id', sortable: true },
        { text: 'Latitude', value: 'latitude', sortable: true },
        { text: 'Longitude', value: 'longitude', sortable: true }
    ],
    items: [
        { session_id: 'sess_001', latitude: 40.7128, longitude: -74.0060 }, // New York
        { session_id: 'sess_002', latitude: 51.5074, longitude: -0.1278 }, // London
        { session_id: 'sess_003', latitude: 43.6532, longitude: -79.3832 }, // Toronto
        { session_id: 'sess_004', latitude: 52.5200, longitude: 13.4050 }, // Berlin
        { session_id: 'sess_005', latitude: -33.8688, longitude: 151.2093 }, // Sydney
        { session_id: 'sess_006', latitude: 35.6762, longitude: 139.6503 }, // Tokyo
        { session_id: 'sess_007', latitude: -23.5505, longitude: -46.6333 }, // Sao Paulo
        { session_id: 'sess_008', latitude: 28.6139, longitude: 77.2090 }, // New Delhi
        { session_id: 'sess_009', latitude: 48.8566, longitude: 2.3522 }, // Paris
        { session_id: 'sess_010', latitude: -26.2041, longitude: 28.0473 }, // Johannesburg
        { session_id: 'sess_011', latitude: 40.4168, longitude: -3.7038 }, // Madrid
        { session_id: 'sess_012', latitude: 41.9028, longitude: 12.4964 } // Rome
    ]
};

// Section 6: Breadcrumb Journey (user_journeys)
export const breadcrumbJourneyData = {
    headers: [
        { text: 'Session ID', value: 'session_id', sortable: true },
        { text: 'Page', value: 'page', sortable: true },
        { text: 'Visited At', value: 'visited_at', sortable: true }
    ],
    items: [
        { session_id: 'sess_001', page: '/home', visited_at: '2025-07-03T13:18:00Z' },
        { session_id: 'sess_001', page: '/products', visited_at: '2025-07-03T13:19:00Z' },
        { session_id: 'sess_002', page: '/products', visited_at: '2025-07-03T13:17:00Z' },
        { session_id: 'sess_002', page: '/cart', visited_at: '2025-07-03T13:18:00Z' },
        { session_id: 'sess_003', page: '/about', visited_at: '2025-07-03T13:16:00Z' },
        { session_id: 'sess_004', page: '/contact', visited_at: '2025-07-03T13:19:00Z' },
        { session_id: 'sess_005', page: '/blog', visited_at: '2025-07-03T13:15:00Z' },
        { session_id: 'sess_006', page: '/pricing', visited_at: '2025-07-03T13:17:00Z' },
        { session_id: 'sess_007', page: '/home', visited_at: '2025-07-03T13:18:00Z' },
        { session_id: 'sess_008', page: '/products', visited_at: '2025-07-03T13:16:00Z' },
        { session_id: 'sess_009', page: '/cart', visited_at: '2025-07-03T13:19:00Z' },
        { session_id: 'sess_010', page: '/blog', visited_at: '2025-07-03T13:15:00Z' },
    ]
};