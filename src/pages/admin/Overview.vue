<script setup>
import { ref, onMounted, defineAsyncComponent, computed } from 'vue';
import { useOverviewStore } from '../../store/admin/overviewStore'; // Import the Pinia store
import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
import SkeletonChart from '../../components/skeleton/SkeletonChart.vue';
import SkeletonSummaryCards from '../../components/skeleton/SkeletonSummaryCards.vue';
import SkeletonTable from '../../components/skeleton/SkeletonTable.vue';
import SkeletonMaps from '../../components/skeleton/SkeletonMaps.vue';

const SummaryCards = defineAsyncComponent(() => import('../../blocks/dashboard/admin/overview/SummaryCards.vue'));
const MapChoroplethAsync = defineAsyncComponent(() => import('../../components/maps/MapChoropleth.vue'));
const LineChart = defineAsyncComponent(() => import('../../components/apexchart/AreaChart.vue'));
const PieChart = defineAsyncComponent(() => import('../../components/apexchart/PieChart.vue'));
const Datatable = defineAsyncComponent(() => import('../../components/datatables/DataTable.vue'));

// Initialize the Pinia store
const overviewStore = useOverviewStore();
const summaryCardData = computed(() => overviewStore.metrics);
const oevrtimeVisitors = computed(() => ({
    title: overviewStore.lineChart.title,
    categories: overviewStore.lineChart.categories,
    seriesData: overviewStore.lineChart.seriesData,
}));
const geoMapsData = computed(() => ({
    headers: overviewStore.headers.geoMap,
    items: overviewStore.geoMap,
}))
const referrersData = computed(() => ({
    headers: overviewStore.headers.referrers,
    items: overviewStore.referrers,
}))

// Error state for UI
const isLoading = computed(() => overviewStore.loading);
const error = computed(() => overviewStore.error);

// Handle date range updates from DashboardAdminLayout
const handleDateRangeUpdate = ({ date_from, date_to }) => {
    overviewStore.setDateRange(date_from, date_to);
    overviewStore.fetchAllData();
};

// Fetch data on component mount
onMounted(async () => {
    // try {
    await overviewStore.fetchAllData();
    //     error.value = overviewStore.error;
    // } catch (err) {
    //     error.value = 'Failed to load dashboard data';
    //     console.error('Error fetching overview data:', err);
    // }
});
</script>

<template>
    <DashboardAdminLayout @update:dateRange="handleDateRangeUpdate">
        <!-- Error Display -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {{ error }}
        </div>

        <!-- Main Content -->

        <!-- Summary Cards -->
        <Suspense>
            <template #default>
                <SummaryCards :metrics="summaryCardData" />
            </template>
            <template #fallback>
                <SkeletonSummaryCards v-if="isLoading" />
            </template>
        </Suspense>

        <!-- Main Content Grid -->
        <section aria-label="Main content" class="mb-6">
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Overtime Visitors</h2>
                <Suspense>
                    <template #default>
                        <LineChart :title="oevrtimeVisitors.title" :categories="oevrtimeVisitors.categories"
                            :seriesData="oevrtimeVisitors.seriesData" :height="500" />
                    </template>
                    <template #fallback>
                        <SkeletonChart chartType="line" v-if="isLoading" />
                    </template>
                </Suspense>
            </article>
        </section>

        <section aria-label="Main content" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <article aria-label="Visitor Country Distribution"
                class="border sm:col-span-2 border-gray-200 rounded-lg p-4">
                <h2 class="font-semibold text-gray-900 mb-4">Visitor Country Distribution</h2>
                <Suspense>
                    <template #default>
                        <MapChoroplethAsync :data="geoMapsData.items" />
                    </template>
                    <template #fallback>
                        <div class="flex h-[500px]">
                            <SkeletonMaps v-if="isLoading" />
                        </div>
                    </template>
                </Suspense>
            </article>

            <article aria-label="Visitor Country Distribution" class="border border-gray-200 rounded-lg p-4">
                <h2 class="font-semibold text-gray-900 mb-1">Visitor Country Distribution</h2>
                <div>
                    <Suspense>
                        <template #default>
                            <Datatable :headers="geoMapsData.headers" :items="geoMapsData.items"
                                title="All Transactions" />
                        </template>
                        <template #fallback>
                            <SkeletonTable v-if="isLoading" />
                        </template>
                    </Suspense>
                </div>
            </article>

            <article aria-label="Device Type Distribution" class="border border-gray-200 rounded-lg p-4">
                <h2 class="font-semibold text-gray-900 mb-1">Device Type Distribution</h2>
                <div class="flex flex-col justify-center h-full">
                    <div>
                        <Suspense>
                            <template #default>
                                <PieChart :title="overviewStore.deviceChart.title"
                                    :categories="overviewStore.deviceChart.categories"
                                    :seriesData="overviewStore.deviceChart.seriesData" satuan=" Device" />
                            </template>
                            <template #fallback>
                                <SkeletonChart chartType="pie" v-if="isLoading" />
                            </template>
                        </Suspense>
                    </div>
                </div>
            </article>
        </section>

        <section aria-label="Main content" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <article aria-label="Referrer / UTM Source" class="border border-gray-200 rounded-lg p-4">
                <h2 class="font-semibold text-gray-900 mb-1">Referrer / UTM Source</h2>
                <div>
                    <Suspense>
                        <template #default>
                            <Datatable :headers="referrersData.headers" :items="referrersData.items"
                                title="All Transactions" />
                        </template>
                        <template #fallback>
                            <SkeletonTable v-if="isLoading" />
                        </template>
                    </Suspense>
                </div>
            </article>

            <article aria-label="Entry / Exit Pages" class="border border-gray-200 rounded-lg p-4">
                <h2 class="font-semibold text-gray-900 mb-1">Entry / Exit Pages</h2>
                <div>
                    <Suspense>
                        <template #default>
                            <Datatable :headers="overviewStore.headers.entryExitPages"
                                :items="overviewStore.entryExitPages" title="All Transactions" />
                        </template>
                        <template #fallback>
                            <SkeletonTable v-if="isLoading" />
                        </template>
                    </Suspense>
                </div>
            </article>

            <article aria-label="Top Pages" class="border border-gray-200 sm:col-span-2 rounded-lg p-4">
                <h2 class="font-semibold text-gray-900 mb-1">Top Pages</h2>
                <div>
                    <Suspense>
                        <template #default>
                            <Datatable :headers="overviewStore.headers.topPages" :items="overviewStore.topPages"
                                title="All Transactions" />
                        </template>
                        <template #fallback>
                            <SkeletonTable v-if="isLoading" />
                        </template>
                    </Suspense>
                </div>
            </article>
        </section>
    </DashboardAdminLayout>
</template>

<style></style>