<script setup>
import { onMounted, onUnmounted, computed, ref, watch } from 'vue';
import { useVisitorStore } from '../../store/admin/visitorStore';
import { defineAsyncComponent } from 'vue';
// Impor composable untuk animasi angka
import { useAnimatedCounter } from '../../composables/useAnimatedCounter.js';
import { table1 } from '../../dummydata/table.js';

// Komponen Skeleton
import SkeletonMaps from '../../components/skeleton/SkeletonMaps.vue';
import SkeletonChart from '../../components/skeleton/SkeletonChart.vue';
import SkeletonTable from '../../components/skeleton/SkeletonTable.vue';

// Pinia Store
const visitorStore = useVisitorStore();
const isLoading = computed(() => visitorStore.loading);
const error = computed(() => visitorStore.error);

// Computed Properties untuk nilai target
const liveUserCount = computed(() => visitorStore.liveUsers?.length || 0);
const totalSessionsCount = computed(() => {
    return visitorStore.sessions?.reduce((sum, item) => sum + (parseInt(item.total, 10) || 0), 0) || 0;
});
const activeCountriesCount = computed(() => visitorStore.mapData?.length || 0);
const deviceTypesCount = computed(() => visitorStore.devices?.categories?.length || 0);

// Gunakan composable untuk membuat nilai yang dianimasikan
const animatedLiveUsers = useAnimatedCounter(liveUserCount);
const animatedSessions = useAnimatedCounter(totalSessionsCount);
const animatedCountries = useAnimatedCounter(activeCountriesCount);
const animatedDeviceTypes = useAnimatedCounter(deviceTypesCount);


// Konfigurasi Polling
const pollingOptions = ref([
    { text: '1 Menit', value: 60000 },
    { text: '3 Menit', value: 180000 },
    { text: '5 Menit', value: 300000 },
]);
const selectedInterval = ref(pollingOptions.value[0].value);
let pollingId = null;

const initialLoad = () => visitorStore.fetchAllData({ forceRefresh: true, isBackground: false });
const backgroundRefresh = () => visitorStore.fetchAllData({ forceRefresh: true, isBackground: true });
const setupPolling = (interval) => {
    if (pollingId) clearInterval(pollingId);
    pollingId = setInterval(backgroundRefresh, interval);
};

// Lifecycle Hooks & Watcher
onMounted(() => {
    initialLoad();
    setupPolling(selectedInterval.value);
});
onUnmounted(() => {
    if (pollingId) clearInterval(pollingId);
});
watch(selectedInterval, (newInterval) => {
    backgroundRefresh();
    setupPolling(newInterval);
});


// Impor Komponen Asinkron
const BarChart = defineAsyncComponent(() => import('../../components/apexchart/BarChart.vue'));
const PieChart = defineAsyncComponent(() => import('../../components/apexchart/PieChart.vue'));
const Datatable = defineAsyncComponent(() => import('../../components/datatables/DataTable.vue'));
const MapMarkerAsync = defineAsyncComponent(() => import('../../components/maps/MapVisitors.vue'));
</script>

<template>
    <div class="mb-6 flex justify-end items-center">
        <label for="polling-interval" class="mr-2 text-sm font-medium text-gray-700">Refresh Otomatis:</label>
        <select id="polling-interval" v-model="selectedInterval"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
            <option v-for="option in pollingOptions" :key="option.value" :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        Gagal memuat data pengunjung: {{ error }}
    </div>

    <section aria-label="Realtime Summary" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <article class="summary-card-new card-new">
            <div class="flex justify-between items-start">
                <h3 class="text-sm font-medium text-gray-500">Unique Visitors</h3>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{ animatedLiveUsers }}</p>
            <p class="text-xs text-gray-500 mt-1">Number of Unique Visitors tracked</p>
            <div class="summary-percent-badge">+0%</div>
        </article>

        <article class="summary-card-new card-new">
            <div class="flex justify-between items-start">
                <h3 class="text-sm font-medium text-gray-500">Total Sessions</h3>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{ animatedSessions }}</p>
            <p class="text-xs text-gray-500 mt-1">Total sessions in the selected period</p>
            <div class="summary-percent-badge">+0%</div>
        </article>

        <article class="summary-card-new card-new">
            <div class="flex justify-between items-start">
                <h3 class="text-sm font-medium text-gray-500">Active Countries</h3>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l.586.586a2 2 0 010 2.828l-.586.586M16.293 4.293l-.586.586a2 2 0 000 2.828l.586.586M9 21h6M15 17H9" />
                </svg>
            </div>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{ animatedCountries }}</p>
            <p class="text-xs text-gray-500 mt-1">Number of countries visitors are from</p>
            <div class="summary-percent-badge">+0%</div>
        </article>

        <article class="summary-card-new card-new">
            <div class="flex justify-between items-start">
                <h3 class="text-sm font-medium text-gray-500">Device Types</h3>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{ animatedDeviceTypes }}</p>
            <p class="text-xs text-gray-500 mt-1">Number of tracked device types</p>
            <div class="summary-percent-badge">+0%</div>
        </article>
    </section>

    <section aria-label="Geo Map Section" class="grid grid-cols-1 gap-4 sm:gap-6 h-max mb-6">
        <article aria-label="Geo Map" class="card-new rounded-lg p-4 flex flex-col">
            <h2 class="font-semibold text-gray-900 mb-4">Geo Map with Live Visitor</h2>
            <Suspense>
                <template #default>
                    <MapMarkerAsync v-if="visitorStore.mapData && visitorStore.mapData.length > 0"
                        :datamaps="visitorStore.mapData" />
                    <SkeletonMaps v-else-if="isLoading" />
                    <div v-else class="flex items-center justify-center min-h-[300px] text-gray-500">
                        Tidak ada data peta untuk ditampilkan.
                    </div>
                </template>
                <template #fallback>
                    <SkeletonMaps />
                </template>
            </Suspense>
        </article>
    </section>

    <section aria-label="Additional Content" class="grid grid-cols-1 gap-4 sm:gap-6 h-max mb-6">
        <article aria-label="Hourly Visitors" class="card-new rounded-lg p-4 flex flex-col">
            <h2 class="font-semibold text-gray-900 mb-1">Hourly Visitors</h2>
            <div class="flex flex-col justify-center h-full">
                <Suspense>
                    <template #default>
                        <BarChart v-if="visitorStore.hourlyVisitors && visitorStore.hourlyVisitors.seriesData"
                            :title="visitorStore.hourlyVisitors.title"
                            :categories="visitorStore.hourlyVisitors.categories"
                            :seriesData="visitorStore.hourlyVisitors.seriesData" />
                        <SkeletonChart chartType="bar" v-else-if="isLoading" />
                        <div v-else class="flex items-center justify-center min-h-[200px] text-gray-500">
                            Tidak ada data pengunjung per jam.
                        </div>
                    </template>
                    <template #fallback>
                        <SkeletonChart chartType="bar" />
                    </template>
                </Suspense>
            </div>
        </article>
    </section>
    <section aria-label="Additional Content" class="grid grid-cols-1 gap-4 sm:gap-6 h-max mb-6">
        <article aria-label="Hourly Visitors per URL" class="card-new rounded-lg p-4 flex flex-col lg:order-2">
            <h2 class="font-semibold text-gray-900 mb-4">Top Visited Pages (Hourly)</h2>
            <Suspense>
                <template #default>
                    <Datatable v-if="visitorStore.urlHourlyVisitors && visitorStore.urlHourlyVisitors.length > 0"
                        :headers="visitorStore.headers.urlHourlyVisitors" :items="visitorStore.urlHourlyVisitors"
                        title="Hourly Visitors per URL Data">
                    </Datatable>
                    <!-- <Datatable
                        :headers="table1.headers" :items="table1.items"
                        title="Hourly Visitors per URL Data">
                    </Datatable> -->
                    <!-- <SkeletonTable v-else-if="isLoading" />
                    <div v-else class="flex items-center justify-center min-h-[200px] text-gray-500">
                        Tidak ada data halaman yang dikunjungi.
                    </div> -->
                </template>
                <template #fallback>
                    <SkeletonTable />
                </template>
            </Suspense>
        </article>
    </section>
    <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 h-max mb-6">
        <article aria-label="Device Breakdown" class="card-new md:col-span-2 rounded-lg p-4 flex flex-col">
            <h2 class="text-xl font-semibold">🧪 Live Event Monitor</h2>
            <div class="overflow-y-auto max-h-[400px] bg-gray-50 p-3 font-mono text-xs text-gray-800">
                <ul id="live-event-list" class="space-y-1">
                    <li v-if="!visitorStore.liveEvents.length">Awaiting incoming events...</li>
                    <li v-for="(event, index) in visitorStore.liveEvents" :key="index"
                        class="px-2 py-1 rounded bg-white shadow-sm card-new">
                        <time class="text-gray-400 mr-2">{{ new Date(event.time).toLocaleTimeString() }}</time>
                        {{ event.type }}: <span class="font-semibold">{{ event.description }}</span>
                        from <span class="italic">{{ event.ip_address }}</span>
                    </li>
                </ul>
            </div>
        </article>
        <article aria-label="Device Breakdown" class="card-new rounded-lg p-4 flex flex-col">
            <h2 class="font-semibold text-gray-900 mb-1">Device Breakdown</h2>
            <Suspense>
                <template #default>
                    <PieChart v-if="visitorStore.devices && visitorStore.devices.seriesData"
                        :title="visitorStore.devices.title" :categories="visitorStore.devices.categories"
                        :seriesData="visitorStore.devices.seriesData" satuan=" visitors" class="max-h-80" />
                    <SkeletonChart chartType="pie" v-else-if="isLoading" />
                    <div v-else class="flex items-center justify-center min-h-[200px] max-h-80 text-gray-500">
                        Tidak ada data perangkat.
                    </div>
                </template>
                <template #fallback>
                    <SkeletonChart chartType="pie" />
                </template>
            </Suspense>
        </article>
    </section>
    <section aria-label="Main Content" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 h-max mb-6">
        <article aria-label="Live Users" class="card-new md:col-span-2 rounded-lg p-4 flex flex-col">
            <h2 class="font-semibold text-gray-900 mb-1">Live Users</h2>
            <Suspense>
                <template #default>
                    <Datatable v-if="visitorStore.liveUsers && visitorStore.liveUsers.length > 0"
                        :headers="visitorStore.headers.liveUsers" :items="visitorStore.liveUsers"
                        title="Live Users Data" />
                    <SkeletonTable v-else-if="isLoading" />
                    <div v-else class="flex items-center justify-center min-h-[200px] text-gray-500">
                        Tidak ada data pengguna live.
                    </div>
                </template>
                <template #fallback>
                    <SkeletonTable />
                </template>
            </Suspense>
        </article>
        <article aria-label="Sessions Summary" class="card-new rounded-lg p-4 flex flex-col">
            <h2 class="font-semibold text-gray-900 mb-4">Sessions Summary</h2>
            <Suspense>
                <template #default>
                    <Datatable v-if="visitorStore.sessions && visitorStore.sessions.length > 0"
                        :headers="visitorStore.headers.sessions" :items="visitorStore.sessions"
                        title="Sessions Summary Data" />
                    <SkeletonTable v-else-if="isLoading" />
                    <div v-else class="flex items-center justify-center min-h-[200px] text-gray-500">
                        Tidak ada data sesi.
                    </div>
                </template>
                <template #fallback>
                    <SkeletonTable />
                </template>
            </Suspense>
        </article>

    </section>
</template>

<style>
/* Animasi untuk kartu saat dimuat */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Terapkan animasi ke setiap kartu dengan sedikit delay */
.summary-card-new {
    animation: fadeInUp 0.5s ease-out forwards;
    opacity: 0;
    /* Mulai dari transparan */
}

.summary-card-new:nth-child(1) {
    animation-delay: 0.1s;
}

.summary-card-new:nth-child(2) {
    animation-delay: 0.2s;
}

.summary-card-new:nth-child(3) {
    animation-delay: 0.3s;
}

.summary-card-new:nth-child(4) {
    animation-delay: 0.4s;
}
</style>