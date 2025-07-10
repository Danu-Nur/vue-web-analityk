<script setup>
import { ref, onMounted, defineAsyncComponent, computed } from 'vue';
import { useOverviewStore } from '../../store/admin/overviewStore';
import SkeletonChart from '../../components/skeleton/SkeletonChart.vue';
import SkeletonSummaryCards from '../../components/skeleton/SkeletonSummaryCards.vue';
import SkeletonTable from '../../components/skeleton/SkeletonTable.vue';
import SkeletonMaps from '../../components/skeleton/SkeletonMaps.vue';

// Define komponen secara asinkron
// Ini sudah langkah yang baik untuk lazy loading
const SummaryCards = defineAsyncComponent(() => import('../../blocks/dashboard/admin/overview/SummaryCards.vue'));
const MapChoroplethAsync = defineAsyncComponent(() => import('../../components/maps/MapChoropleth.vue'));
const LineChart = defineAsyncComponent(() => import('../../components/apexchart/AreaChart.vue'));
const PieChart = defineAsyncComponent(() => import('../../components/apexchart/PieChart.vue'));
const Datatable = defineAsyncComponent(() => import('../../components/datatables/DataTable.vue'));

// Inisialisasi Pinia store
const overviewStore = useOverviewStore();

// Computed properties untuk state loading dan error dari store
const isLoading = computed(() => overviewStore.loading);
const error = computed(() => overviewStore.error);

// State lokal untuk menandai apakah komponen ini sudah mencoba memuat data
// Ini penting untuk menghindari pemanggilan fetchAllData() berulang kali
const hasFetchedData = ref(false);

// Fungsi untuk memuat data
const loadData = async () => {
    // Hanya fetch data jika belum pernah di-fetch atau jika data di store kosong
    // `overviewStore.metrics` bisa menjadi indikator data sudah ada atau belum
    if (!hasFetchedData.value && !overviewStore.metrics) {
        try {
            // Set hasFetchedData ke true segera setelah panggilan dimulai
            hasFetchedData.value = true;
            await overviewStore.fetchAllData();
        } catch (err) {
            console.error('Failed to fetch overview data:', err);
            // Error handling sudah ditangani oleh store, jadi tidak perlu di sini lagi
        }
    }
};

onMounted(() => {
    loadData();
});

// Jika kamu menggunakan watcher di DashboardAdminLayout untuk tanggal,
// dan watcher itu memanggil fetchAllData di store, maka kamu mungkin tidak perlu
// memanggil fetchAllData di onMounted di sini lagi jika data selalu tersedia di store.
// Namun, jika komponen ini bisa diakses langsung tanpa update tanggal, onMounted ini penting.
// Logika di atas (`if (!hasFetchedData.value && !overviewStore.metrics)`) sudah cukup defensif.
</script>

<template>
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        Gagal memuat data: {{ error }}
    </div>

    <Suspense>
        <template #default>
            <SummaryCards v-if="overviewStore.metrics" :metrics="overviewStore.metrics" />
            <SkeletonSummaryCards v-else-if="isLoading" />
        </template>
        <template #fallback>
            <SkeletonSummaryCards />
        </template>
    </Suspense>

    <section aria-label="Main content" class="mb-6">
        <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
            <h2 class="font-semibold text-gray-900 mb-4">Overtime Visitors</h2>
            <Suspense>
                <template #default>
                    <LineChart v-if="overviewStore.lineChart && overviewStore.lineChart.seriesData"
                        :title="overviewStore.lineChart.title" :categories="overviewStore.lineChart.categories"
                        :seriesData="overviewStore.lineChart.seriesData" :height="500" />
                    <SkeletonChart chartType="line" v-else-if="isLoading" />
                </template>
                <template #fallback>
                    <SkeletonChart chartType="line" />
                </template>
            </Suspense>
        </article>
    </section>

    <section aria-label="Main content" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <article aria-label="Visitor Country Distribution" class="border sm:col-span-2 border-gray-200 rounded-lg p-4">
            <h2 class="font-semibold text-gray-900 mb-4">Visitor Country Distribution</h2>
            <Suspense>
                <template #default>
                    <MapChoroplethAsync v-if="overviewStore.geoMap && overviewStore.geoMap.length > 0"
                        :data="overviewStore.geoMap" />
                    <div v-else-if="isLoading" class="flex h-[500px]">
                        <SkeletonMaps />
                    </div>
                </template>
                <template #fallback>
                    <div class="flex h-[500px]">
                        <SkeletonMaps />
                    </div>
                </template>
            </Suspense>
        </article>

        <article aria-label="Visitor Country Distribution" class="border border-gray-200 rounded-lg p-4">
            <h2 class="font-semibold text-gray-900 mb-1">Visitor Country Distribution</h2>
            <div>
                <Suspense>
                    <template #default>
                        <Datatable v-if="overviewStore.headers.geoMap && overviewStore.geoMap"
                            :headers="overviewStore.headers.geoMap" :items="overviewStore.geoMap"
                            title="Visitor Countries" />
                        <SkeletonTable v-else-if="isLoading" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
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
                            <PieChart v-if="overviewStore.deviceChart && overviewStore.deviceChart.seriesData"
                                :title="overviewStore.deviceChart.title"
                                :categories="overviewStore.deviceChart.categories"
                                :seriesData="overviewStore.deviceChart.seriesData" satuan=" Device" />
                            <SkeletonChart chartType="pie" v-else-if="isLoading" />
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
        <article aria-label="Referrer / UTM Source" class="border border-gray-200 rounded-lg p-4">
            <h2 class="font-semibold text-gray-900 mb-1">Referrer / UTM Source</h2>
            <div>
                <Suspense>
                    <template #default>
                        <Datatable v-if="overviewStore.headers.referrers && overviewStore.referrers"
                            :headers="overviewStore.headers.referrers" :items="overviewStore.referrers"
                            title="Referrers" />
                        <SkeletonTable v-else-if="isLoading" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </div>
        </article>

        <article aria-label="Entry / Exit Pages" class="border border-gray-200 rounded-lg p-4">
            <h2 class="font-semibold text-gray-900 mb-1">Entry / Exit Pages</h2>
            <div>
                <Suspense>
                    <template #default>
                        <Datatable v-if="overviewStore.headers.entryExitPages && overviewStore.entryExitPages"
                            :headers="overviewStore.headers.entryExitPages" :items="overviewStore.entryExitPages"
                            title="Entry / Exit Pages" />
                        <SkeletonTable v-else-if="isLoading" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </div>
        </article>

        <article aria-label="Top Pages" class="border border-gray-200 sm:col-span-2 rounded-lg p-4">
            <h2 class="font-semibold text-gray-900 mb-1">Top Pages</h2>
            <div>
                <Suspense>
                    <template #default>
                        <Datatable v-if="overviewStore.headers.topPages && overviewStore.topPages"
                            :headers="overviewStore.headers.topPages" :items="overviewStore.topPages"
                            title="Top Pages" />
                        <SkeletonTable v-else-if="isLoading" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </div>
        </article>
    </section>
</template>

<style></style>