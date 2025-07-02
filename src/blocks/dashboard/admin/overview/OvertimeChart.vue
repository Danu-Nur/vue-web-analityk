<script setup>
import { lineChart, barChart } from '../../../../dummydata/chart';
import SkeletonChart from '../../../../components/skeleton/SkeletonChart.vue';
// Importing the BarChart component asynchronously
const BarChart = defineAsyncComponent(() =>
    import('../../../../components/apexchart/BarChart.vue')
)

// Importing the LineChart component asynchronously
const LineChart = defineAsyncComponent(() =>
    import('../../../../components/apexchart/LineChart.vue')
)
</script>
<template>
    <section aria-label="Main content" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 lg:col-span-2 flex flex-col">
            <h2 class="font-semibold text-gray-900 mb-4">Overview</h2>
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
        <article aria-label="Recent Sales" class="border border-gray-200 rounded-lg p-4">
            <h2 class="font-semibold text-gray-900 mb-4">Overview</h2>
            <Suspense>
                <template #default>
                    <BarChart :title="barChartData.title" :categories="barChartData.categories"
                        :seriesData="barChartData.seriesData" />
                </template>
                <template #fallback>
                    <SkeletonChart chartType="bar" />

                </template>
            </Suspense>
        </article>
    </section>
</template>