<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
import SkeletonChart from '../../components/skeleton/SkeletonChart.vue';
import SkeletonSummaryCards from '../../components/skeleton/SkeletonSummaryCards.vue';
import SkeletonTable from '../../components/skeleton/SkeletonTable.vue';
import { table1, tableTopPages, countryRegionData, referrersData, userJourneysData } from '../../dummydata/table';
import { lineChart, barChart, deviceTypeChart, hourlyViewsChart } from '../../dummydata/chart';
import BarChart from '../../components/apexchart/BarChart.vue';
const SummaryCards = defineAsyncComponent(() => import('../../blocks/dashboard/admin/overview/SummaryCards.vue'))

const dateRangePicker = defineAsyncComponent(() =>
    import('../../components/ui/DateRangePicker.vue')
);

// Importing the LineChart component asynchronously
const LineChart = defineAsyncComponent(() =>
    import('../../components/apexchart/AreaChart.vue')
)

// Importing the PieChart component asynchronously
const PieChart = defineAsyncComponent(() =>
    import('../../components/apexchart/PieChart.vue')
)

// Importing the Datatable component asynchronously
const Datatable = defineAsyncComponent(() =>
    import('../../components/datatables/DataTable.vue')
)

// chart data
const lineChartData = ref(lineChart)
const barChartData = ref(barChart)
const dataDevicePieChart = ref(deviceTypeChart)
const dataHourlyBarChart = ref(hourlyViewsChart)


// table dummy with chart
const headers = ref(table1.headers)
const items = ref(table1.items)

// table top pages
const dataTableTopPages = ref(tableTopPages)

// country region count
const dataCountryRegions = ref(countryRegionData)

// table top pages
const dataReferrers = ref(referrersData)

// country region count
const dataUserJourneys = ref(userJourneysData)

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
        <section aria-label="Main content" class=" mb-6">
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Overtime Visitors</h2>
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
        </section>

        <section aria-label="Main content" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <article aria-label="Top Pages" class="border border-gray-200 sm:col-span-2 rounded-lg p-4">
                <!-- <div class="flex flex-col justify-between h-full"> -->
                <h2 class="font-semibold text-gray-900 mb-1">Top Pages</h2>
                <div>
                    <Suspense>
                        <template #default>
                            <Datatable :headers="dataTableTopPages.headers" :items="dataTableTopPages.items"
                                title="All Transactions" />
                        </template>
                        <template #fallback>
                            <SkeletonTable />
                        </template>
                    </Suspense>
                </div>
                <!-- </div> -->
            </article>
            <article aria-label="Visitor Country Distribution" class="border border-gray-200 rounded-lg p-4">
                <!-- <div class="flex flex-col justify-between h-full"> -->
                <h2 class="font-semibold text-gray-900 mb-1">Visitor Country Distribution</h2>
                <div>
                    <Suspense>
                        <template #default>
                            <Datatable :headers="dataCountryRegions.headers" :items="dataCountryRegions.items"
                                title="All Transactions" />
                        </template>
                        <template #fallback>
                            <SkeletonTable />
                        </template>
                    </Suspense>
                </div>
                <!-- </div> -->
            </article>
            <article aria-label="Device Type Distribution" class="border border-gray-200 rounded-lg p-4">
                <h2 class="font-semibold text-gray-900 mb-1">Device Type Distribution</h2>
                <div class="flex flex-col justify-center h-full">
                    <div>
                        <Suspense>
                            <template #default>
                                <PieChart :title="dataDevicePieChart.title" :categories="dataDevicePieChart.categories"
                                    :seriesData="dataDevicePieChart.seriesData" />
                            </template>
                            <template #fallback>
                                <SkeletonChart chartType="pie" />
                            </template>
                        </Suspense>
                    </div>
                </div>
            </article>
        </section>
        <section aria-label="Main content" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <article aria-label="" class="border border-gray-200 rounded-lg p-4">
                <!-- <div class="flex flex-col justify-between h-full"> -->
                <h2 class="font-semibold text-gray-900 mb-1">Referrer / UTM Source</h2>
                <div>
                    <Suspense>
                        <template #default>
                            <Datatable :headers="dataReferrers.headers" :items="dataReferrers.items"
                                title="All Transactions" />
                        </template>
                        <template #fallback>
                            <SkeletonTable />
                        </template>
                    </Suspense>
                </div>
                <!-- </div> -->
            </article>
            <article aria-label="Entry / Exit Pages" class="border border-gray-200 rounded-lg p-4">
                <!-- <div class="flex flex-col justify-between h-full"> -->
                <h2 class="font-semibold text-gray-900 mb-1">Entry / Exit Pages</h2>
                <div>
                    <Suspense>
                        <template #default>
                            <Datatable :headers="dataUserJourneys.headers" :items="dataUserJourneys.items"
                                title="All Transactions" />
                        </template>
                        <template #fallback>
                            <SkeletonTable />
                        </template>
                    </Suspense>
                </div>
                <!-- </div> -->
            </article>
            <article aria-label="Hourly Traffic" class="border sm:col-span-2 border-gray-200 rounded-lg p-4">
                <!-- <div class="flex flex-col justify-between h-full"> -->
                <h2 class="font-semibold text-gray-900 mb-1">Hourly Traffic</h2>
                <div>
                    <Suspense>
                        <template #default>
                            <BarChart :title="dataHourlyBarChart.title" :categories="dataHourlyBarChart.categories"
                                :seriesData="dataHourlyBarChart.seriesData" />
                        </template>
                        <template #fallback>
                            <SkeletonChart chartType="line" />
                        </template>
                    </Suspense>
                </div>
                <!-- </div> -->
            </article>
        </section>

    </DashboardAdminLayout>
</template>
<style></style>