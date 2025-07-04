<script setup>
import { ref, defineAsyncComponent, computed } from 'vue';
import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
import SkeletonTable from '../../components/skeleton/SkeletonTable.vue';
import SkeletonHeatMaps from '../../components/skeleton/SkeletonHeatMaps.vue';
import SkeletonChart from '../../components/skeleton/SkeletonChart.vue';
import { clickEvents, scrollDepth, heatmapData, customEvents, eventTimeline } from '../../dummydata/pages3/dataPages3';
// Importing the Datatable component asynchronously
const Datatable = defineAsyncComponent(() =>
    import('../../components/datatables/DataTable.vue')
)

// Importing the Datatable component asynchronously
const BarClick = defineAsyncComponent(() =>
    import('../../components/apexchart/BarChart.vue')
)

// Importing the Datatable component asynchronously
const HeatmapClickTracking = defineAsyncComponent(() =>
    import('../../components/apexchart/HeatMapsChart.vue')
)

const websiteUrl = 'http://localhost:5173'

const dataclickEvents = ref(clickEvents)
const datascrollDepth = ref(scrollDepth)
const dataheatmapData = ref(heatmapData)
const datacustomEvents = ref(customEvents)
const dataeventTimeline = ref(eventTimeline)

// Responsive scale based on screen size
const scale = computed(() => {
    const width = window.innerWidth;
    if (width >= 1280) return 0.65; // xl:
    if (width >= 768) return 0.50; // md:
    return 0.30; // sm:
});
</script>
<template>
    <DashboardAdminLayout>
        <section aria-label="Main content" class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <!-- content 1 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 order-2 lg:order-none h-fit">
                <article aria-label="Click Events" class="border md:col-span-2 border-gray-200 rounded-lg p-4 flex flex-col">
                    <h2 class="font-semibold text-gray-900 mb-4">Click Events</h2>
                    <Suspense>
                        <template #default>
                            <!-- <Datatable :headers="dataclickEvents.headers" :items="dataclickEvents.items"
                                title="All Transactions" /> -->
                            <BarClick :title="dataclickEvents.title" :categories="dataclickEvents.categories"
                                :seriesData="dataclickEvents.seriesData" />
                        </template>
                        <template #fallback>
                            <SkeletonTable />
                        </template>
                    </Suspense>
                </article>
                <article aria-label="Scroll Depth Distribution"
                    class="border border-gray-200 rounded-lg p-4 flex flex-col">
                    <h2 class="font-semibold text-gray-900 mb-4">Scroll Depth Distribution</h2>
                    <Suspense>
                        <template #default>
                            <Datatable :headers="datascrollDepth.headers" :items="datascrollDepth.items"
                                title="All Transactions" />
                        </template>
                        <template #fallback>
                            <SkeletonTable />
                        </template>
                    </Suspense>
                </article>
                <article aria-label="Top Clicked Elements" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                    <h2 class="font-semibold text-gray-900 mb-4">Top Clicked Elements</h2>
                    <Suspense>
                        <template #default>
                            <Datatable :headers="datacustomEvents.headers" :items="datacustomEvents.items"
                                title="All Transactions" />
                        </template>
                        <template #fallback>
                            <SkeletonTable />
                        </template>
                    </Suspense>
                </article>
                <article aria-label="Custom Events" class="border md:col-span-2 border-gray-200 rounded-lg p-4 flex flex-col">
                    <h2 class="font-semibold text-gray-900 mb-4">Custom Events</h2>
                    <Suspense>
                        <template #default>
                            <Datatable :headers="dataeventTimeline.headers" :items="dataeventTimeline.items"
                                title="All Transactions" />
                        </template>
                        <template #fallback>
                            <SkeletonTable />
                        </template>
                    </Suspense>
                </article>
            </div>
            <!-- content 2 -->
            <article aria-label="Heatmap Preview"
                class="border order-1 border-gray-200 rounded-lg p-4 col-span-2 lg:col-span-1 flex flex-col overflow-auto">
                <h2 class="font-semibold text-gray-900 mb-4">Heatmap Preview</h2>
                <div class="flex-1 overflow-auto">
                    <Suspense>
                        <template #default>
                            <HeatmapClickTracking :website-url="websiteUrl" :heatmap-data="dataheatmapData"
                                :scale="scale" />
                        </template>
                        <template #fallback>
                            <SkeletonHeatMaps />
                        </template>
                    </Suspense>
                </div>
            </article>
        </section>
    </DashboardAdminLayout>
</template>