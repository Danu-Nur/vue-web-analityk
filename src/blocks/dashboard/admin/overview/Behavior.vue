<script setup>
import { ref, defineAsyncComponent, computed, onMounted, watch } from 'vue';
import { useBehaviorStore } from '../../../../store/admin/behaviorStore';
import SkeletonTable from '../../../../components/skeleton/SkeletonTable.vue';
import SkeletonHeatMaps from '../../../../components/skeleton/SkeletonHeatMaps.vue';
import SkeletonChart from '../../../../components/skeleton/SkeletonChart.vue';

// Importing components asynchronously (sudah bagus)
const Datatable = defineAsyncComponent(() =>
    import('../../../../components/datatables/DataTable.vue')
);
const BarClick = defineAsyncComponent(() =>
    import('../../../../components/apexchart/BarChart.vue')
);
const HeatmapClickTracking = defineAsyncComponent(() =>
    import('../../../../components/apexchart/HeatMapsChart.vue')
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

// 1. State untuk menyimpan ID dari URL yang sedang dipilih di dropdown
const selectedUrlId = ref(null);

// 2. Computed property untuk mendapatkan objek data LENGKAP dari URL yang dipilih.
// Ini adalah kunci utamanya. Dia akan otomatis update jika selectedUrlId berubah.
const selectedUrlData = computed(() => {
    // Pastikan store.heatmap.data ada dan selectedUrlId punya nilai
    if (!store.heatmap?.data || !selectedUrlId.value) {
        return null;
    }
    // Cari data di dalam array yang cocok dengan ID yang dipilih
    return store.heatmap.data.find(url => url.url_id === selectedUrlId.value);
});

// 3. Watcher untuk mengatur nilai default dropdown saat data pertama kali datang
watch(() => store.heatmap?.data, (newData) => {
    // Jika data baru ada dan dropdown belum punya pilihan,
    // pilih item pertama sebagai default.
    if (newData && newData.length > 0 && !selectedUrlId.value) {
        selectedUrlId.value = newData[0].url_id;
    }
}, { immediate: true }); // 'immediate' agar langsung jalan saat komponen dimuat
// Fetch data on component mount
onMounted(() => {
    loadData();
});

</script>

<template>
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        Gagal memuat data perilaku: {{ error }}
    </div>

    <section aria-label="Behavior Analytics" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 h-min">

        <article aria-label="Click Events" class="border border-gray-200 rounded-xl p-4 flex flex-col">
            <h2 class="font-semibold text-gray-900 text-lg mb-4">Click Events</h2>
            <Suspense>
                <template #default>
                    <BarClick v-if="store.clickEvents && store.clickEvents.seriesData" title="Click Even Chart"
                        :categories="store.clickEvents.categories" :seriesData="store.clickEvents.seriesData"
                        :height="550" />
                    <SkeletonChart v-else-if="isLoading" />
                </template>
                <template #fallback>
                    <SkeletonChart />
                </template>
            </Suspense>
        </article>
        <article aria-label="Heatmap Preview" class="border border-gray-200 rounded-xl p-4 flex flex-col overflow-auto">
            <div class="w-full mb-4 flex-1 relative">
                <h2 class="font-semibold text-gray-900 text-lg mb-4">Heatmap Preview</h2>

                <div v-if="store.heatmap?.data?.length > 0" class="mb-4">
                    <label for="heatmap-url-select" class="block text-sm font-medium text-gray-700 mb-1">Select
                        URL</label>
                    <select id="heatmap-url-select" v-model="selectedUrlId"
                        class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        <option v-for="url in store.heatmap.data" :key="url.url_id" :value="url.url_id">
                            {{ url.website_url }}
                        </option>
                    </select>
                </div>


                <div v-if="selectedUrlData" :key="selectedUrlData.url_id"
                    class="w-full aspect-[16/9] bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden flex flex-col">

                    <div class="flex flex-col h-full flex-1">
                        <div class="relative flex-1">
                            <Suspense>
                                <template #default>
                                    <HeatmapClickTracking :websiteUrl="selectedUrlData.website_url"
                                        :heatmapData="{ items: selectedUrlData.heatmap_points }" :scale="scale"
                                        class="absolute inset-0 w-full h-full object-cover" />
                                </template>
                                <template #fallback>
                                    <SkeletonHeatMaps class="absolute inset-0 w-full h-full" />
                                </template>
                            </Suspense>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center py-10 text-gray-500">
                    <p>Please select a URL to view the heatmap.</p>
                </div>

            </div>
        </article>
    </section>
    <section aria-label="Behavior Analytics" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 h-min">
        <!-- <div class="grid grid-cols-1 gap-6 h-full"> -->
        <article aria-label="Custom Events" class="border border-gray-200 rounded-xl p-4 flex flex-col">
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
            <article aria-label="Top Clicked Elements" class="border border-gray-200 rounded-xl p-4 flex flex-col">
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
            
            <article aria-label="Scroll Depth Distribution" class="border border-gray-200 rounded-xl p-4 flex flex-col">
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


        </div>
        <!-- </div> -->

        <div class="flex flex-col min-h-full h-full max-h-[1650px]">

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