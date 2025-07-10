<script setup>
import { ref, defineAsyncComponent, computed, onMounted } from 'vue';
import { useBehaviorStore } from '../../store/admin/behaviorStore';
import SkeletonTable from '../../components/skeleton/SkeletonTable.vue';
import SkeletonHeatMaps from '../../components/skeleton/SkeletonHeatMaps.vue';
import SkeletonChart from '../../components/skeleton/SkeletonChart.vue';

// Importing components asynchronously (sudah bagus)
const Datatable = defineAsyncComponent(() =>
    import('../../components/datatables/DataTable.vue')
);
const BarClick = defineAsyncComponent(() =>
    import('../../components/apexchart/BarChart.vue')
);
const HeatmapClickTracking = defineAsyncComponent(() =>
    import('../../components/apexchart/HeatMapsChart.vue')
);

// Use the behavior store
const store = useBehaviorStore();

// Computed property untuk menentukan skala heatmap berdasarkan ukuran layar
const scale = computed(() => {
    const width = window.innerWidth;
    if (width >= 1280) return 0.65; // xl
    if (width >= 768) return 0.50; // md
    return 0.30; // sm
});

// Error state for UI
const isLoading = computed(() => store.loading);
const error = computed(() => store.error);

// State lokal untuk menandai apakah komponen ini sudah mencoba memuat data
const hasFetchedData = ref(false);

// Fungsi untuk memuat data
const loadData = async () => {
    // Hanya fetch data jika belum pernah di-fetch atau jika data 'clickEvents' di store kosong
    // 'clickEvents' dianggap sebagai salah satu indikator utama bahwa data sudah dimuat
    if (!hasFetchedData.value && !store.clickEvents) {
        try {
            hasFetchedData.value = true; // Set true segera setelah memulai fetch
            await store.fetchAllData();
        } catch (err) {
            console.error('Failed to fetch behavior data:', err);
            // Error handling sudah ditangani oleh store, jadi tidak perlu di sini lagi
        }
    }
};

// Fetch data on component mount
onMounted(() => {
    loadData();
});

// Jika kamu menggunakan DashboardAdminLayout yang memiliki event @update:dateRange
// Pastikan DashboardAdminLayout bisa memicu `handleDateRangeUpdate`
// const handleDateRangeUpdate = async ({ date_from, date_to }) => {
//     store.setDateRange(date_from, date_to);
//     await store.fetchAllData(true); // true menandakan forced refetch
// };
</script>

<template>
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        Gagal memuat data perilaku: {{ error }}
    </div>

    <section aria-label="Behavior Analytics" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 h-min">
        <div class="grid grid-cols-1 gap-6 h-full">
            <article aria-label="Click Events"
                class="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-md flex flex-col">
                <h2 class="font-semibold text-gray-900 text-lg mb-4">Click Events</h2>
                <Suspense>
                    <template #default>
                        <BarClick v-if="store.clickEvents && store.clickEvents.seriesData"
                            :title="store.clickEvents.title" :categories="store.clickEvents.categories"
                            :seriesData="store.clickEvents.seriesData" :height="400" />
                        <SkeletonChart v-else-if="isLoading" />
                    </template>
                    <template #fallback>
                        <SkeletonChart />
                    </template>
                </Suspense>
            </article>

            <article aria-label="Custom Events"
                class="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-md flex flex-col">
                <h2 class="font-semibold text-gray-900 text-lg mb-4">Custom Events</h2>
                <Suspense>
                    <template #default>
                        <Datatable v-if="store.eventTimeline && store.eventTimeline.headers"
                            :headers="store.eventTimeline.headers" :items="store.eventTimeline.items"
                            :title="store.eventTimeline.title" class="text-sm" />
                        <SkeletonTable v-else-if="isLoading" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </article>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <article aria-label="Scroll Depth Distribution"
                    class="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-md flex flex-col">
                    <h2 class="font-semibold text-gray-900 text-lg mb-4">Scroll Depth Distribution</h2>
                    <Suspense>
                        <template #default>
                            <Datatable v-if="store.scrollDepth && store.scrollDepth.headers"
                                :headers="store.scrollDepth.headers" :items="store.scrollDepth.items"
                                :title="store.scrollDepth.title" class="text-sm" />
                            <SkeletonTable v-else-if="isLoading" />
                        </template>
                        <template #fallback>
                            <SkeletonTable />
                        </template>
                    </Suspense>
                </article>

                <article aria-label="Top Clicked Elements"
                    class="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-md flex flex-col">
                    <h2 class="font-semibold text-gray-900 text-lg mb-4">Top Clicked Elements</h2>
                    <Suspense>
                        <template #default>
                            <Datatable v-if="store.customEvents && store.customEvents.headers"
                                :headers="store.customEvents.headers" :items="store.customEvents.items"
                                :title="store.customEvents.title" class="text-sm" />
                            <SkeletonTable v-else-if="isLoading" />
                        </template>
                        <template #fallback>
                            <SkeletonTable />
                        </template>
                    </Suspense>
                </article>
            </div>
        </div>

        <div class="flex flex-col min-h-full h-full max-h-[1650px]">
            <article aria-label="Heatmap Preview"
                class="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-md flex flex-col overflow-auto">
                <div class="w-full mb-4 flex-1 relative">
                    <h2 class="font-semibold text-gray-900 text-lg mb-4">Heatmap Preview</h2>
                    <div
                        class="grid grid-cols-1 gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <!-- {{ store.heatmap }} -->
                        <div v-for="urlData in store.heatmap.data" :key="urlData.url_id"
                            class="w-full aspect-[16/9] bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">

                            <div class="px-4 py-2">
                                <p class="text-sm text-gray-900 font-medium truncate" :title="urlData.website_url">{{
                                    urlData.website_url }}</p>
                            </div>

                            <div class="flex flex-col h-full border-t border-gray-200 flex-1">
                                <div class="relative flex-1">
                                    <Suspense>
                                        <template #default>
                                            <HeatmapClickTracking :websiteUrl="urlData.website_url"
                                                :heatmapData="{ items: urlData.heatmap_points }" :scale="scale"
                                                class="absolute inset-0 w-full h-full object-cover" />
                                        </template>
                                        <template #fallback>
                                            <SkeletonHeatMaps class="absolute inset-0 w-full h-full" />
                                        </template>
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>

<style scoped>
section {
    font-family: 'Inter', 'DM Sans', sans-serif;
}

/* Custom scrollbar */
.scrollbar-thin {
    scrollbar-width: thin;
}

.scrollbar-thumb-gray-300 {
    scrollbar-color: #d1d5db #f3f4f6;
}
</style>