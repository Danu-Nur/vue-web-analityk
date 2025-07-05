<script setup>
import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
import { errorLogs, botTable, humanVsBot, jsErrorRate, pageLoadTable, monthHumanBot } from '../../dummydata/pages5/dataPages5';
const DataTable = defineAsyncComponent(() => import('../../components/datatables/DataTable.vue'))
// Importing the PieChart component asynchronously
const PieChart = defineAsyncComponent(() =>
    import('../../components/apexchart/PieChart.vue')
)

// Importing the LineChart component asynchronously
const LineChart = defineAsyncComponent(() =>
    import('../../components/apexchart/AreaChart.vue')
)
import SkeletonTable from '../../components/skeleton/SkeletonTable.vue';
import { defineAsyncComponent } from 'vue';
</script>
<template>
    <DashboardAdminLayout>

        <section aria-label="Main content"
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 h-max mb-6">
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Bot Detection</h2>
                <Suspense>
                    <template #default>
                        <DataTable :headers="botTable.headers" :items="botTable.items" title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </article>
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Bot & Human</h2>
                <Suspense>
                    <template #default>
                        <DataTable :headers="humanVsBot.headers" :items="humanVsBot.items" title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </article>
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Bot VS Human</h2>
                <Suspense>
                    <template #default>
                        <PieChart :title="monthHumanBot.title" :categories="monthHumanBot.categories"
                            :seriesData="monthHumanBot.seriesData" satuan=" visitors" />
                    </template>
                    <template #fallback>
                        <SkeletonChart chartType="pie" />
                    </template>
                </Suspense>
            </article>
            <article aria-label="Overview chart"
                class="border border-gray-200 xl:col-span-3 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Bot vs Human Traffic</h2>
                <Suspense>
                    <template #default>
                        <LineChart :title="humanVsBot.title" :categories="humanVsBot.categories"
                            :seriesData="humanVsBot.seriesData" />
                    </template>
                    <template #fallback>
                        <SkeletonChart chartType="bar" />
                    </template>
                </Suspense>
            </article>
        </section>

        <section aria-label="Main content"
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 h-max mb-6">

            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Client Errors</h2>
                <Suspense>
                    <template #default>
                        <DataTable :headers="errorLogs.headers" :items="errorLogs.items" title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </article>

            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Load Time & Duration</h2>
                <Suspense>
                    <template #default>
                        <DataTable :headers="pageLoadTable.headers" :items="pageLoadTable.items"
                            title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </article>
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">JS Error Rate</h2>
                <Suspense>
                    <template #default>
                        <DataTable :headers="jsErrorRate.headers" :items="jsErrorRate.items" title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </article>
        </section>
    </DashboardAdminLayout>
</template>