<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';

const dateRangePicker = defineAsyncComponent(() =>
    import('../../components/ui/DateRangePicker.vue')
);

// Importing the BarChart component asynchronously
const BarChart = defineAsyncComponent(() =>
    import('../../components/apexchart/BarChart.vue')
)

// Importing the LineChart component asynchronously
const LineChart = defineAsyncComponent(() =>
    import('../../components/apexchart/LineChart.vue')
)

// Importing the Datatable component asynchronously
const Datatable = defineAsyncComponent(() =>
    import('../../components/datatables/DataTable.vue')
)

const tabs = ['Overview', 'Analytics', 'Live View', 'Sessions / Users', 'Funnels', 'Reports', 'Events', 'Errors & Bots', 'Settings / API Key', 'Billing / Subscriptions']
const activeTab = ref('Overview')


// Summary cards data
const summaryCards = ref([
    { title: 'Page Views', value: '12,345', change: 'Total pageviews recorded today', rekap: '+20.1%', icon: 'bi-eye' },
    { title: 'Unique Visitors', value: '4,567', change: 'Number of unique visitors tracked', rekap: '+180.1%', icon: 'bi-people' },
    { title: 'Bounce Rate', value: '37.5%', change: 'Percentage of visitors who left quickly', rekap: '+19%', icon: 'bi-box-arrow-right' },
    { title: 'Avg. Duration', value: '3m 45s', change: 'Average session duration', rekap: '+10%', icon: 'bi-clock' },
]);



// Recent sales data
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


// Dynamic Headers (with '24h Visitors' based on visitorperhours.length)
const headers = [
    { text: 'Lane ID', value: 'lane', sortable: true },
    { text: 'Plaza Name', value: 'plaza', sortable: true },
    { text: 'URL', value: 'url', sortable: true },
    { text: 'Date & time', value: 'date', sortable: true },
    { text: 'Visitors', value: 'visit', sortable: true },
    { text: '24h Visitors', value: 'visitorperhours', sortable: true, class: 'text-blue-500 text-center', formatter: (val) => val.length.toString() },
];

// Sample Data (with visitorperhours arrays)
const items = [
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
];
</script>

<template>
    <DashboardAdminLayout>
        <!-- Main Content -->
        <main class="mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h1 class="text-2xl sm:text-3xl font-extrabold leading-tight text-gray-900 mb-4 md:mb-0">Dashboard
                </h1>
                <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <Suspense>
                        <template #default>
                            <!-- Date Range Picker -->
                            <dateRangePicker />
                        </template>
                        <template #fallback>
                            <button
                                class="flex items-center border border-gray-300 rounded-md py-2 px-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black w-full sm:w-auto"
                                type="button">
                                <!-- <i class="far fa-calendar-alt mr-2 "></i> -->
                                <i class="bi bi-calendar mr-2 text-gray-600"></i>
                                <span class="text-transparent">Jan 20, 2023 - Feb 9, 2023</span>
                            </button>
                        </template>
                    </Suspense>
                    <button
                        class="bg-black text-white font-semibold rounded-md py-2 px-4 hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-black w-full sm:w-auto"
                        type="button">
                        Download
                    </button>
                </div>
            </div>

            <!-- Tabs Header -->
            <div class="flex items-center mb-6 overflow-x-auto">
                <div class="flex items-start bg-gray-100 gap-2 p-1 rounded-md justify-between w-max">
                    <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="[
                        'rounded-md py-1 px-2 md:px-4 text-nowrap',
                        activeTab === tab
                            ? 'bg-gradient-to-r from-primary-600 to-indigo-500 text-white'
                            : 'text-gray-400 hover:text-gray-600'
                    ]" type="button">
                        {{ tab }}
                    </button>
                </div>
            </div>

            <!-- Tabs Content -->
            <!-- <div class="bg-white p-4 rounded-md shadow">
                <div v-if="activeTab === 'Overview'">
                    <h2 class="text-xl font-bold mb-2">Overview</h2>
                    <p>Konten overview ditampilkan di sini.</p>
                </div>
                <div v-else-if="activeTab === 'Analytics'">
                    <h2 class="text-xl font-bold mb-2">Analytics</h2>
                    <p>Konten analytics ditampilkan di sini.</p>
                </div>
                <div v-else-if="activeTab === 'Reports'">
                    <h2 class="text-xl font-bold mb-2">Reports</h2>
                    <p>Konten reports ditampilkan di sini.</p>
                </div>
                <div v-else-if="activeTab === 'Notifications'">
                    <h2 class="text-xl font-bold mb-2">Notifications</h2>
                    <p>Konten notifikasi ditampilkan di sini.</p>
                </div>
            </div> -->

            <!-- Summary Cards -->
            <section aria-label="Summary cards"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                <article v-for="card in summaryCards" :key="card.title" :aria-label="card.title"
                    class="border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col justify-between">
                    <div class="flex justify-between items-start mb-2">
                        <p class="text-gray-700 font-semibold">{{ card.title }}</p>
                        <i :class="card.icon" class="text-gray-400 text-xl"></i>
                    </div>
                    <p class="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">{{ card.value }}</p>
                    <div class="flex justify-between">
                        <p class="text-sm text-gray-500">{{ card.change }}</p>
                        <span
                            class="flex items-center border border-gray-300 h-max rounded px-1 py-0.5 text-[10px] font-semibold text-gray-600">
                            <i class="fas fa-chart-line text-[10px]">
                            </i>
                            <span>
                                {{ card.rekap }}
                            </span>
                        </span>
                    </div>

                </article>
            </section>

            <!-- Main Content Grid -->
            <section aria-label="Main content"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                <article aria-label="Overview chart"
                    class="border border-gray-200 rounded-lg p-4 lg:col-span-2 flex flex-col">
                    <h2 class="font-semibold text-gray-900 mb-4">Overview</h2>
                    <Suspense>
                        <template #default>
                            <LineChart :title="'Page Views per Day (January 2025)'"
                                :categories="['01-01-2025', '02-01-2025', '03-01-2025', '04-01-2025', '05-01-2025', '06-01-2025', '07-01-2025', '08-01-2025', '09-01-2025', '10-01-2025', '11-01-2025', '12-01-2025', '13-01-2025', '14-01-2025', '15-01-2025', '16-01-2025', '17-01-2025', '18-01-2025', '19-01-2025', '20-01-2025', '21-01-2025', '22-01-2025', '23-01-2025', '24-01-2025', '25-01-2025', '26-01-2025', '27-01-2025', '28-01-2025', '29-01-2025', '30-01-2025', '31-01-2025']"
                                :seriesData="[150, 180, 200, 220, 250, 270, 300, 320, 310, 290, 280, 300, 350, 380, 400, 420, 410, 390, 370, 400, 430, 450, 470, 500, 520, 510, 490, 480, 500, 530, 550]" />
                        </template>
                        <template #fallback>
                            <div>Loading chart...</div>
                        </template>
                    </Suspense>
                </article>
                <article aria-label="Recent Sales" class="border border-gray-200 rounded-lg p-4">
                    <h2 class="font-semibold text-gray-900 mb-4">Overview</h2>
                    <Suspense>
                        <template #default>
                            <BarChart :title="'Page Views per Month'"
                                :categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                                :seriesData="[220, 330, 290, 500, 310, 400, 450, 380, 600, 520, 610, 700]" />
                        </template>
                        <template #fallback>
                            <div>Loading chart...</div>
                        </template>
                    </Suspense>
                </article>
            </section>
            <section aria-label="Main content" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <article aria-label="Recent Sales" class="border border-gray-200 lg:col-span-3 rounded-lg p-4">
                    <h2 class="font-semibold text-gray-900 mb-1">Recent Sales</h2>
                    <p class="text-xs text-gray-500 mb-4">You made 265 sales this month.</p>
                    <Suspense>
                        <template #default>
                            <Datatable :headers="headers" :items="items" title="All Transactions" />
                        </template>
                        <template #fallback>
                            <div class="w-full h-full flex justify-center">Loading data...</div>
                        </template>
                    </Suspense>
                </article>
                <!-- <article aria-label="Recent Sales" class="border border-gray-200 rounded-lg p-4">
                    <h2 class="font-semibold text-gray-900 mb-1">Recent Sales</h2>
                    <p class="text-xs text-gray-500 mb-4">You made 265 sales this month.</p>
                    <ul class="space-y-4">
                        <li v-for="sale in recentSales" :key="sale.email" class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <img :alt="sale.avatarAlt" class="w-8 h-8 rounded-full object-cover" :height="32"
                                    :width="32" loading="lazy" :src="sale.avatar" />
                                <div>
                                    <p class="font-semibold text-gray-900 leading-tight">{{ sale.name }}</p>
                                    <p class="text-xs text-gray-400 leading-tight">{{ sale.email }}</p>
                                </div>
                            </div>
                            <p class="font-semibold text-gray-900">{{ sale.amount }}</p>
                        </li>
                    </ul>
                </article> -->
                <article aria-label="Recent Sales" class="border border-gray-200 rounded-lg p-4">
                    <h2 class="font-semibold text-gray-900 mb-1">Recent Sales</h2>
                    <p class="text-xs text-gray-500 mb-4">You made 265 sales this month.</p>
                    <ul class="space-y-4">
                        <li v-for="sale in recentSales" :key="sale.email" class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <img :alt="sale.avatarAlt" class="w-8 h-8 rounded-full object-cover" :height="32"
                                    :width="32" loading="lazy" :src="sale.avatar" />
                                <div>
                                    <p class="font-semibold text-gray-900 leading-tight">{{ sale.name }}</p>
                                    <p class="text-xs text-gray-400 leading-tight">{{ sale.email }}</p>
                                </div>
                            </div>
                            <p class="font-semibold text-gray-900">{{ sale.amount }}</p>
                        </li>
                    </ul>
                </article>
            </section>
        </main>
    </DashboardAdminLayout>
</template>
<style></style>