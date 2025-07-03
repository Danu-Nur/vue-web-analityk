<script setup>
import { ref, defineAsyncComponent } from 'vue';
import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
import SkeletonMaps from '../../components/skeleton/SkeletonMaps.vue';
import SkeletonChart from '../../components/skeleton/SkeletonChart.vue';
import { hourlyViewsChart } from '../../dummydata/chart';
import { liveUsers, sessionsSummary, deviceBreakdown, timezonesAndLanguage, mapRealTime, userJourney } from '../../dummydata/pages2/dataPages2';
const dataHourlyBarChart = ref(hourlyViewsChart)

const BarChart = defineAsyncComponent(() =>
    import('../../components/apexchart/BarChart.vue')
)

// Importing the PieChart component asynchronously
const PieChart = defineAsyncComponent(() =>
    import('../../components/apexchart/PieChart.vue')
)

// Importing the Datatable component asynchronously
const Datatable = defineAsyncComponent(() =>
    import('../../components/datatables/DataTable.vue')
)

const MapMarkerAsync = defineAsyncComponent(() =>
    import('../../components/maps/MapVisitors.vue')
)

const dataliveUsersData = ref(liveUsers)
const datasessionsData = ref(sessionsSummary)
const datadeviceBreakdownData = ref(deviceBreakdown)
const datatimezoneLanguageData = ref(timezonesAndLanguage)
const datageoLocationsData = ref(mapRealTime)
const databreadcrumbJourneyData = ref(userJourney)

</script>
<template>
    <DashboardAdminLayout>
        <section aria-label="Main content" class="grid grid-cols-1 gap-4 sm:gap-6 h-max mb-6">
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Geo Map with live Visitor</h2>
                <Suspense>
                    <template #default>
                        <MapMarkerAsync :datamaps="datageoLocationsData.data" />
                    </template>
                    <template #fallback>
                        <SkeletonMaps />
                    </template>
                </Suspense>
            </article>
        </section>
        <section aria-label="Main content"
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 h-max mb-6">
            <article aria-label="Live Users" class="border border-gray-200 xl:col-span-2 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-1">Live Users</h2>
                <Suspense>
                    <template #default>
                        <Datatable :headers="dataliveUsersData.headers" :items="dataliveUsersData.items"
                            title="All Transactions" />
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
                        <Datatable :headers="datasessionsData.headers" :items="datasessionsData.items"
                            title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </article>
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-1">Device Breakdown</h2>
                <Suspense>
                    <template #default>
                        <PieChart :title="datadeviceBreakdownData.title"
                            :categories="datadeviceBreakdownData.categories"
                            :seriesData="datadeviceBreakdownData.seriesData"
                            satuan=" visitors" />
                    </template>
                    <template #fallback>
                        <SkeletonChart chartType="pie" />
                    </template>
                </Suspense>
            </article>
        </section>
        <section aria-label="Main content"
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 h-max mb-6">

            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Timezones & Language</h2>
                <Suspense>
                    <template #default>
                        <Datatable :headers="datatimezoneLanguageData.headers" :items="datatimezoneLanguageData.items"
                            title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </article>
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">User Journey</h2>
                <Suspense>
                    <template #default>
                        <Datatable :headers="databreadcrumbJourneyData.headers" :items="databreadcrumbJourneyData.items"
                            title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </article>
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-1">Hourly Visitors</h2>
                <div class="flex flex-col justify-center h-full">
                    <Suspense>
                        <template #default>
                            <BarChart :title="dataHourlyBarChart.title" :categories="dataHourlyBarChart.categories"
                                :seriesData="dataHourlyBarChart.seriesData" />
                        </template>
                        <template #fallback>
                            <SkeletonChart chartType="bar" />
                        </template>
                    </Suspense>
                </div>
            </article>
        </section>

    </DashboardAdminLayout>
</template>