
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
