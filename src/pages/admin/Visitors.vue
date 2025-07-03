<script setup>
import {ref,  defineAsyncComponent } from 'vue';
import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
import SkeletonMaps from '../../components/skeleton/SkeletonMaps.vue';
import SkeletonChart from '../../components/skeleton/SkeletonChart.vue';
import { hourlyViewsChart } from '../../dummydata/chart';
const dataHourlyBarChart = ref(hourlyViewsChart)
const BarChart = defineAsyncComponent(() =>
    import('../../components/apexchart/BarChart.vue')
)
const MapMarkerAsync = defineAsyncComponent(() =>
    import('../../components/maps/MapVisitors.vue'));
</script>
<template>
    <DashboardAdminLayout>
        <section aria-label="Main content" class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 h-max mb-6">
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-1">Hourly Traffic</h2>
                <Suspense>
                    <template #default>
                        <BarChart :title="dataHourlyBarChart.title" :categories="dataHourlyBarChart.categories"
                            :seriesData="dataHourlyBarChart.seriesData" />
                    </template>
                    <template #fallback>
                        <SkeletonChart chartType="line" />
                    </template>
                </Suspense>
            </article>
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Geo Map with live Visitor</h2>
                <Suspense>
                    <template #default>
                        <MapMarkerAsync />
                    </template>
                    <template #fallback>
                        <SkeletonMaps />
                    </template>
                </Suspense>
            </article>
        </section>


    </DashboardAdminLayout>
</template>