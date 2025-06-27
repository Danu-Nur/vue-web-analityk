<template>
    <section id="hero" class="hero-gradient relative overflow-hidden">
        <div class="container mx-auto px-6 py-20 md:py-32 relative">
            <div class="max-w-3xl mx-auto text-center drop-shadow-lg fade-up">
                <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 drop-shadow-lg">
                    Understand your visitors & Grow with <span class="text-indigo-500">insights.</span>
                </h1>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Privacy-friendly, real-time web analytics for websites.
                </p>
                <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    No credit card required. 14-day free trial.
                </p>
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        class="px-8 py-3 drop-shadow-lg bg-white/90 border border-gray-200 rounded-lg hover:shadow-md transition-all hover:bg-white">
                        Get Started Free
                    </button>
                    <button
                        class="px-8 py-3 drop-shadow-lg border border-gray-200 rounded-lg hover:shadow-md transition-all bg-transparent">
                        <div class="flex items-center justify-center gap-2">
                            <i class="bi bi-play-circle-fill"></i>
                            Watch Demo
                        </div>
                    </button>
                </div>
            </div>

            <div class="mt-20 md:mt-24 mx-auto">
                <div class="w-full h-max flex justify-center">
                    <div class="max-w-screen md:w-3/5 flex justify-center">
                        <div class="relative floating w-full h-max shadow-xl fade-up">
                            <div class="dashboard-preview bg-white rounded-lg overflow-hidden w-full max-w-screen">
                                <div class="bg-gray-100 h-16 flex items-center px-4">
                                    <div class="flex space-x-2">
                                        <div class="w-3.5 h-3.5 rounded-full bg-red-400"></div>
                                        <div class="w-3.5 h-3.5 rounded-full bg-yellow-400"></div>
                                        <div class="w-3.5 h-3.5 rounded-full bg-green-400"></div>
                                    </div>
                                </div>
                                <div class="p-4 h-[calc(100%-4rem)] overflow-y-auto">
                                    <div class="flex justify-between items-center mb-4 shadow-lg p-3">
                                        <h3 class="text-gray-800 text-4xl font-medium drop-shadow-lg">Website Analytics
                                        </h3>
                                        <span
                                            class="bg-blue-100 text-blue-600 px-2 py-1 rounded drop-shadow-lg">Real-time</span>
                                    </div>
                                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                        <div v-for="(metric, index) in metrics" :key="index"
                                            class="rounded-lg shadow-sm">
                                            <div
                                                class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                                                <div class="px-3 pt-8 pb-10 text-center relative z-10">
                                                    <h4 class="text-sm uppercase text-gray-500 leading-tight">{{
                                                        metric.title }}</h4>
                                                    <h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">
                                                        {{ metric.value }}</h3>
                                                    <p
                                                        :class="`text-xs leading-tight ${metric.trend >= 0 ? 'text-green-500' : 'text-red-500'}`">
                                                        {{ metric.trend >= 0 ? '▲' : '▼' }} {{ Math.abs(metric.trend)
                                                        }}%
                                                    </p>
                                                </div>
                                                <div class="absolute bottom-0 inset-x-0">
                                                    <canvas :id="`chart${index + 1}`" height="70"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="h-60 bg-white rounded-lg shadow-sm mb-6">
                                        <canvas class="shadow-lg md:shadow-xl px-3 py-3" id="liveChart"></canvas>
                                    </div>
                                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                        <div class="h-56 bg-white shadow-sm rounded-lg">
                                            <canvas class="shadow-lg md:shadow-xl p-3" id="deviceChart"></canvas>
                                        </div>
                                        <div class="bg-white rounded-lg shadow-sm max-h-56">
                                            <div class="p-3 shadow-lg md:shadow-xl">
                                                <h4 class="text-gray-800 font-semibold text-base mb-3">Top Pages</h4>
                                                <div class="overflow-y-auto px-4 h-40">
                                                    <table id="topPagesTable" class="min-w-full text-sm text-gray-700">
                                                        <thead class="border-b text-gray-500 uppercase text-xs">
                                                            <tr>
                                                                <th class="text-left py-2 px-3">Page</th>
                                                                <th class="text-center py-2 px-3">Pageviews</th>
                                                                <th class="text-center py-2 px-3">Visitors</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="topPagesBody" class="divide-y divide-gray-100">
                                                            <tr v-for="page in pages" :key="page.path" class="border-b">
                                                                <td class="py-2">{{ page.path }}</td>
                                                                <td class="text-center py-2">{{ page.pageviews }}</td>
                                                                <td class="text-center py-2">{{ page.visitors }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="h-56 bg-white shadow-sm rounded-lg">
                                            <canvas class="shadow-lg md:shadow-xl p-3" id="geoChart"></canvas>
                                        </div>
                                        <div class="h-56 bg-white shadow-sm rounded-lg">
                                            <canvas class="shadow-lg md:shadow-xl p-3" id="referralChart"></canvas>
                                        </div>
                                    </div>
                                    <div class="flex justify-between text-xs text-gray-500">
                                        <p>Last updated: Just now</p>
                                        <p>Today, 01:30 PM WIB</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-400 rounded-full opacity-20 blur-3xl">
                            </div>
                            <div
                                class="absolute -top-6 -right-6 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-3xl">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const metrics = ref([
    { title: 'Real-time visitors', value: '3,682', trend: 57.1 },
    { title: 'Page Views', value: '11,427', trend: -42.8 },
    { title: 'Bounce Rate', value: '32%', trend: 8.2 },
]);

const pages = ref([
    { path: '/home', pageviews: 1200, visitors: 800 },
    { path: '/blog', pageviews: 900, visitors: 600 },
    { path: '/products', pageviews: 700, visitors: 500 },
    { path: '/about', pageviews: 400, visitors: 300 },
]);

const chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    elements: { point: { radius: 0 }, line: { tension: 0.4 } },
    scales: {
        x: { display: false },
        y: { display: false, min: 0, max: 10 },
    },
};

onMounted(() => {
    // Chart 1: Real-time visitors
    const ctx1 = document.getElementById('chart1').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: [1, 2, 1, 3, 5, 4, 7],
            datasets: [{
                backgroundColor: 'rgba(101, 116, 205, 0.1)',
                borderColor: 'rgba(101, 116, 205, 0.8)',
                borderWidth: 2,
                fill: 'start',
                data: [2, 2, 1, 3, 5, 4, 7],
            }],
        },
        options: chartOptions,
    });

    // Chart 2: Page Views
    const ctx2 = document.getElementById('chart2').getContext('2d');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: [2, 3, 2, 9, 7, 7, 4],
            datasets: [{
                backgroundColor: 'rgba(246, 109, 155, 0.1)',
                borderColor: 'rgba(246, 109, 155, 0.8)',
                borderWidth: 2,
                fill: 'start',
                data: [2, 3, 2, 9, 7, 7, 4],
            }],
        },
        options: chartOptions,
    });

    // Chart 3: Bounce Rate
    const ctx3 = document.getElementById('chart3').getContext('2d');
    new Chart(ctx3, {
        type: 'line',
        data: {
            labels: [2, 5, 1, 3, 2, 6, 7],
            datasets: [{
                backgroundColor: 'rgba(246, 153, 63, 0.1)',
                borderColor: 'rgba(246, 153, 63, 0.8)',
                borderWidth: 2,
                fill: 'start',
                data: [2, 5, 1, 3, 5, 6, 9],
            }],
        },
        options: chartOptions,
    });

    // Live Traffic Chart
    const liveCtx = document.getElementById('liveChart').getContext('2d');
    const liveChart = new Chart(liveCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Visitors',
                data: [],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'Live Traffic (Visitors per Second)' } },
            scales: {
                x: { title: { display: true, text: 'Time' } },
                y: { title: { display: true, text: 'Visitors' }, beginAtZero: true, suggestedMax: 100 },
            },
        },
    });

    function updateLiveChart() {
        const now = new Date();
        const timeLabel = now.toLocaleTimeString('en-US', { hour12: false });
        if (liveChart.data.labels.length >= 20) {
            liveChart.data.labels.shift();
            liveChart.data.datasets[0].data.shift();
        }
        liveChart.data.labels.push(timeLabel);
        liveChart.data.datasets[0].data.push(Math.floor(Math.random() * 70) + 20);
        liveChart.update();
    }
    setInterval(updateLiveChart, 2000);

    // User Device Chart (Doughnut)
    const deviceCtx = document.getElementById('deviceChart').getContext('2d');
    const deviceChart = new Chart(deviceCtx, {
        type: 'doughnut',
        data: {
            labels: ['Desktop', 'Mobile', 'Tablet'],
            datasets: [{
                data: [40, 50, 10],
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'User Devices' } },
        },
    });

    function updateDeviceChart() {
        deviceChart.data.datasets[0].data = [
            Math.floor(Math.random() * 30) + 30,
            Math.floor(Math.random() * 40) + 40,
            Math.floor(Math.random() * 10) + 5,
        ];
        deviceChart.update();
    }
    setInterval(updateDeviceChart, 5000);

    // Top Pages Table
    function updateTopPagesTable() {
        pages.value.forEach(page => {
            page.pageviews += Math.floor(Math.random() * 50);
            page.visitors += Math.floor(Math.random() * 30);
        });
    }
    updateTopPagesTable();
    setInterval(updateTopPagesTable, 3000);

    // Geo Location Chart (Bar)
    const geoCtx = document.getElementById('geoChart').getContext('2d');
    const geoChart = new Chart(geoCtx, {
        type: 'bar',
        data: {
            labels: ['USA', 'UK', 'India', 'Germany', 'Brazil'],
            datasets: [{
                label: 'Visitors',
                data: [500, 300, 400, 200, 150],
                backgroundColor: '#3b82f6',
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'Geo Location' } },
            scales: { y: { beginAtZero: true, title: { display: true, text: 'Visitors' } } },
        },
    });

    function updateGeoChart() {
        geoChart.data.datasets[0].data = geoChart.data.labels.map(() => Math.floor(Math.random() * 300) + 100);
        geoChart.update();
    }
    setInterval(updateGeoChart, 4000);

    // Referral Sources Chart (Pie)
    const referralCtx = document.getElementById('referralChart').getContext('2d');
    const referralChart = new Chart(referralCtx, {
        type: 'pie',
        data: {
            labels: ['Direct', 'Search', 'Social', 'Referral'],
            datasets: [{
                data: [30, 40, 20, 10],
                backgroundColor: ['#ef4444', '#10b981', '#3b82f6', '#8b5cf6'],
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'Referral Sources' } },
        },
    });

    function updateReferralChart() {
        referralChart.data.datasets[0].data = [
            Math.floor(Math.random() * 20) + 20,
            Math.floor(Math.random() * 30) + 30,
            Math.floor(Math.random() * 15) + 10,
            Math.floor(Math.random() * 10) + 5,
        ];
        referralChart.update();
    }
    setInterval(updateReferralChart, 6000);
});
</script>

<!-- <style scoped>
.hero-gradient {
    background: linear-gradient(to bottom, #e5e7eb, #f3f4f6);
}
</style> -->