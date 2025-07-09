<script setup>
import { ref, defineAsyncComponent, computed, onMounted } from 'vue';
import { useBehaviorStore } from '../../store/admin/behaviorStore';
import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
import SkeletonTable from '../../components/skeleton/SkeletonTable.vue';
import SkeletonHeatMaps from '../../components/skeleton/SkeletonHeatMaps.vue';
import SkeletonChart from '../../components/skeleton/SkeletonChart.vue';
import { clickEvents, scrollDepth, heatmapData, customEvents, eventTimeline } from '../../dummydata/pages3/dataPages3';

// Importing components asynchronously
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

const dateurls = [
    { label: '/landing', websiteUrl: 'http://localhost:5173' },
    { label: '/login', websiteUrl: 'http://localhost:5173/login' },
    { label: '/signup', websiteUrl: 'http://localhost:5173/signup' },
    { label: '/forgot-password', websiteUrl: 'http://localhost:5173/forgot-password' },
];

// const websiteUrl = ref(dateurls[0]?.websiteUrl || '');

const dataclickEvents = ref(clickEvents);
const datascrollDepth = ref(scrollDepth);
const dataheatmapData = ref(heatmapData);
const datacustomEvents = ref(customEvents);
const dataeventTimeline = ref(eventTimeline);

const scale = computed(() => {
    const width = window.innerWidth;
    if (width >= 1280) return 0.65; // xl
    if (width >= 768) return 0.50; // md
    return 0.30; // sm
});

// Error state for UI
const isLoading = computed(() => store.loading);
const error = computed(() => store.error);

// Handle date range updates from DashboardAdminLayout
const handleDateRangeUpdate = ({ date_from, date_to }) => {
    store.setDateRange(date_from, date_to);
    store.fetchAllData();
};

// Fetch data on component mount
// onMounted(async () => {
//     await store.fetchAllData();
// });
</script>

<template>
    <DashboardAdminLayout @update:dateRange="handleDateRangeUpdate">
        <!-- Error Display -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {{ error }}
        </div>


        <section aria-label="Behavior Analytics" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 h-min">
            <!-- Left Column -->
            <div class="grid grid-cols-1 gap-6 h-full">
                <article aria-label="Click Events"
                    class="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-md flex flex-col">
                    <h2 class="font-semibold text-gray-900 text-lg mb-4">Click Events</h2>
                    <Suspense>
                        <template #default>
                            <BarClick :title="store.clickEvents.title" :categories="store.clickEvents.categories"
                                :seriesData="store.clickEvents.seriesData" :height="400" />
                        </template>
                        <template #fallback>
                            <SkeletonChart v-if="isLoading" />
                        </template>
                    </Suspense>
                </article>

                <article aria-label="Custom Events"
                    class="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-md flex flex-col">
                    <h2 class="font-semibold text-gray-900 text-lg mb-4">Custom Events</h2>
                    <Suspense>
                        <template #default>
                            <Datatable :headers="store.eventTimeline.headers" :items="store.eventTimeline.items"
                                :title="store.eventTimeline.title" class="text-sm" />
                        </template>
                        <template #fallback>
                            <SkeletonTable v-if="isLoading" />
                        </template>
                    </Suspense>
                </article>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <article aria-label="Scroll Depth Distribution"
                        class="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-md flex flex-col">
                        <h2 class="font-semibold text-gray-900 text-lg mb-4">Scroll Depth Distribution</h2>
                        <Suspense>
                            <template #default>
                                <Datatable :headers="store.scrollDepth.headers" :items="store.scrollDepth.items"
                                    :title="store.scrollDepth.title" class="text-sm" />
                            </template>
                            <template #fallback>
                                <SkeletonTable v-if="isLoading" />
                            </template>
                        </Suspense>
                    </article>

                    <article aria-label="Top Clicked Elements"
                        class="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-md flex flex-col">
                        <h2 class="font-semibold text-gray-900 text-lg mb-4">Top Clicked Elements</h2>
                        <Suspense>
                            <template #default>
                                <Datatable :headers="store.customEvents.headers" :items="store.customEvents.items"
                                    :title="store.customEvents.title" class="text-sm" />
                            </template>
                            <template #fallback>
                                <SkeletonTable v-if="isLoading" />
                            </template>
                        </Suspense>
                    </article>
                </div>
            </div>

            <!-- Right Column -->
            <div class="flex flex-col min-h-full h-full max-h-[1650px]">
                <article aria-label="Heatmap Preview"
                    class="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-md flex flex-col overflow-auto">
                    <div class="w-full mb-4 flex-1 relative">
                        <h2 class="font-semibold text-gray-900 text-lg mb-4">Heatmap Preview</h2>
                        <div
                            class="grid grid-cols-1 gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            <!-- <div v-for="url in dateurls" :key="url.websiteUrl" -->
                            <div v-for="url in store.urls" :key="url.websiteUrl"
                                class="w-full aspect-[16/9] bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                <div class="px-4 py-2">
                                    {{ url.websiteUrl }}
                                </div>

                                <div class="flex flex-col h-full border border-gray-200">
                                    <div class="relative flex-1">
                                        <Suspense>
                                            <template #default>
                                                <HeatmapClickTracking :website-url="url.websiteUrl"
                                                    :heatmap-data="store.heatmap.heatmapData" :scale="scale"
                                                    class="absolute inset-0 w-full h-full object-cover" />
                                            </template>
                                            <template #fallback>
                                                <SkeletonHeatMaps class="absolute inset-0 w-full h-full" v-if="isLoading" />
                                            </template>
                                        </Suspense>
                                    </div>
                                    <div class="p-4">
                                        <p class="text-sm text-gray-900 font-medium truncate">{{ url.label }}</p>
                                        <p class="text-xs text-gray-600">{{ url.websiteUrl }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    </DashboardAdminLayout>
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
