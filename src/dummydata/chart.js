export const lineChart = {
    title: 'Page Views per Day (January 2025)',
    categories: ['01-01-2025', '02-01-2025', '03-01-2025', '04-01-2025', '05-01-2025', '06-01-2025', '07-01-2025', '08-01-2025', '09-01-2025', '10-01-2025', '11-01-2025', '12-01-2025', '13-01-2025', '14-01-2025', '15-01-2025', '16-01-2025', '17-01-2025', '18-01-2025', '19-01-2025', '20-01-2025', '21-01-2025', '22-01-2025', '23-01-2025', '24-01-2025', '25-01-2025', '26-01-2025', '27-01-2025', '28-01-2025', '29-01-2025', '30-01-2025', '31-01-2025'],
    seriesData: [150, 180, 200, 220, 250, 270, 300, 320, 310, 290, 280, 300, 350, 380, 400, 420, 410, 390, 370, 400, 430, 450, 470, 500, 520, 510, 490, 480, 500, 530, 550]
}
export const barChart = {
    title: 'Page Views per Month',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    seriesData: [220, 330, 290, 500, 310, 400, 450, 380, 600, 520, 610, 700]
}
export const deviceTypeChart = {
    title: 'Device Type Distribution',
    categories: ['Desktop', 'Mobile', 'Tablet', 'Laptop', 'Smartphone', 'iPad', 'Other'],
    seriesData: [45, 50, 5, 30, 55, 10, 2]
};

export const hourlyViewsChart = {
    title: 'Page Views per Hour (July 02, 2025)',
    categories: Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')),
    seriesData: [
        50, 60, 70, 80, 90, 100, 120, 150, 180, 200, 220, 250, // 00:00 - 11:00
        300, 350, 400, 450, 500, 480, 460, 440, 420, 400, 380, 360 // 12:00 - 23:00
    ]
};