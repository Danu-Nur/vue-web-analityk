export const liveUsers = {
    headers: [
        { text: 'IP', value: 'ip_address', sortable: true },
        { text: 'URL', value: 'current_url', sortable: true },
        { text: 'Country', value: 'country', sortable: true },
        { text: 'Time Active', value: 'time_active', sortable: true }
    ],
    items: [
        { ip_address: '192.168.1.1', current_url: '/home', country: 'Indonesia', time_active: '02:15' },
        { ip_address: '192.168.1.2', current_url: '/product', country: 'Singapore', time_active: '01:50' },
        { ip_address: '192.168.1.3', current_url: '/checkout', country: 'Malaysia', time_active: '02:30' },
        { ip_address: '172.16.0.4', current_url: '/blog', country: 'Thailand', time_active: '01:45' },
        { ip_address: '172.16.0.5', current_url: '/about', country: 'Vietnam', time_active: '02:10' },
        { ip_address: '10.0.0.6', current_url: '/contact', country: 'Philippines', time_active: '01:30' },
        { ip_address: '10.0.0.7', current_url: '/home', country: 'Indonesia', time_active: '02:25' },
        { ip_address: '10.0.0.8', current_url: '/product', country: 'Singapore', time_active: '01:55' },
        { ip_address: '192.168.2.9', current_url: '/checkout', country: 'Malaysia', time_active: '02:40' },
        { ip_address: '192.168.2.10', current_url: '/blog', country: 'Thailand', time_active: '01:20' },
        { ip_address: '172.16.1.11', current_url: '/about', country: 'Vietnam', time_active: '02:15' },
        { ip_address: '172.16.1.12', current_url: '/contact', country: 'Philippines', time_active: '01:45' },
        { ip_address: '10.0.1.13', current_url: '/home', country: 'Indonesia', time_active: '02:05' },
        { ip_address: '10.0.1.14', current_url: '/product', country: 'Singapore', time_active: '01:35' },
        { ip_address: '192.168.3.15', current_url: '/checkout', country: 'Malaysia', time_active: '02:20' },
        { ip_address: '192.168.3.16', current_url: '/blog', country: 'Thailand', time_active: '01:50' },
        { ip_address: '172.16.2.17', current_url: '/about', country: 'Vietnam', time_active: '02:10' },
        { ip_address: '172.16.2.18', current_url: '/contact', country: 'Philippines', time_active: '01:30' },
        { ip_address: '10.0.2.19', current_url: '/home', country: 'Indonesia', time_active: '02:25' },
        { ip_address: '10.0.2.20', current_url: '/product', country: 'Singapore', time_active: '01:40' },
        { ip_address: '192.168.4.21', current_url: '/checkout', country: 'Malaysia', time_active: '02:15' },
        { ip_address: '192.168.4.22', current_url: '/blog', country: 'Thailand', time_active: '01:55' },
        { ip_address: '172.16.3.23', current_url: '/about', country: 'Vietnam', time_active: '02:30' },
        { ip_address: '172.16.3.24', current_url: '/contact', country: 'Philippines', time_active: '01:45' },
        { ip_address: '10.0.3.25', current_url: '/home', country: 'Indonesia', time_active: '02:10' }
    ]
};

export const sessionsSummary = {
    headers: [
        { text: 'Session', value: 'session_id', sortable: true },
        { text: 'Pages', value: 'page_count', sortable: true },
        { text: 'Duration', value: 'duration', sortable: true }
    ],
    items: [
        { session_id: 'sess-001', page_count: 6, duration: '4m30s' },
        { session_id: 'sess-002', page_count: 4, duration: '3m15s' },
        { session_id: 'sess-003', page_count: 5, duration: '4m10s' },
        { session_id: 'sess-004', page_count: 3, duration: '2m50s' },
        { session_id: 'sess-005', page_count: 7, duration: '5m20s' },
        { session_id: 'sess-006', page_count: 4, duration: '3m40s' },
        { session_id: 'sess-007', page_count: 6, duration: '4m55s' },
        { session_id: 'sess-008', page_count: 5, duration: '3m30s' },
        { session_id: 'sess-009', page_count: 3, duration: '2m45s' },
        { session_id: 'sess-010', page_count: 4, duration: '3m15s' },
        { session_id: 'sess-011', page_count: 6, duration: '4m25s' },
        { session_id: 'sess-012', page_count: 5, duration: '3m50s' },
        { session_id: 'sess-013', page_count: 4, duration: '3m10s' },
        { session_id: 'sess-014', page_count: 7, duration: '5m00s' },
        { session_id: 'sess-015', page_count: 3, duration: '2m30s' },
        { session_id: 'sess-016', page_count: 6, duration: '4m15s' },
        { session_id: 'sess-017', page_count: 5, duration: '3m45s' },
        { session_id: 'sess-018', page_count: 4, duration: '3m20s' },
        { session_id: 'sess-019', page_count: 3, duration: '2m55s' },
        { session_id: 'sess-020', page_count: 5, duration: '4m05s' },
        { session_id: 'sess-021', page_count: 6, duration: '4m40s' },
        { session_id: 'sess-022', page_count: 4, duration: '3m25s' },
        { session_id: 'sess-023', page_count: 7, duration: '5m10s' },
        { session_id: 'sess-024', page_count: 5, duration: '3m55s' },
        { session_id: 'sess-025', page_count: 3, duration: '2m45s' }
    ]
};

export const deviceBreakdown = {
    title: 'Device Type Distribution',
    categories: ['Desktop', 'Mobile', 'Tablet', 'Laptop', 'Smartphone', 'iPad', 'Other'],
    seriesData: [450, 500, 556, 3043, 550, 100, 245]
};

export const timezonesAndLanguage = {
    headers: [
        { text: 'Timezone', value: 'timezone', sortable: true },
        { text: 'Lang', value: 'language', sortable: true },
        { text: 'Sessions', value: 'session_count', sortable: true },
        { text: 'Avg Duration', value: 'avg_duration', sortable: true }
    ],
    items: [
        { timezone: 'Asia/Jakarta', language: 'en-US', session_count: 1200, avg_duration: '3m15s' },
        { timezone: 'Asia/Singapore', language: 'en-SG', session_count: 800, avg_duration: '2m50s' },
        { timezone: 'Asia/Kuala_Lumpur', language: 'ms-MY', session_count: 600, avg_duration: '4m10s' },
        { timezone: 'Asia/Bangkok', language: 'th-TH', session_count: 450, avg_duration: '3m30s' },
        { timezone: 'Asia/Ho_Chi_Minh', language: 'vi-VN', session_count: 300, avg_duration: '2m45s' },
        { timezone: 'Asia/Manila', language: 'en-PH', session_count: 250, avg_duration: '3m20s' },
        { timezone: 'Asia/Tokyo', language: 'ja-JP', session_count: 200, avg_duration: '4m00s' },
        { timezone: 'Asia/Seoul', language: 'ko-KR', session_count: 180, avg_duration: '3m10s' },
        { timezone: 'Asia/Shanghai', language: 'zh-CN', session_count: 150, avg_duration: '2m55s' },
        { timezone: 'Asia/Jakarta', language: 'id-ID', session_count: 1000, avg_duration: '3m40s' },
        { timezone: 'Asia/Singapore', language: 'zh-SG', session_count: 700, avg_duration: '2m30s' },
        { timezone: 'Asia/Kuala_Lumpur', language: 'en-MY', session_count: 500, avg_duration: '4m05s' },
        { timezone: 'Asia/Bangkok', language: 'en-TH', session_count: 400, avg_duration: '3m25s' },
        { timezone: 'Asia/Ho_Chi_Minh', language: 'en-VN', session_count: 280, avg_duration: '2m50s' },
        { timezone: 'Asia/Manila', language: 'tl-PH', session_count: 230, avg_duration: '3m15s' },
        { timezone: 'Asia/Tokyo', language: 'en-JP', session_count: 190, avg_duration: '3m50s' },
        { timezone: 'Asia/Seoul', language: 'en-KR', session_count: 170, avg_duration: '3m05s' },
        { timezone: 'Asia/Shanghai', language: 'en-CN', session_count: 140, avg_duration: '2m40s' },
        { timezone: 'Asia/Jakarta', language: 'ms-ID', session_count: 900, avg_duration: '3m35s' },
        { timezone: 'Asia/Singapore', language: 'ms-SG', session_count: 650, avg_duration: '2m45s' }
    ]
};

export const mapRealTime = {
    data: [
        { id: 1, lat: -6.2, lng: 106.8, city: 'Jakarta' },
        { id: 2, lat: -7.8, lng: 110.4, city: 'Yogyakarta' },
        { id: 3, lat: -8.7, lng: 115.2, city: 'Denpasar' },
        { id: 4, lat: 1.4, lng: 103.8, city: 'Singapore' },
        { id: 5, lat: 3.1, lng: 101.7, city: 'Kuala Lumpur' },
        { id: 6, lat: 13.8, lng: 100.5, city: 'Bangkok' },
        { id: 7, lat: 10.8, lng: 106.6, city: 'Ho Chi Minh City' },
        { id: 8, lat: 14.6, lng: 121.0, city: 'Manila' },
        { id: 9, lat: -6.1, lng: 106.7, city: 'Tangerang' },
        { id: 10, lat: -7.3, lng: 112.8, city: 'Surabaya' },
        { id: 11, lat: -6.9, lng: 107.6, city: 'Bandung' },
        { id: 12, lat: 1.3, lng: 103.9, city: 'Jurong' },
        { id: 13, lat: 3.1, lng: 101.5, city: 'Petaling Jaya' },
        { id: 14, lat: 13.9, lng: 100.6, city: 'Nonthaburi' },
        { id: 15, lat: 10.8, lng: 106.7, city: 'Hanoi' },
        { id: 16, lat: 14.7, lng: 121.0, city: 'Quezon City' },
        { id: 17, lat: -6.3, lng: 106.6, city: 'Bekasi' },
        { id: 18, lat: -7.5, lng: 110.6, city: 'Semarang' },
        { id: 19, lat: -8.4, lng: 115.2, city: 'Ubud' },
        { id: 20, lat: 1.4, lng: 103.9, city: 'Woodlands' },
        { id: 21, lat: 3.1, lng: 101.6, city: 'Subang Jaya' },
        { id: 22, lat: 13.7, lng: 100.5, city: 'Pathum Thani' },
        { id: 23, lat: 10.8, lng: 106.6, city: 'Da Nang' },
        { id: 24, lat: 14.6, lng: 121.0, city: 'Makati' },
        { id: 25, lat: -6.2, lng: 106.9, city: 'South Jakarta' }
    ]
};

export const userJourney = {
    headers: [
        { text: 'Session ID', value: 'session_id', sortable: true },
        { text: 'Steps', value: 'steps', sortable: true }
    ],
    items: [
        { session_id: 'sess123', steps: ['/', '/product', '/checkout'] },
        { session_id: 'sess124', steps: ['/', '/blog', '/contact'] },
        { session_id: 'sess125', steps: ['/', '/product', '/about'] },
        { session_id: 'sess126', steps: ['/', '/product', '/checkout'] },
        { session_id: 'sess127', steps: ['/', '/blog', '/contact'] },
        { session_id: 'sess128', steps: ['/', '/product', '/checkout'] },
        { session_id: 'sess129', steps: ['/', '/about', '/contact'] },
        { session_id: 'sess130', steps: ['/', '/product', '/checkout'] },
        { session_id: 'sess131', steps: ['/', '/blog', '/contact'] },
        { session_id: 'sess132', steps: ['/', '/product', '/checkout'] },
        { session_id: 'sess133', steps: ['/', '/product', '/about'] },
        { session_id: 'sess134', steps: ['/', '/blog', '/contact'] },
        { session_id: 'sess135', steps: ['/', '/product', '/checkout'] },
        { session_id: 'sess136', steps: ['/', '/about', '/contact'] },
        { session_id: 'sess137', steps: ['/', '/product', '/checkout'] },
        { session_id: 'sess138', steps: ['/', '/blog', '/contact'] },
        { session_id: 'sess139', steps: ['/', '/product', '/about'] },
        { session_id: 'sess140', steps: ['/', '/product', '/checkout'] },
        { session_id: 'sess141', steps: ['/', '/blog', '/contact'] },
        { session_id: 'sess142', steps: ['/', '/product', '/checkout'] },
        { session_id: 'sess143', steps: ['/', '/about', '/contact'] },
        { session_id: 'sess144', steps: ['/', '/product', '/checkout'] },
        { session_id: 'sess145', steps: ['/', '/blog', '/contact'] },
        { session_id: 'sess146', steps: ['/', '/product', '/about'] },
        { session_id: 'sess147', steps: ['/', '/product', '/checkout'] },
        { session_id: 'sess148', steps: ['/', '/blog', '/contact'] },
        { session_id: 'sess149', steps: ['/', '/about', '/contact'] },
        { session_id: 'sess150', steps: ['/', '/product', '/checkout'] },
        { session_id: 'sess151', steps: ['/', '/blog', '/contact'] },
        { session_id: 'sess152', steps: ['/', '/product', '/checkout'] }
    ],
    breadcrumb: [
        { session_id: 'sess123', path: '/ → /product → /checkout' },
        { session_id: 'sess124', path: '/ → /blog → /contact' },
        { session_id: 'sess125', path: '/ → /product → /about' },
        { session_id: 'sess126', path: '/ → /product → /checkout' },
        { session_id: 'sess127', path: '/ → /blog → /contact' },
        { session_id: 'sess128', path: '/ → /product → /checkout' },
        { session_id: 'sess129', path: '/ → /about → /contact' },
        { session_id: 'sess130', path: '/ → /product → /checkout' },
        { session_id: 'sess131', path: '/ → /blog → /contact' },
        { session_id: 'sess132', path: '/ → /product → /checkout' },
        { session_id: 'sess133', path: '/ → /product → /about' },
        { session_id: 'sess134', path: '/ → /blog → /contact' },
        { session_id: 'sess135', path: '/ → /product → /checkout' },
        { session_id: 'sess136', path: '/ → /about → /contact' },
        { session_id: 'sess137', path: '/ → /product → /checkout' }
    ]
};