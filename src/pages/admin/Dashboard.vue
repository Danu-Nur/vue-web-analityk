<template>
    <div class="bg-white text-gray-900">
        <header class="border-b border-gray-200">
            <nav aria-label="Primary Navigation"
                class="max-w-[1280px] mx-auto flex items-center justify-between px-4 py-3">
                <div class="flex items-center space-x-4">

                    <div class="relative">
                        <div aria-label="User initials SC"
                            class="flex items-center justify-center w-8 h-8 rounded-full border absolute inset-y-0 border-gray-300 text-xs font-semibold text-gray-600">
                            SC
                        </div>
                        <select aria-label="User name Alicia Koch"
                            class="appearance-none border border-gray-300 rounded-md ms-4 py-1.5 pl-3 pr-8 text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-black">
                            <option selected>Alicia Koch</option>
                        </select>
                        <span class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
                            <i class="fas fa-chevron-down text-xs"></i>
                        </span>
                    </div>
                    <a aria-current="page" class="text-sm font-semibold text-gray-900" href="#">Overview</a>
                    <a class="text-sm text-gray-500 hover:text-gray-900" href="#">Customers</a>
                    <a class="text-sm text-gray-500 hover:text-gray-900" href="#">Products</a>
                    <a class="text-sm text-gray-500 hover:text-gray-900" href="#">Settings</a>
                </div>
                <div class="flex items-center space-x-4">
                    <input aria-label="Search"
                        class="border border-gray-300 rounded-md py-1.5 px-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                        placeholder="Search..." type="search" />
                    <img alt="User avatar silhouette of a woman with black hair"
                        class="w-8 h-8 rounded-full object-cover" :height="32" :width="32" loading="lazy"
                        src="https://storage.googleapis.com/a1aa/image/8e84123b-eb5a-4c72-28d9-c9ca4c15f5f1.jpg" />
                </div>
            </nav>
        </header>
        <main class="max-w-[1280px] mx-auto px-4 py-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h1 class="text-2xl font-extrabold leading-tight text-gray-900 mb-3 md:mb-0">Dashboard</h1>
                <div class="flex items-center space-x-3">
                    <button
                        class="flex items-center border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black"
                        type="button">
                        <i class="far fa-calendar-alt mr-2 text-gray-600"></i>
                        <span>Jan 20, 2023 - Feb 9, 2023</span>
                    </button>
                    <button
                        class="bg-black text-white text-sm font-semibold rounded-md py-2 px-4 hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
                        type="button">
                        Download
                    </button>
                </div>
            </div>
            <div class="flex flex-wrap items-center gap-3 mb-6">
                <button class="bg-gray-100 text-gray-900 text-sm font-semibold rounded-md py-1.5 px-4"
                    type="button">Overview</button>
                <button class="text-gray-400 text-sm font-semibold rounded-md py-1.5 px-4 cursor-not-allowed" disabled
                    type="button">Analytics</button>
                <button class="text-gray-400 text-sm font-semibold rounded-md py-1.5 px-4 cursor-not-allowed" disabled
                    type="button">Reports</button>
                <button class="text-gray-400 text-sm font-semibold rounded-md py-1.5 px-4 cursor-not-allowed" disabled
                    type="button">Notifications</button>
            </div>
            <section aria-label="Summary cards" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <article v-for="card in summaryCards" :key="card.title" :aria-label="card.title"
                    class="border border-gray-200 rounded-lg p-4 flex flex-col justify-between">
                    <div class="flex justify-between items-start mb-2">
                        <p class="text-xs text-gray-600 font-semibold">{{ card.title }}</p>
                        <i :class="card.icon" class="text-gray-300 text-sm"></i>
                    </div>
                    <p class="text-2xl font-extrabold text-gray-900 mb-1">{{ card.value }}</p>
                    <p class="text-xs text-gray-500 font-semibold">{{ card.change }}</p>
                </article>
            </section>
            <section aria-label="Main content" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <article aria-label="Overview chart"
                    class="border border-gray-200 rounded-lg p-4 lg:col-span-2 flex flex-col">
                    <h2 class="text-sm font-semibold text-gray-900 mb-4">Overview</h2>
                    <canvas
                        aria-label="Bar chart showing monthly total sales overview from January to November with bars in black color and labeled months Jan, Jun, Nov"
                        class="rounded" height="280" id="overviewChart" width="720"></canvas>
                    <div class="flex justify-end items-center text-xs text-gray-600 mt-2 space-x-1">
                        <span class="w-3 h-3 rounded-full bg-black inline-block"></span>
                        <span>total</span>
                    </div>
                </article>
                <article aria-label="Recent Sales" class="border border-gray-200 rounded-lg p-4">
                    <h2 class="text-sm font-semibold text-gray-900 mb-1">Recent Sales</h2>
                    <p class="text-xs text-gray-500 mb-4">You made 265 sales this month.</p>
                    <ul class="space-y-4">
                        <li v-for="sale in recentSales" :key="sale.email" class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <img :alt="sale.avatarAlt" class="w-8 h-8 rounded-full object-cover" :height="32"
                                    :width="32" loading="lazy" :src="sale.avatar" />
                                <div>
                                    <p class="text-sm font-semibold text-gray-900 leading-tight">{{ sale.name }}</p>
                                    <p class="text-xs text-gray-400 leading-tight">{{ sale.email }}</p>
                                </div>
                            </div>
                            <p class="text-sm font-semibold text-gray-900">{{ sale.amount }}</p>
                        </li>
                    </ul>
                </article>
            </section>
        </main>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
// import Chart from 'chart.js/auto';

export default {
    name: 'App',
    setup() {
        const summaryCards = ref([
            { title: 'Total Revenue', value: '$45,231.89', change: '+20.1% from last month', icon: 'fas fa-dollar-sign' },
            { title: 'Subscriptions', value: '+2350', change: '+180.1% from last month', icon: 'fas fa-user-friends' },
            { title: 'Sales', value: '+12,234', change: '+19% from last month', icon: 'fas fa-credit-card' },
            { title: 'Active Now', value: '+573', change: '+201 since last hour', icon: 'fas fa-chart-line' },
        ]);

        const recentSales = ref([
            {
                name: 'Olivia Martin',
                email: 'olivia.martin@email.com',
                amount: '+$1,999.00',
                avatar: 'https://storage.googleapis.com/a1aa/image/8e84123b-eb5a-4c72-28d9-c9ca4c15f5f1.jpg',
                avatarAlt: 'User avatar silhouette of a woman with black hair',
            },
            {
                name: 'Jackson Lee',
                email: 'jackson.lee@email.com',
                amount: '+$39.00',
                avatar: 'https://storage.googleapis.com/a1aa/image/b2aec910-2d30-4116-722a-0d773a27bff9.jpg',
                avatarAlt: 'User avatar silhouette of a man with short hair and glasses',
            },
            {
                name: 'Isabella Nguyen',
                email: 'isabella.nguyen@email.com',
                amount: '+$299.00',
                avatar: 'https://storage.googleapis.com/a1aa/image/8e84123b-eb5a-4c72-28d9-c9ca4c15f5f1.jpg',
                avatarAlt: 'User avatar silhouette of a woman with black hair',
            },
            {
                name: 'William Kim',
                email: 'will@email.com',
                amount: '+$99.00',
                avatar: 'https://storage.googleapis.com/a1aa/image/b2aec910-2d30-4116-722a-0d773a27bff9.jpg',
                avatarAlt: 'User avatar silhouette of a man with short hair and glasses',
            },
            {
                name: 'Sofia Davis',
                email: 'sofia.davis@email.com',
                amount: '+$39.00',
                avatar: 'https://storage.googleapis.com/a1aa/image/8e84123b-eb5a-4c72-28d9-c9ca4c15f5f1.jpg',
                avatarAlt: 'User avatar silhouette of a woman with black hair',
            },
        ]);

        onMounted(() => {
            const ctx = document.getElementById('overviewChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', '', 'Jun', '', 'Nov'],
                    datasets: [{
                        label: 'total',
                        data: [5500, 1500, 5400, 2100, 1500, 2300, 4000, 1300, 5600, 3200],
                        backgroundColor: '#000000',
                        borderRadius: 4,
                        barPercentage: 0.6,
                        categoryPercentage: 0.6,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: { display: false, drawBorder: false },
                            ticks: {
                                color: '#4B5563',
                                font: { size: 11, family: 'Inter, sans-serif' },
                                maxRotation: 0,
                                autoSkip: false,
                            },
                        },
                        y: {
                            grid: { color: '#E5E7EB', drawBorder: false, borderDash: [4, 4] },
                            ticks: {
                                color: '#9CA3AF',
                                font: { size: 11, family: 'Inter, sans-serif' },
                                stepSize: 1000,
                                beginAtZero: true,
                                maxTicksLimit: 6,
                            },
                            beginAtZero: true,
                        },
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                color: '#000000',
                                font: { size: 12, family: 'Inter, sans-serif', weight: 'bold' },
                                usePointStyle: true,
                                pointStyle: 'circle',
                                padding: 20,
                            },
                        },
                        tooltip: {
                            enabled: true,
                            backgroundColor: '#000000',
                            titleFont: { family: 'Inter, sans-serif', weight: 'bold' },
                            bodyFont: { family: 'Inter, sans-serif' },
                            cornerRadius: 4,
                            padding: 8,
                        },
                    },
                    interaction: { mode: 'nearest', axis: 'x', intersect: false },
                    animation: { duration: 500, easing: 'easeOutQuart' },
                },
            });
        });

        return { summaryCards, recentSales };
    },
};
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
</style>