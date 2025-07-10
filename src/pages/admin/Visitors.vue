<script setup>
import { onMounted, computed, ref } from 'vue'; // Tambahkan 'ref'
import SkeletonMaps from '../../components/skeleton/SkeletonMaps.vue';
import SkeletonChart from '../../components/skeleton/SkeletonChart.vue';
import SkeletonTable from '../../components/skeleton/SkeletonTable.vue';
import { useVisitorStore } from '../../store/admin/visitorStore';
import { defineAsyncComponent } from 'vue';

const visitorStore = useVisitorStore();

const isLoading = computed(() => visitorStore.loading);
const error = computed(() => visitorStore.error);

// State lokal untuk menandai apakah komponen ini sudah mencoba memuat data
const hasFetchedData = ref(false);

// Fungsi untuk memuat data
const loadData = async () => {
    // Hanya fetch data jika belum pernah di-fetch atau jika data 'liveUsers' di store kosong
    // 'liveUsers' dianggap sebagai indikator utama bahwa data sudah dimuat
    if (!hasFetchedData.value && !visitorStore.liveUsers) {
        try {
            hasFetchedData.value = true; // Set true segera setelah memulai fetch
            await visitorStore.fetchAllData();
        } catch (err) {
            console.error('Failed to fetch visitor data:', err);
            // Error handling sudah ditangani oleh store, jadi tidak perlu di sini lagi
        }
    }
};

// Fetch data on mount
onMounted(() => {
    loadData();
});

// Async component imports (sudah bagus dan tidak perlu diubah)
const BarChart = defineAsyncComponent(() =>
    import('../../components/apexchart/BarChart.vue')
);
const PieChart = defineAsyncComponent(() =>
    import('../../components/apexchart/PieChart.vue')
);
const Datatable = defineAsyncComponent(() =>
    import('../../components/datatables/DataTable.vue')
);
const MapMarkerAsync = defineAsyncComponent(() =>
    import('../../components/maps/MapVisitors.vue')
);
</script>

<template>
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        Gagal memuat data pengunjung: {{ error }}
    </div>

    <section aria-label="Main content" class="grid grid-cols-1 gap-4 sm:gap-6 h-max mb-6">
        <article aria-label="Geo Map" class="border border-gray-200 rounded-lg p-4 flex flex-col">
            <h2 class="font-semibold text-gray-900 mb-4">Geo Map with Live Visitor</h2>
            <Suspense>
                <template #default>
                    <MapMarkerAsync v-if="visitorStore.mapData && visitorStore.mapData.length > 0"
                        :datamaps="visitorStore.mapData" />
                    <SkeletonMaps v-else-if="isLoading" />
                </template>
                <template #fallback>
                    <SkeletonMaps />
                </template>
            </Suspense>
        </article>
    </section>

    <section aria-label="Main content" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 h-max mb-6">
        <article aria-label="Live Users" class="border border-gray-200 md:col-span-2 rounded-lg p-4 flex flex-col">
            <h2 class="font-semibold text-gray-900 mb-1">Live Users</h2>
            <Suspense>
                <template #default>
                    <Datatable v-if="visitorStore.headers.liveUsers && visitorStore.liveUsers"
                        :headers="visitorStore.headers.liveUsers" :items="visitorStore.liveUsers"
                        title="Live Users Data" />
                    <SkeletonTable v-else-if="isLoading" />
                </template>
                <template #fallback>
                    <SkeletonTable />
                </template>
            </Suspense>
        </article>
        <article aria-label="Sessions Summary" class="border border-gray-200 rounded-lg p-4 flex flex-col">
            <h2 class="font-semibold text-gray-900 mb-4">Sessions Summary</h2>
            <Suspense>
                <template #default>
                    <Datatable v-if="visitorStore.headers.sessions && visitorStore.sessions"
                        :headers="visitorStore.headers.sessions" :items="visitorStore.sessions"
                        title="Sessions Summary Data" />
                    <SkeletonTable v-else-if="isLoading" />
                </template>
                <template #fallback>
                    <SkeletonTable />
                </template>
            </Suspense>
        </article>
        <article aria-label="Device Breakdown" class="border border-gray-200 rounded-lg p-4 flex flex-col">
            <h2 class="font-semibold text-gray-900 mb-1">Device Breakdown</h2>
            <Suspense>
                <template #default>
                    <PieChart v-if="visitorStore.devices && visitorStore.devices.seriesData"
                        :title="visitorStore.devices.title" :categories="visitorStore.devices.categories"
                        :seriesData="visitorStore.devices.seriesData" satuan=" visitors" />
                    <SkeletonChart chartType="pie" v-else-if="isLoading" />
                </template>
                <template #fallback>
                    <SkeletonChart chartType="pie" />
                </template>
            </Suspense>
        </article>
    </section>

    <section aria-label="Main content" class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 h-max mb-6">
        <article aria-label="User Journey" class="border border-gray-200 rounded-lg p-4 flex flex-col order-2">
            <h2 class="font-semibold text-gray-900 mb-4">User Journey</h2>
            <Suspense>
                <template #default>
                    <Datatable v-if="visitorStore.headers.userJourneys && visitorStore.userJourneys"
                        :headers="visitorStore.headers.userJourneys" :items="visitorStore.userJourneys"
                        title="User Journey Data" />
                    <SkeletonTable v-else-if="isLoading" />
                </template>
                <template #fallback>
                    <SkeletonTable />
                </template>
            </Suspense>
        </article>
        <article aria-label="Hourly Visitors" class="border border-gray-200 rounded-lg p-4 flex flex-col">
            <h2 class="font-semibold text-gray-900 mb-1">Hourly Visitors</h2>
            <div class="flex flex-col justify-center h-full">
                <Suspense>
                    <template #default>
                        <BarChart v-if="visitorStore.hourlyVisitors && visitorStore.hourlyVisitors.seriesData"
                            :title="visitorStore.hourlyVisitors.title"
                            :categories="visitorStore.hourlyVisitors.categories"
                            :seriesData="visitorStore.hourlyVisitors.seriesData" />
                        <SkeletonChart chartType="bar" v-else-if="isLoading" />
                    </template>
                    <template #fallback>
                        <SkeletonChart chartType="bar" />
                    </template>
                </Suspense>
            </div>
        </article>
    </section>
</template>

<style></style>