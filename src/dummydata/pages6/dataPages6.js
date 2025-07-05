export const apiKeys = {
    headers: [
        { text: 'Key', value: 'key', sortable: true },
        { text: 'Domain', value: 'domain', sortable: true },
        { text: 'Is Active', value: 'is_active', sortable: true },
        { text: 'Created At', value: 'created_at', sortable: true }
    ],
    items: [
        { key: 'abc123-xyz456', domain: 'example.com', is_active: true, created_at: '2025-06-01 09:00:00' },
        { key: 'def789-pqr012', domain: 'testsite.com', is_active: true, created_at: '2025-06-02 10:30:00' },
        { key: 'ghi345-stu678', domain: 'demo.org', is_active: false, created_at: '2025-06-03 14:15:00' },
        { key: 'jkl901-vwx234', domain: 'app.net', is_active: true, created_at: '2025-06-04 11:45:00' },
        { key: 'mno567-yza890', domain: 'portal.com', is_active: false, created_at: '2025-06-05 13:20:00' },
        { key: 'pqr123-bcd456', domain: 'shop.com', is_active: true, created_at: '2025-06-06 09:50:00' },
        { key: 'stu789-efg012', domain: 'blog.org', is_active: true, created_at: '2025-06-07 15:10:00' },
        { key: 'vwx345-hij678', domain: 'forum.net', is_active: false, created_at: '2025-06-08 12:30:00' },
        { key: 'yza901-klm234', domain: 'site.io', is_active: true, created_at: '2025-06-09 10:00:00' },
        { key: 'bcd567-mno890', domain: 'store.com', is_active: true, created_at: '2025-06-10 14:25:00' },
        { key: 'efg123-pqr456', domain: 'news.org', is_active: false, created_at: '2025-06-11 11:40:00' },
        { key: 'hij789-stu012', domain: 'dev.net', is_active: true, created_at: '2025-06-12 13:15:00' },
        { key: 'klm345-vwx678', domain: 'web.io', is_active: true, created_at: '2025-06-13 09:30:00' },
        { key: 'mno901-yza234', domain: 'market.com', is_active: false, created_at: '2025-06-14 15:50:00' },
        { key: 'pqr567-bcd890', domain: 'guide.org', is_active: true, created_at: '2025-06-15 12:10:00' },
        { key: 'stu123-efg456', domain: 'learn.net', is_active: true, created_at: '2025-06-16 10:45:00' },
        { key: 'vwx789-hij012', domain: 'tech.io', is_active: false, created_at: '2025-06-17 14:20:00' },
        { key: 'yza345-klm678', domain: 'help.com', is_active: true, created_at: '2025-06-18 11:35:00' },
        { key: 'bcd901-mno234', domain: 'support.org', is_active: true, created_at: '2025-06-19 13:00:00' },
        { key: 'efg567-pqr890', domain: 'info.net', is_active: false, created_at: '2025-06-20 09:15:00' },
        { key: 'hij123-stu456', domain: 'data.io', is_active: true, created_at: '2025-06-21 15:40:00' },
        { key: 'klm789-vwx012', domain: 'cloud.com', is_active: true, created_at: '2025-06-22 12:55:00' },
        { key: 'mno345-yza678', domain: 'api.org', is_active: false, created_at: '2025-06-23 10:20:00' },
        { key: 'pqr901-bcd234', domain: 'service.net', is_active: true, created_at: '2025-06-24 14:05:00' },
        { key: 'stu567-efg890', domain: 'platform.io', is_active: true, created_at: '2025-06-25 11:30:00' }
    ]
};

export const allowedDomains = {
    headers: [
        { text: 'Domain', value: 'domain', sortable: true }
    ],
    items: [
        { domain: 'example.com' },
        { domain: 'testsite.com' },
        { domain: 'demo.org' },
        { domain: 'app.net' },
        { domain: 'portal.com' },
        { domain: 'shop.com' },
        { domain: 'blog.org' },
        { domain: 'forum.net' },
        { domain: 'site.io' },
        { domain: 'store.com' },
        { domain: 'news.org' },
        { domain: 'dev.net' },
        { domain: 'web.io' },
        { domain: 'market.com' },
        { domain: 'guide.org' },
        { domain: 'learn.net' },
        { domain: 'tech.io' },
        { domain: 'help.com' },
        { domain: 'support.org' },
        { domain: 'info.net' }
    ]
};

export const embedScript = {
    content: `
<script src="https://cdn.example.com/analytics.js?key='{{apiky.key}}'"></script>
    `
};

export const retentionSettings = {
    headers: [
        { text: 'Client ID', value: 'client_id', sortable: true },
        { text: 'Retention Period (days)', value: 'retention_period', sortable: true },
        { text: 'Auto Delete', value: 'auto_delete', sortable: true }
    ],
    items: [
        { client_id: 'client001', retention_period: 30, auto_delete: true },
        { client_id: 'client002', retention_period: 60, auto_delete: false },
        { client_id: 'client003', retention_period: 90, auto_delete: true },
        { client_id: 'client004', retention_period: 45, auto_delete: false },
        { client_id: 'client005', retention_period: 15, auto_delete: true },
        { client_id: 'client006', retention_period: 75, auto_delete: false },
        { client_id: 'client007', retention_period: 30, auto_delete: true },
        { client_id: 'client008', retention_period: 120, auto_delete: false },
        { client_id: 'client009', retention_period: 60, auto_delete: true },
        { client_id: 'client010', retention_period: 90, auto_delete: false },
        { client_id: 'client011', retention_period: 15, auto_delete: true },
        { client_id: 'client012', retention_period: 45, auto_delete: false },
        { client_id: 'client013', retention_period: 75, auto_delete: true },
        { client_id: 'client014', retention_period: 30, auto_delete: false },
        { client_id: 'client015', retention_period: 60, auto_delete: true },
        { client_id: 'client016', retention_period: 90, auto_delete: false },
        { client_id: 'client017', retention_period: 120, auto_delete: true },
        { client_id: 'client018', retention_period: 15, auto_delete: false },
        { client_id: 'client019', retention_period: 45, auto_delete: true },
        { client_id: 'client020', retention_period: 75, auto_delete: false }
    ]
};

export const privacyOptions = {
    headers: [
        { text: 'Client ID', value: 'client_id', sortable: true },
        { text: 'Privacy Settings', value: 'privacy_settings', sortable: true }
    ],
    items: [
        { client_id: 'client001', privacy_settings: '{"track_ip": false, "track_location": true, "anonymize_data": true}' },
        { client_id: 'client002', privacy_settings: '{"track_ip": true, "track_location": false, "anonymize_data": false}' },
        { client_id: 'client003', privacy_settings: '{"track_ip": false, "track_location": false, "anonymize_data": true}' },
        { client_id: 'client004', privacy_settings: '{"track_ip": true, "track_location": true, "anonymize_data": false}' },
        { client_id: 'client005', privacy_settings: '{"track_ip": false, "track_location": true, "anonymize_data": false}' },
        { client_id: 'client006', privacy_settings: '{"track_ip": true, "track_location": false, "anonymize_data": true}' },
        { client_id: 'client007', privacy_settings: '{"track_ip": false, "track_location": false, "anonymize_data": false}' },
        { client_id: 'client008', privacy_settings: '{"track_ip": true, "track_location": true, "anonymize_data": true}' },
        { client_id: 'client009', privacy_settings: '{"track_ip": false, "track_location": true, "anonymize_data": true}' },
        { client_id: 'client010', privacy_settings: '{"track_ip": true, "track_location": false, "anonymize_data": false}' },
        { client_id: 'client011', privacy_settings: '{"track_ip": false, "track_location": false, "anonymize_data": true}' },
        { client_id: 'client012', privacy_settings: '{"track_ip": true, "track_location": true, "anonymize_data": false}' },
        { client_id: 'client013', privacy_settings: '{"track_ip": false, "track_location": true, "anonymize_data": false}' },
        { client_id: 'client014', privacy_settings: '{"track_ip": true, "track_location": false, "anonymize_data": true}' },
        { client_id: 'client015', privacy_settings: '{"track_ip": false, "track_location": false, "anonymize_data": false}' },
        { client_id: 'client016', privacy_settings: '{"track_ip": true, "track_location": true, "anonymize_data": true}' },
        { client_id: 'client017', privacy_settings: '{"track_ip": false, "track_location": true, "anonymize_data": true}' },
        { client_id: 'client018', privacy_settings: '{"track_ip": true, "track_location": false, "anonymize_data": false}' },
        { client_id: 'client019', privacy_settings: '{"track_ip": false, "track_location": false, "anonymize_data": true}' },
        { client_id: 'client020', privacy_settings: '{"track_ip": true, "track_location": true, "anonymize_data": false}' },
        { client_id: 'client021', privacy_settings: '{"track_ip": false, "track_location": true, "anonymize_data": false}' },
        { client_id: 'client022', privacy_settings: '{"track_ip": true, "track_location": false, "anonymize_data": true}' },
        { client_id: 'client023', privacy_settings: '{"track_ip": false, "track_location": false, "anonymize_data": false}' },
        { client_id: 'client024', privacy_settings: '{"track_ip": true, "track_location": true, "anonymize_data": true}' },
        { client_id: 'client025', privacy_settings: '{"track_ip": false, "track_location": true, "anonymize_data": true}' }
    ]
};