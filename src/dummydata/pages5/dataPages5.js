export const errorLogs = {
    headers: [
        { text: 'Message', value: 'message', sortable: true },
        { text: 'Occurred At', value: 'occurred_at', sortable: true },
        { text: 'Stack Trace', value: 'stack_trace', sortable: true }
    ],
    items: [
        { message: 'TypeError: Cannot read property', occurred_at: '2025-07-03 15:50:00', stack_trace: 'file.js:12' },
        { message: 'Network Error: Timeout', occurred_at: '2025-07-03 15:48:00', stack_trace: 'network.js:5' },
        { message: 'SyntaxError: Unexpected token', occurred_at: '2025-07-03 15:46:00', stack_trace: 'script.js:23' },
        { message: 'ReferenceError: x is not defined', occurred_at: '2025-07-03 15:44:00', stack_trace: 'app.js:8' },
        { message: 'Fetch Error: 404 Not Found', occurred_at: '2025-07-03 15:42:00', stack_trace: 'fetch.js:15' },
        { message: 'TypeError: null is not an object', occurred_at: '2025-07-03 15:40:00', stack_trace: 'dom.js:9' },
        { message: 'RangeError: Invalid array length', occurred_at: '2025-07-03 15:38:00', stack_trace: 'array.js:7' },
        { message: 'EvalError: Invalid eval', occurred_at: '2025-07-03 15:36:00', stack_trace: 'eval.js:4' },
        { message: 'URIError: Malformed URI', occurred_at: '2025-07-03 15:34:00', stack_trace: 'uri.js:6' },
        { message: 'TypeError: Cannot set property', occurred_at: '2025-07-03 15:32:00', stack_trace: 'obj.js:10' },
        { message: 'Network Error: Server Down', occurred_at: '2025-07-03 15:30:00', stack_trace: 'server.js:3' },
        { message: 'SyntaxError: Missing semicolon', occurred_at: '2025-07-03 15:28:00', stack_trace: 'code.js:18' },
        { message: 'ReferenceError: y is undefined', occurred_at: '2025-07-03 15:26:00', stack_trace: 'script.js:12' },
        { message: 'Fetch Error: 500 Internal', occurred_at: '2025-07-03 15:24:00', stack_trace: 'fetch.js:20' },
        { message: 'TypeError: Invalid argument', occurred_at: '2025-07-03 15:22:00', stack_trace: 'func.js:5' },
        { message: 'RangeError: Out of bounds', occurred_at: '2025-07-03 15:20:00', stack_trace: 'array.js:14' },
        { message: 'EvalError: Code not valid', occurred_at: '2025-07-03 15:18:00', stack_trace: 'eval.js:9' },
        { message: 'URIError: Bad encoding', occurred_at: '2025-07-03 15:16:00', stack_trace: 'uri.js:11' },
        { message: 'TypeError: Cannot call method', occurred_at: '2025-07-03 15:14:00', stack_trace: 'method.js:7' },
        { message: 'Network Error: Connection Lost', occurred_at: '2025-07-03 15:12:00', stack_trace: 'net.js:4' },
        { message: 'SyntaxError: Unexpected EOF', occurred_at: '2025-07-03 15:10:00', stack_trace: 'parse.js:6' },
        { message: 'ReferenceError: z is not defined', occurred_at: '2025-07-03 15:08:00', stack_trace: 'var.js:3' },
        { message: 'Fetch Error: 403 Forbidden', occurred_at: '2025-07-03 15:06:00', stack_trace: 'fetch.js:17' },
        { message: 'TypeError: Object expected', occurred_at: '2025-07-03 15:04:00', stack_trace: 'obj.js:12' },
        { message: 'RangeError: Maximum call', occurred_at: '2025-07-03 15:02:00', stack_trace: 'rec.js:8' }
    ]
};

export const botTable = {
    headers: [
        { text: 'Bot Name', value: 'bot_name', sortable: true },
        { text: 'Verified', value: 'verified', sortable: true },
        { text: 'Session', value: 'session', sortable: true }
    ],
    items: [
        { bot_name: 'Googlebot', verified: true, session: 'bot-sess001' },
        { bot_name: 'Bingbot', verified: true, session: 'bot-sess002' },
        { bot_name: 'YandexBot', verified: true, session: 'bot-sess003' },
        { bot_name: 'DuckDuckBot', verified: true, session: 'bot-sess004' },
        { bot_name: 'AhrefsBot', verified: false, session: 'bot-sess005' },
        { bot_name: 'SemrushBot', verified: false, session: 'bot-sess006' },
        { bot_name: 'MajesticBot', verified: false, session: 'bot-sess007' },
        { bot_name: 'Baiduspider', verified: true, session: 'bot-sess008' },
        { bot_name: 'ScrapyBot', verified: false, session: 'bot-sess009' },
        { bot_name: 'PhantomJS', verified: false, session: 'bot-sess010' },
        { bot_name: 'TweetmemeBot', verified: true, session: 'bot-sess011' },
        { bot_name: 'LinkChecker', verified: false, session: 'bot-sess012' },
        { bot_name: 'PinterestBot', verified: true, session: 'bot-sess013' },
        { bot_name: 'Facebot', verified: true, session: 'bot-sess014' },
        { bot_name: 'SogouBot', verified: true, session: 'bot-sess015' },
        { bot_name: 'UnknownBot1', verified: false, session: 'bot-sess016' },
        { bot_name: 'UnknownBot2', verified: false, session: 'bot-sess017' },
        { bot_name: 'UnknownBot3', verified: false, session: 'bot-sess018' },
        { bot_name: 'UnknownBot4', verified: false, session: 'bot-sess019' },
        { bot_name: 'UnknownBot5', verified: false, session: 'bot-sess020' }
    ]
};

export const monthHumanBot = {
    title: 'Human VS Bot',
    categories: ['Human', 'Bot'],
    seriesData: [1200, 300],
}

export const humanVsBot = {
    title: 'Human VS Bot',
    categories: [
        '2025-07-01', '2025-07-02', '2025-07-03', '2025-07-04', '2025-07-05',
        '2025-07-06', '2025-07-07', '2025-07-08', '2025-07-09', '2025-07-10',
        '2025-07-11', '2025-07-12', '2025-07-13', '2025-07-14', '2025-07-15',
        '2025-07-16', '2025-07-17', '2025-07-18', '2025-07-19', '2025-07-20',
        '2025-07-21', '2025-07-22', '2025-07-23', '2025-07-24', '2025-07-25',
        '2025-07-26', '2025-07-27', '2025-07-28', '2025-07-29', '2025-07-30',
        '2025-07-31'
    ],
    seriesData: [
        {
            name: 'Bot',
            data: [
                44, 55, 57, 56, 61, 58, 63, 60, 66, 62,
                59, 64, 67, 65, 70, 68, 72, 71, 69, 73,
                75, 74, 76, 77, 78, 79, 80, 82, 81, 83,
                84
            ]
        },
        {
            name: 'Human',
            data: [
                76, 85, 101, 98, 87, 105, 91, 114, 94, 102,
                108, 97, 110, 103, 99, 112, 106, 100, 115, 104,
                109, 111, 107, 113, 116, 118, 120, 119, 117, 121,
                122
            ]
        }
    ],
    headers: [
        { text: 'Session', value: 'session', sortable: true },
        { text: 'Type', value: 'type', sortable: true },
        { text: 'IP', value: 'ip_address', sortable: true }
    ],
    items: [
        { session: 'sess205', type: 'Human', ip_address: '192.168.1.1' },
        { session: 'bot-sess001', type: 'Bot', ip_address: '203.0.113.1' },
        { session: 'sess206', type: 'Human', ip_address: '192.168.1.2' },
        { session: 'bot-sess002', type: 'Bot', ip_address: '203.0.113.2' },
        { session: 'sess207', type: 'Human', ip_address: '192.168.1.3' },
        { session: 'bot-sess003', type: 'Bot', ip_address: '203.0.113.3' },
        { session: 'sess208', type: 'Human', ip_address: '172.16.0.4' },
        { session: 'bot-sess004', type: 'Bot', ip_address: '203.0.113.4' },
        { session: 'sess209', type: 'Human', ip_address: '172.16.0.5' },
        { session: 'bot-sess005', type: 'Bot', ip_address: '203.0.113.5' },
        { session: 'sess210', type: 'Human', ip_address: '10.0.0.6' },
        { session: 'bot-sess006', type: 'Bot', ip_address: '203.0.113.6' },
        { session: 'sess211', type: 'Human', ip_address: '10.0.0.7' },
        { session: 'bot-sess007', type: 'Bot', ip_address: '203.0.113.7' },
        { session: 'sess212', type: 'Human', ip_address: '192.168.2.8' },
        { session: 'bot-sess008', type: 'Bot', ip_address: '203.0.113.8' },
        { session: 'sess213', type: 'Human', ip_address: '192.168.2.9' },
        { session: 'bot-sess009', type: 'Bot', ip_address: '203.0.113.9' },
        { session: 'sess214', type: 'Human', ip_address: '172.16.1.10' },
        { session: 'bot-sess010', type: 'Bot', ip_address: '203.0.113.10' },
        { session: 'sess215', type: 'Human', ip_address: '172.16.1.11' },
        { session: 'bot-sess011', type: 'Bot', ip_address: '203.0.113.11' },
        { session: 'sess216', type: 'Human', ip_address: '10.0.1.12' },
        { session: 'bot-sess012', type: 'Bot', ip_address: '203.0.113.12' },
        { session: 'sess217', type: 'Human', ip_address: '10.0.1.13' }
    ]
};

export const pageLoadTable = {
    headers: [
        { text: 'URL', value: 'url', sortable: true },
        { text: 'Load Time (ms)', value: 'load_time', sortable: true },
        { text: 'Duration (s)', value: 'duration', sortable: true }
    ],
    items: [
        { url: '/home', load_time: 1200, duration: 5 },
        { url: '/product', load_time: 1500, duration: 6 },
        { url: '/cart', load_time: 1300, duration: 5.5 },
        { url: '/checkout', load_time: 1800, duration: 7 },
        { url: '/thank-you', load_time: 1100, duration: 4.5 },
        { url: '/signup', load_time: 1400, duration: 6.5 },
        { url: '/verify', load_time: 1600, duration: 7.5 },
        { url: '/welcome', load_time: 1200, duration: 5 },
        { url: '/contact', load_time: 1300, duration: 5.5 },
        { url: '/submit', load_time: 1500, duration: 6 },
        { url: '/help', load_time: 1100, duration: 4.5 },
        { url: '/chat', load_time: 1400, duration: 6.5 },
        { url: '/download', load_time: 1700, duration: 7 },
        { url: '/confirm', load_time: 1200, duration: 5 },
        { url: '/login', load_time: 1300, duration: 5.5 },
        { url: '/search', load_time: 1500, duration: 6 },
        { url: '/results', load_time: 1400, duration: 6.5 },
        { url: '/detail', load_time: 1600, duration: 7 },
        { url: '/blog', load_time: 1100, duration: 4.5 },
        { url: '/about', load_time: 1200, duration: 5 }
    ]
};

export const jsErrorRate = {
    headers: [
        { text: 'Date', value: 'date', sortable: true },
        { text: 'Period', value: 'period', sortable: true },
        { text: 'Error Count', value: 'error_count', sortable: true }
    ],
    items: [
        { date: '2025-06-29', period: 'Week', error_count: 45 },
        { date: '2025-06-30', period: 'Week', error_count: 38 },
        { date: '2025-07-01', period: 'Week', error_count: 50 },
        { date: '2025-07-02', period: 'Week', error_count: 42 },
        { date: '2025-07-03', period: 'Day', error_count: 15 },
        { date: '2025-06-29', period: 'Day', error_count: 10 },
        { date: '2025-06-30', period: 'Day', error_count: 12 },
        { date: '2025-07-01', period: 'Day', error_count: 18 },
        { date: '2025-07-02', period: 'Day', error_count: 14 },
        { date: '2025-07-03', period: 'Day', error_count: 15 },
        { date: '2025-06-22', period: 'Week', error_count: 35 },
        { date: '2025-06-23', period: 'Week', error_count: 40 },
        { date: '2025-06-24', period: 'Week', error_count: 38 },
        { date: '2025-06-25', period: 'Week', error_count: 45 },
        { date: '2025-06-26', period: 'Week', error_count: 30 },
        { date: '2025-06-27', period: 'Week', error_count: 33 },
        { date: '2025-06-28', period: 'Week', error_count: 37 },
        { date: '2025-06-29', period: 'Week', error_count: 45 },
        { date: '2025-06-30', period: 'Week', error_count: 38 },
        { date: '2025-07-01', period: 'Week', error_count: 50 },
        { date: '2025-07-02', period: 'Week', error_count: 42 },
        { date: '2025-07-03', period: 'Day', error_count: 15 },
        { date: '2025-06-15', period: 'Week', error_count: 28 },
        { date: '2025-06-16', period: 'Week', error_count: 32 },
        { date: '2025-06-17', period: 'Week', error_count: 35 },
        { date: '2025-06-18', period: 'Week', error_count: 30 },
        { date: '2025-06-19', period: 'Week', error_count: 33 },
        { date: '2025-06-20', period: 'Week', error_count: 29 },
        { date: '2025-06-21', period: 'Week', error_count: 31 },
        { date: '2025-06-22', period: 'Week', error_count: 35 }
    ]
};