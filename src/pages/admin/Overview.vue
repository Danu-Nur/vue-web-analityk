<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
import SkeletonChart from '../../components/skeleton/SkeletonChart.vue';
import SkeletonSummaryCards from '../../components/skeleton/SkeletonSummaryCards.vue';
import SkeletonTable from '../../components/skeleton/SkeletonTable.vue';
import { table1 } from '../../dummydata/table';
import { lineChart, barChart } from '../../dummydata/chart';
import { recentSaless } from '../../dummydata/recent';
const SummaryCards = defineAsyncComponent(() => import('../../blocks/dashboard/admin/overview/SummaryCards.vue'))

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

// Recent sales data
const recentSales = ref(recentSaless.data);
const lineChartData = ref(lineChart)
const barChartData = ref(barChart)
const headers = ref(table1.headers)
const items = ref(table1.items)

</script>

<template>
    <DashboardAdminLayout>
        <!-- Main Content -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 class="text-2xl sm:text-3xl font-extrabold leading-tight text-gray-900 mb-4 md:mb-0">Overview
            </h1>
            <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <Suspense>
                    <template #default>
                        <!-- Date Range Picker -->
                        <dateRangePicker />
                    </template>

                    <template #fallback>
                        <!-- Skeleton Placeholder -->
                        <div
                            class="flex items-center border border-gray-300 rounded-md py-2 px-4 w-full sm:w-auto bg-white animate-pulse">
                            <i class="bi bi-calendar mr-2 text-gray-400"></i>
                            <div class="h-4 w-40 bg-gray-200 rounded"></div>
                        </div>
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
        <!-- <div class="flex items-center mb-6 overflow-x-auto">
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
            </div> -->

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
        <Suspense>
            <template #default>
                <SummaryCards />
            </template>
            <template #fallback>
                <SkeletonSummaryCards />
            </template>
        </Suspense>

        <!-- Main Content Grid -->
        <section aria-label="Main content" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <article aria-label="Overview chart"
                class="border border-gray-200 rounded-lg p-4 lg:col-span-2 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Overview</h2>
                <Suspense>
                    <template #default>
                        <LineChart :title="lineChartData.title" :categories="lineChartData.categories"
                            :seriesData="lineChartData.seriesData" />
                    </template>
                    <template #fallback>
                        <SkeletonChart chartType="line" />
                    </template>
                </Suspense>
            </article>
            <article aria-label="Recent Sales" class="border border-gray-200 rounded-lg p-4">
                <h2 class="font-semibold text-gray-900 mb-4">Overview</h2>
                <Suspense>
                    <template #default>
                        <BarChart :title="barChartData.title" :categories="barChartData.categories"
                            :seriesData="barChartData.seriesData" />
                    </template>
                    <template #fallback>
                        <SkeletonChart chartType="bar" />

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
                        <SkeletonTable />
                    </template>
                </Suspense>
            </article>
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
    </DashboardAdminLayout>
</template>
<style></style>