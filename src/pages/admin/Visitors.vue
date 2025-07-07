<script setup>
import { onMounted, computed } from 'vue'
import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue'
import SkeletonMaps from '../../components/skeleton/SkeletonMaps.vue'
import SkeletonChart from '../../components/skeleton/SkeletonChart.vue'
import SkeletonTable from '../../components/skeleton/SkeletonTable.vue'
import { hourlyViewsChart } from '../../dummydata/chart'
import { useVisitorStore } from '../../store/admin/visitorStore'
import { defineAsyncComponent } from 'vue'

const visitorStore = useVisitorStore()

// Reactive computed properties to bind store state
const liveUsersData = computed(() => ({
    items: visitorStore.liveUsers,
    headers: visitorStore.headers.liveUsers
}))
const sessionsData = computed(() => ({
    items: visitorStore.sessions,
    headers: visitorStore.headers.sessions
}))
const deviceBreakdownData = computed(() => visitorStore.devices)
const timezoneLanguageData = computed(() => ({
    items: visitorStore.timezoneLang,
    headers: visitorStore.headers.timezoneLang
}))
const geoLocationsData = computed(() => visitorStore.mapData)
const breadcrumbJourneyData = computed(() => ({
    items: visitorStore.userJourneys,
    headers: visitorStore.headers.userJourneys,
    breadcrumb: visitorStore.breadcrumb
}))
const dataHourlyBarChart = computed(() => hourlyViewsChart)
const isLoading = computed(() => visitorStore.loading)
const error = computed(() => visitorStore.error)

// Fetch data on mount
onMounted(() => {
    visitorStore.fetchLiveUsers()
    visitorStore.fetchSessionsSummary()
    visitorStore.fetchDeviceBreakdown()
    visitorStore.fetchTimezonesAndLanguage()
    visitorStore.fetchMapRealTime()
    visitorStore.fetchUserJourneys()
})


// Async component imports
const BarChart = defineAsyncComponent(() =>
    import('../../components/apexchart/BarChart.vue')
)
const PieChart = defineAsyncComponent(() =>
    import('../../components/apexchart/PieChart.vue')
)
const Datatable = defineAsyncComponent(() =>
    import('../../components/datatables/DataTable.vue')
)
const MapMarkerAsync = defineAsyncComponent(() =>
    import('../../components/maps/MapVisitors.vue')
)
</script>

<template>
    <DashboardAdminLayout>
        <!-- Display error if present -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {{ error }}
        </div>

        <!-- Geo Map with Live Visitor -->
        <section aria-label="Main content" class="grid grid-cols-1 gap-4 sm:gap-6 h-max mb-6">
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Geo Map with Live Visitor</h2>
                <Suspense>
                    <template #default>
                        <MapMarkerAsync :datamaps="geoLocationsData" />
                    </template>
                    <template #fallback>
                        <SkeletonMaps v-if="isLoading" />
                    </template>
                </Suspense>
            </article>
        </section>

        <!-- Live Users, Sessions Summary, Device Breakdown -->
        <section aria-label="Main content"
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 h-max mb-6">
            <article aria-label="Live Users" class="border border-gray-200 xl:col-span-2 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-1">Live Users</h2>
                <Suspense>
                    <template #default>
                        <Datatable :headers="liveUsersData.headers" :items="liveUsersData.items"
                            title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable v-if="isLoading" />
                    </template>
                </Suspense>
            </article>
            <article aria-label="Sessions Summary" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Sessions Summary</h2>
                <Suspense>
                    <template #default>
                        <Datatable :headers="sessionsData.headers" :items="sessionsData.items"
                            title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable v-if="isLoading" />
                    </template>
                </Suspense>
            </article>
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-1">Device Breakdown</h2>
                <Suspense>
                    <template #default>
                        <PieChart :title="deviceBreakdownData.title" :categories="deviceBreakdownData.categories"
                            :seriesData="deviceBreakdownData.seriesData" satuan=" visitors" />
                    </template>
                    <template #fallback>
                        <SkeletonChart chartType="pie" v-if="isLoading" />
                    </template>
                </Suspense>
            </article>
        </section>

        <!-- Timezones & Language, User Journey, Hourly Visitors -->
        <section aria-label="Main content"
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 h-max mb-6">
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Timezones & Language</h2>
                <Suspense>
                    <template #default>
                        <Datatable :headers="timezoneLanguageData.headers" :items="timezoneLanguageData.items"
                            title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable v-if="isLoading" />
                    </template>
                </Suspense>
            </article>
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">User Journey</h2>
                <Suspense>
                    <template #default>
                        <Datatable :headers="breadcrumbJourneyData.headers" :items="breadcrumbJourneyData.items"
                            title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable v-if="isLoading" />
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
                            <SkeletonChart chartType="bar" v-if="isLoading" />
                        </template>
                    </Suspense>
                </div>
            </article>
        </section>
    </DashboardAdminLayout>
</template>