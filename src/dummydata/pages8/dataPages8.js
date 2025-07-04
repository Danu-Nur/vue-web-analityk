export const summaryCards = {
    headers: [
        { text: 'Referral Link', value: 'referral_link', sortable: true },
        { text: 'Total Commission (USD)', value: 'total_commission', sortable: true },
        { text: 'Last Payout Date', value: 'last_payout_date', sortable: true }
    ],
    items: [
        { referral_link: 'https://example.com/ref/abc123', total_commission: 250.50, last_payout_date: '2025-06-15 09:00:00' },
        { referral_link: 'https://example.com/ref/def456', total_commission: 180.75, last_payout_date: '2025-06-10 14:30:00' },
        { referral_link: 'https://example.com/ref/ghi789', total_commission: 320.25, last_payout_date: '2025-06-20 11:15:00' },
        { referral_link: 'https://example.com/ref/jkl012', total_commission: 150.00, last_payout_date: '2025-05-25 13:45:00' },
        { referral_link: 'https://example.com/ref/mno345', total_commission: 200.90, last_payout_date: '2025-06-01 10:20:00' }
    ]
};

export const referredUsers = {
    headers: [
        { text: 'User ID', value: 'user_id', sortable: true },
        { text: 'Email', value: 'email', sortable: true },
        { text: 'Referral Code', value: 'referral_code', sortable: true },
        { text: 'Joined At', value: 'joined_at', sortable: true }
    ],
    items: [
        { user_id: 'user001', email: 'user1@example.com', referral_code: 'abc123', joined_at: '2025-06-01 08:00:00' },
        { user_id: 'user002', email: 'user2@example.com', referral_code: 'def456', joined_at: '2025-06-02 09:15:00' },
        { user_id: 'user003', email: 'user3@example.com', referral_code: 'ghi789', joined_at: '2025-06-03 10:30:00' },
        { user_id: 'user004', email: 'user4@example.com', referral_code: 'jkl012', joined_at: '2025-06-04 11:45:00' },
        { user_id: 'user005', email: 'user5@example.com', referral_code: 'mno345', joined_at: '2025-06-05 12:00:00' },
        { user_id: 'user006', email: 'user6@example.com', referral_code: 'abc123', joined_at: '2025-06-06 13:15:00' },
        { user_id: 'user007', email: 'user7@example.com', referral_code: 'def456', joined_at: '2025-06-07 14:30:00' },
        { user_id: 'user008', email: 'user8@example.com', referral_code: 'ghi789', joined_at: '2025-06-08 15:45:00' },
        { user_id: 'user009', email: 'user9@example.com', referral_code: 'jkl012', joined_at: '2025-06-09 08:00:00' },
        { user_id: 'user010', email: 'user10@example.com', referral_code: 'mno345', joined_at: '2025-06-10 09:15:00' },
        { user_id: 'user011', email: 'user11@example.com', referral_code: 'abc123', joined_at: '2025-06-11 10:30:00' },
        { user_id: 'user012', email: 'user12@example.com', referral_code: 'def456', joined_at: '2025-06-12 11:45:00' },
        { user_id: 'user013', email: 'user13@example.com', referral_code: 'ghi789', joined_at: '2025-06-13 12:00:00' },
        { user_id: 'user014', email: 'user14@example.com', referral_code: 'jkl012', joined_at: '2025-06-14 13:15:00' },
        { user_id: 'user015', email: 'user15@example.com', referral_code: 'mno345', joined_at: '2025-06-15 14:30:00' },
        { user_id: 'user016', email: 'user16@example.com', referral_code: 'abc123', joined_at: '2025-06-16 15:45:00' },
        { user_id: 'user017', email: 'user17@example.com', referral_code: 'def456', joined_at: '2025-06-17 08:00:00' },
        { user_id: 'user018', email: 'user18@example.com', referral_code: 'ghi789', joined_at: '2025-06-18 09:15:00' },
        { user_id: 'user019', email: 'user19@example.com', referral_code: 'jkl012', joined_at: '2025-06-19 10:30:00' },
        { user_id: 'user020', email: 'user20@example.com', referral_code: 'mno345', joined_at: '2025-06-20 11:45:00' },
        { user_id: 'user021', email: 'user21@example.com', referral_code: 'abc123', joined_at: '2025-06-21 12:00:00' },
        { user_id: 'user022', email: 'user22@example.com', referral_code: 'def456', joined_at: '2025-06-22 13:15:00' },
        { user_id: 'user023', email: 'user23@example.com', referral_code: 'ghi789', joined_at: '2025-06-23 14:30:00' },
        { user_id: 'user024', email: 'user24@example.com', referral_code: 'jkl012', joined_at: '2025-06-24 15:45:00' },
        { user_id: 'user025', email: 'user25@example.com', referral_code: 'mno345', joined_at: '2025-06-25 08:00:00' }
    ]
};

export const monthlyEarnings = {
    headers: [
        { text: 'Month', value: 'month', sortable: true },
        { text: 'Total Earnings (USD)', value: 'total_earnings', sortable: true }
    ],
    items: [
        { month: '2025-06', total_earnings: 751.50 },
        { month: '2025-05', total_earnings: 620.25 },
        { month: '2025-04', total_earnings: 480.75 },
        { month: '2025-03', total_earnings: 350.00 },
        { month: '2025-02', total_earnings: 290.90 },
        { month: '2025-01', total_earnings: 210.50 },
        { month: '2024-12', total_earnings: 180.75 },
        { month: '2024-11', total_earnings: 150.25 },
        { month: '2024-10', total_earnings: 130.00 },
        { month: '2024-09', total_earnings: 110.90 },
        { month: '2024-08', total_earnings: 95.50 },
        { month: '2024-07', total_earnings: 85.25 },
        { month: '2024-06', total_earnings: 70.00 },
        { month: '2024-05', total_earnings: 60.90 },
        { month: '2024-04', total_earnings: 50.50 },
        { month: '2024-03', total_earnings: 45.25 },
        { month: '2024-02', total_earnings: 40.00 },
        { month: '2024-01', total_earnings: 35.90 },
        { month: '2023-12', total_earnings: 30.50 },
        { month: '2023-11', total_earnings: 25.25 }
    ]
};

export const payoutHistory = {
    headers: [
        { text: 'Payout ID', value: 'payout_id', sortable: true },
        { text: 'Amount (USD)', value: 'amount', sortable: true },
        { text: 'Date', value: 'date', sortable: true },
        { text: 'Status', value: 'status', sortable: true }
    ],
    items: [
        { payout_id: 'pout001', amount: 50.00, date: '2025-06-15 09:00:00', status: 'Completed' },
        { payout_id: 'pout002', amount: 75.25, date: '2025-06-10 14:30:00', status: 'Completed' },
        { payout_id: 'pout003', amount: 100.50, date: '2025-06-20 11:15:00', status: 'Completed' },
        { payout_id: 'pout004', amount: 30.00, date: '2025-05-25 13:45:00', status: 'Completed' },
        { payout_id: 'pout005', amount: 60.90, date: '2025-06-01 10:20:00', status: 'Completed' },
        { payout_id: 'pout006', amount: 45.25, date: '2025-05-15 09:00:00', status: 'Completed' },
        { payout_id: 'pout007', amount: 80.50, date: '2025-05-10 14:30:00', status: 'Completed' },
        { payout_id: 'pout008', amount: 90.75, date: '2025-05-20 11:15:00', status: 'Completed' },
        { payout_id: 'pout009', amount: 25.00, date: '2025-04-25 13:45:00', status: 'Completed' },
        { payout_id: 'pout010', amount: 70.90, date: '2025-04-01 10:20:00', status: 'Completed' },
        { payout_id: 'pout011', amount: 55.25, date: '2025-03-15 09:00:00', status: 'Completed' },
        { payout_id: 'pout012', amount: 85.50, date: '2025-03-10 14:30:00', status: 'Completed' },
        { payout_id: 'pout013', amount: 95.75, date: '2025-03-20 11:15:00', status: 'Completed' },
        { payout_id: 'pout014', amount: 20.00, date: '2025-02-25 13:45:00', status: 'Completed' },
        { payout_id: 'pout015', amount: 65.90, date: '2025-02-01 10:20:00', status: 'Completed' },
        { payout_id: 'pout016', amount: 40.25, date: '2025-01-15 09:00:00', status: 'Completed' },
        { payout_id: 'pout017', amount: 70.50, date: '2025-01-10 14:30:00', status: 'Completed' },
        { payout_id: 'pout018', amount: 80.75, date: '2025-01-20 11:15:00', status: 'Completed' },
        { payout_id: 'pout019', amount: 15.00, date: '2024-12-25 13:45:00', status: 'Completed' },
        { payout_id: 'pout020', amount: 50.90, date: '2024-12-01 10:20:00', status: 'Completed' },
        { payout_id: 'pout021', amount: 35.25, date: '2024-11-15 09:00:00', status: 'Completed' },
        { payout_id: 'pout022', amount: 65.50, date: '2024-11-10 14:30:00', status: 'Completed' },
        { payout_id: 'pout023', amount: 75.75, date: '2024-11-20 11:15:00', status: 'Completed' },
        { payout_id: 'pout024', amount: 10.00, date: '2024-10-25 13:45:00', status: 'Completed' },
        { payout_id: 'pout025', amount: 45.90, date: '2024-10-01 10:20:00', status: 'Completed' }
    ]
};

export const affiliateGuide = {
    content: `
# Affiliate Partnership Guide

## Getting Started
- Sign up for the affiliate program to receive your unique referral link.
- Share your link with your audience via email, social media, or your website.

## Earning Commissions
- Earn a 20% commission on every successful referral that results in a paid subscription.
- Commissions are calculated monthly and paid out on the 15th of each month.

## Tracking Your Progress
- Monitor your referred users and earnings in the dashboard.
- Check the payout history for completed transactions.

## Best Practices
- Use targeted content to promote the referral link.
- Regularly update your audience with the latest offers.

## Support
- Contact support at support@example.com for any questions or issues.
    `
};