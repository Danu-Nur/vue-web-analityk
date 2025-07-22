<script setup>
import { onMounted, defineAsyncComponent, computed } from 'vue';
import { useConversionStore } from '../../../../store/admin/conversionStore'; // Sesuaikan path jika perlu
import SkeletonChart from '../../../../components/skeleton/SkeletonChart.vue';

// Async Components
const BarStepByStep = defineAsyncComponent(() => import('../../../../components/apexchart/BarChart.vue'));
const AreaChartTrends = defineAsyncComponent(() => import('../../../../components/apexchart/AreaChart.vue'));

const conversionStore = useConversionStore();

// Computed properties
const isLoading = computed(() => conversionStore.loading);
const error = computed(() => conversionStore.error);
const progressDashArray = computed(() => `${conversionStore.conversionRate.conversion_rate},100`);

// Fetch data saat komponen dimuat
onMounted(() => {
    conversionStore.fetchAllData();
});
</script>

<template>
    <div v-if="isLoading && conversionStore.funnelOverview.total_users === 0" class="text-center p-8 text-gray-500">
        <p>Loading conversion data, please wait...</p>
    </div>
    <div v-else-if="error" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
        <span class="font-medium">Error!</span> {{ error }}
    </div>

    <div v-else>
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div class="rounded-2xl card-new shadow-sm p-6">
                <h3 class="font-semibold text-lg mb-4">Funnel Overview</h3>
                <div class="flex justify-between items-end">
                    <div>
                        <p class="text-gray-500 text-sm">Total Users</p>
                        <p class="text-2xl font-bold">{{ conversionStore.funnelOverview.total_users.toLocaleString() }}
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="text-gray-500 text-sm">Converted</p>
                        <p class="text-2xl font-bold">{{ conversionStore.funnelOverview.converted_percentage }}%</p>
                    </div>
                </div>
                <div class="mt-4 h-2 w-full bg-gray-200 rounded-full">
                    <div class="h-full bg-blue-500 rounded-full"
                        :style="{ width: `${conversionStore.funnelOverview.converted_percentage}%` }"></div>
                </div>
            </div>

            <div class="rounded-2xl card-new shadow-sm p-6">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="font-semibold text-lg">Conversion Rate</h3>
                    <div class="flex items-center text-sm"
                        :class="conversionStore.conversionRate.change_percentage >= 0 ? 'text-green-500' : 'text-red-500'">
                        <i class="bi"
                            :class="conversionStore.conversionRate.change_percentage >= 0 ? 'bi-arrow-up' : 'bi-arrow-down'"></i>
                        <span class="font-medium ml-1">{{ conversionStore.conversionRate.change_percentage }}%</span>
                    </div>
                </div>
                <div class="flex justify-center items-center h-32">
                    <svg class="w-28 h-28" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none" stroke="#e5e7eb" stroke-width="3" />
                        <path class="text-gray-800"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                            :stroke-dasharray="progressDashArray" />
                        <text x="18" y="20.5" text-anchor="middle" font-size="5" fill="currentColor"
                            font-weight="bold">{{ conversionStore.conversionRate.conversion_rate }}%</text>
                    </svg>
                </div>
                <p class="text-center text-sm text-gray-500 mt-2">Last week: {{
                    conversionStore.conversionRate.last_week_rate }}%</p>
            </div>

            <div class="rounded-2xl card-new shadow-sm p-6">
                <h3 class="font-semibold text-lg mb-4">Top Sources</h3>
                <div class="space-y-4">
                    <div v-if="!conversionStore.topSources.items.length" class="text-sm text-gray-500">No source data.
                    </div>
                    <div v-for="source in conversionStore.topSources.items" :key="source.name">
                        <div class="flex justify-between text-sm mb-1">
                            <span>{{ source.name }}</span>
                            <span class="font-medium">{{ source.percentage }}%</span>
                        </div>
                        <div class="h-2 w-full bg-gray-200 rounded-full">
                            <div class="h-full bg-blue-500 rounded-full" :style="{ width: `${source.percentage}%` }">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div class="rounded-2xl card-new shadow-sm p-6 lg:col-span-2">
                <h3 class="font-semibold text-lg mb-4">{{ conversionStore.stepByStepDropoff.title }}</h3>
                <Suspense>
                    <template #default>
                        <BarStepByStep :categories="conversionStore.stepByStepDropoff.categories"
                            :seriesData="conversionStore.stepByStepDropoff.seriesData" :height="300" />
                    </template>
                    <template #fallback>
                        <SkeletonChart chartType="bar" />
                    </template>
                </Suspense>
            </div>

            <div class="rounded-2xl card-new shadow-sm p-6">
                <h3 class="font-semibold text-lg mb-4">Conversion Timeline</h3>
                <div class="space-y-4">
                    <div v-if="!conversionStore.conversionTimeline.items.length" class="text-sm text-gray-500">No
                        timeline data.
                    </div>
                    <div v-for="item in conversionStore.conversionTimeline.items" :key="item.range">
                        <div class="flex justify-between text-sm mb-1">
                            <span>{{ item.range }}</span>
                            <span class="font-medium">{{ item.percentage }}%</span>
                        </div>
                        <div class="h-2 w-full bg-gray-200 rounded-full">
                            <div class="h-full bg-gray-400 rounded-full" :style="{ width: `${item.percentage}%` }">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div class="rounded-2xl card-new shadow-sm p-6 lg:col-span-2">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="font-semibold text-lg">{{ conversionStore.conversionTrends.title }}</h3>
                    <div class="flex items-center text-sm"
                        :class="conversionStore.conversionTrends.change_percentage >= 0 ? 'text-green-500' : 'text-red-500'">
                        <i class="bi"
                            :class="conversionStore.conversionTrends.change_percentage >= 0 ? 'bi-arrow-up' : 'bi-arrow-down'"></i>
                        <span class="ml-1">{{ Math.abs(conversionStore.conversionTrends.change_percentage) }}%</span>
                    </div>
                </div>
                <Suspense>
                    <template #default>
                        <AreaChartTrends :categories="conversionStore.conversionTrends.categories"
                            :seriesData="conversionStore.conversionTrends.seriesData" :height="300" />
                    </template>
                    <template #fallback>
                        <SkeletonChart chartType="area" />
                    </template>
                </Suspense>
            </div>

            <div class="rounded-2xl card-new shadow-sm p-6">
                <h3 class="font-semibold text-lg mb-4">Recent Conversions</h3>

                <ul class="divide-y divide-gray-200">
                    <li v-if="!conversionStore.recentConversions.items.length" class="py-3 text-sm text-gray-500">No
                        recent
                        conversions.</li>
                    <li v-for="conv in conversionStore.recentConversions.items" :key="conv.user_id"
                        class="py-3 flex items-center space-x-4">
                        <img :src="conv.image" :alt="conv.title" class="w-10 h-10 rounded-full object-cover">
                        <div class="flex-1">
                            <p class="font-semibold text-gray-900">{{ conv.title }}</p>
                            <p class="text-gray-500 text-sm">{{ conv.description }}</p>
                        </div>
                    </li>
                </ul>

            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="rounded-2xl card-new shadow-sm p-6">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="font-semibold text-lg">User Journey</h3>
                    <!-- <button @click="conversionStore.fetchUserJourney()"
                        class="text-sm text-blue-500 hover:text-blue-700">Refresh</button> -->
                </div>
                <div class=" min-h-[200px] max-h-[250px] overflow-auto">
                    <ul class="space-y-3">
                        <li v-if="!conversionStore.userJourney.items.length"
                            class="text-sm text-gray-500 card-new rounded-lg p-3">
                            No journey data.
                        </li>
                        <li class="card-new rounded-lg p-3" v-for="journey in conversionStore.userJourney.items"
                            :key="journey.user_id">
                            <p class="font-semibold text-sm">{{ journey.user_id }}</p>
                            <p class="text-xs text-gray-600">{{ journey.journey_path }}</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="rounded-2xl card-new shadow-sm p-6 lg:col-span-2">
                <h3 class="font-semibold text-lg mb-4">Conversion Goals</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div v-if="!conversionStore.conversionGoals.items.length"
                        class="sm:col-span-2 text-sm text-gray-500">No
                        goals configured.</div>
                    <div v-for="goal in conversionStore.conversionGoals.items" :key="goal.title"
                        class="flex items-center space-x-4 p-3 card-new rounded-lg">
                        <div class="p-2 rounded-lg" :class="`bg-${goal.icon_bg}`"><i
                                :class="`bi bi-${goal.icon} text-lg`"></i>
                        </div>
                        <div>
                            <p class="font-semibold">{{ goal.title }}</p>
                            <p class="text-gray-600 text-sm">{{ goal.count.toLocaleString() }} events</p>
                        </div>
                        <div class="ml-auto text-sm" :class="goal.change_color">{{ goal.change_percentage }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>