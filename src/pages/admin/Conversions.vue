<script setup>
import { defineAsyncComponent } from 'vue';
import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
import { funnels, funnelChart, completedFunnels, conversionByDevice, flowDiagram, barChartStepByStep, areaConversionTrends } from '../../dummydata/pages4/dataPages4';
import SkeletonChart from '../../components/skeleton/SkeletonChart.vue';
// Importing the Datatable component asynchronously
const BarStepByStep = defineAsyncComponent(() =>
    import('../../components/apexchart/BarChart.vue')
)
const AreaChartTrends = defineAsyncComponent(() =>
    import('../../components/apexchart/AreaChart.vue')
)
</script>
<template>
    <DashboardAdminLayout>
        <div class="flex justify-end items-center mb-8">
            <!-- <div>
                <h1 class="text-2xl font-bold">Conversions Dashboard</h1>
                <p class="text-gray-500">Track and optimize your conversion funnels</p>
            </div> -->
            <div class="flex items-center space-x-4">
                <div class="relative">
                    <select class="appearance-none bg-white pl-4 pr-8 py-2 rounded-lg border border-gray-200">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                    </select>
                    <!-- <i data-lucide="chevron-down" class="absolute right-3 top-2.5 text-gray-400 w-4 h-4"></i> -->
                    <i class="bi bi-chevron-down absolute right-3 top-2.5 text-gray-600"></i>
                </div>
                <button class="bg-white rounded-lg px-4 py-2 border border-gray-200 flex items-center">
                    <i class="bi bi-funnel mr-2 text-gray-600"></i>
                    <span>Filters</span>
                </button>
            </div>
        </div>

        <section class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:mb-6">
            <!-- Funnel Overview -->
            <div class="rounded-2xl border border-gray-200 shadow-sm p-6 transition-all">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-semibold text-lg flex items-center">
                            <!-- <i class="bi bi-flag w-5 h-5 mr-2"></i> -->
                            Funnel Overview
                        </h3>
                        <p class="text-gray-500 text-sm">Primary conversion path</p>
                    </div>
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Active</span>
                </div>
                <div class="flex justify-between items-end">
                    <div>
                        <p class="text-gray-500 text-sm">Total users</p>
                        <p class="text-2xl font-bold">8,742</p>
                    </div>
                    <div class="text-right">
                        <p class="text-gray-500 text-sm">Converted</p>
                        <p class="text-2xl font-bold text-grey-600">24.3%</p>
                    </div>
                </div>
                <div class="mt-4">
                    <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-blue-400 to-gray-600 rounded-full"
                            style="width: 24.3%"></div>
                    </div>
                </div>
            </div>

            <!-- Conversion Rate -->
            <div class="rounded-2xl border border-gray-200 shadow-sm p-6 transition-all">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-semibold text-lg flex items-center">
                            <!-- <i data-lucide="trending-up" class="w-5 h-5 mr-2 text-gray-500"></i> -->
                            Conversion Rate
                        </h3>
                        <p class="text-gray-500 text-sm">Overall performance</p>
                    </div>
                    <div class="flex items-center text-sm">
                        <i data-lucide="arrow-up" class="w-4 h-4 mr-1 text-green-500"></i>
                        <span class="text-green-500">2.1%</span>
                    </div>
                </div>
                <div class="flex justify-center items-center h-32">
                    <svg class="w-50 h-50" viewBox="0 0 36 36">
                        <path d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" stroke-width="3" />
                        <path d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#000000" stroke-width="3"
                            stroke-dasharray="42, 100"
                            class="progress-ring__circle bg-gradient-to-r from-blue-400 to-gray-600" />
                        <text x="18" y="20.5" text-anchor="middle" font-size="5" fill="#000000"
                            font-weight="bold">42%</text>
                    </svg>
                </div>
                <div class="flex justify-between text-sm mt-2">
                    <span class="text-gray-500">Last week: 39.9%</span>
                    <span class="font-medium">+2.1%</span>
                </div>
            </div>

            <!-- Top Sources -->
            <div class="rounded-2xl border border-gray-200 shadow-sm p-6 transition-all">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-semibold text-lg flex items-center">
                            <!-- <i data-lucide="globe" class="w-5 h-5 mr-2 text-amber-500"></i> -->
                            Top Sources
                        </h3>
                        <p class="text-gray-500 text-sm">By conversion volume</p>
                    </div>
                    <button class="text-sm text-gray-600 hover:text-gray-800">View all</button>
                </div>
                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Organic Search</span>
                            <span class="font-medium">42%</span>
                        </div>
                        <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-amber-400 to-gray-600 rounded-full"
                                style="width: 42%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Direct</span>
                            <span class="font-medium">28%</span>
                        </div>
                        <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-blue-400 to-gray-600 rounded-full"
                                style="width: 28%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Social</span>
                            <span class="font-medium">18%</span>
                        </div>
                        <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-purple-400 to-gray-600 rounded-full"
                                style="width: 18%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Email</span>
                            <span class="font-medium">12%</span>
                        </div>
                        <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-emerald-400 to-gray-600 rounded-full"
                                style="width: 12%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <!-- Step-by-Step Drop-off Chart -->
            <div class="rounded-2xl border border-gray-200 shadow-sm p-6 transition-all md:col-span-2">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h3 class="font-semibold text-lg flex items-center">
                            <!-- <i data-lucide="timeline" class="w-5 h-5 mr-2 text-rose-500"></i> -->
                            Step-by-Step Drop-off
                        </h3>
                        <!-- <p class="text-gray-500 text-sm">funnel performance</p> -->
                    </div>
                    <div class="flex space-x-2">
                        <button class="text-sm px-3 py-1 bg-gray-100 rounded-lg">Steps</button>
                        <button class="text-sm px-3 py-1 rounded-lg hover:bg-gray-100">Time</button>
                        <button class="text-sm px-3 py-1 rounded-lg hover:bg-gray-100">Device</button>
                    </div>
                </div>
                <div class="flex justify-between items-end">
                    <Suspense>
                        <template #default>
                            <BarStepByStep :title="barChartStepByStep.title" :categories="barChartStepByStep.categories"
                                :seriesData="barChartStepByStep.seriesData" :height="300" />
                        </template>
                        <template #fallback>
                            <SkeletonChart chartType="bar" />
                        </template>
                    </Suspense>
                </div>
            </div>

            <!-- Conversion Timeline -->
            <div class="rounded-2xl border border-gray-200 shadow-sm p-6 transition-all">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-semibold text-lg flex items-center">
                            <!-- <i data-lucide="clock" class="w-5 h-5 mr-2 text-emerald-500"></i> -->
                            Conversion Timeline
                        </h3>
                        <p class="text-gray-500 text-sm">Time from first to last step</p>
                    </div>
                    <div class="text-sm text-gray-500">Avg: 2m 18s</div>
                </div>
                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>0-30 seconds</span>
                            <span class="font-medium">12%</span>
                        </div>
                        <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"
                                style="width: 12%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>30s - 2 minutes</span>
                            <span class="font-medium">34%</span>
                        </div>
                        <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"
                                style="width: 34%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>2-5 minutes</span>
                            <span class="font-medium">28%</span>
                        </div>
                        <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"
                                style="width: 28%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>5-15 minutes</span>
                            <span class="font-medium">18%</span>
                        </div>
                        <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"
                                style="width: 18%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>15+ minutes</span>
                            <span class="font-medium">8%</span>
                        </div>
                        <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"
                                style="width: 8%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Conversion Trends -->
            <div class="rounded-2xl border border-gray-200 shadow-sm p-6 transition-all md:col-span-2">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-semibold text-lg flex items-center">
                            <!-- <i data-lucide="bar-chart-2" class="w-5 h-5 mr-2 text-indigo-500"></i> -->
                            Conversion Trends
                        </h3>
                        <!-- <p class="text-gray-500 text-sm">Daily conversion rate over time</p> -->
                    </div>
                    <div class="flex items-center text-sm">
                        <i data-lucide="arrow-up" class="w-4 h-4 mr-1 text-green-500"></i>
                        <span class="text-green-500">12% increase</span>
                    </div>
                </div>
                <div class="chart-container">
                    <Suspense>
                        <template #default>
                            <AreaChartTrends :title="areaConversionTrends.title"
                                :categories="areaConversionTrends.categories"
                                :seriesData="areaConversionTrends.seriesData" :height="300" />
                        </template>
                        <template #fallback>
                            <SkeletonChart chartType="bar" />
                        </template>
                    </Suspense>
                </div>
            </div>

            <!-- Recent Conversions -->
            <div class="rounded-2xl border border-gray-200 shadow-sm p-6 transition-all">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-semibold text-lg flex items-center">
                            <!-- <i data-lucide="zap" class="w-5 h-5 mr-2 text-yellow-500"></i> -->
                            Recent Conversions
                        </h3>
                        <p class="text-gray-500 text-sm">Latest successful conversions</p>
                    </div>
                    <button class="text-sm text-gray-600 hover:text-gray-800">View all</button>
                </div>
                <ul class="divide-y divide-gray-200 overflow-y-auto max-h-[300px]">
                    <li class="py-3 flex justify-between items-center">
                        <div>
                            <p class="font-semibold text-gray-900">
                                Checkout completed
                            </p>
                            <p class="text-gray-600 text-sm">
                                Signed up 5 minutes ago
                            </p>
                            <p class="text-gray-500 text-xs font-mono">
                                Landing Page → Signup → Email Confirm
                            </p>
                        </div>
                        <img alt="Profile picture placeholder for Alice Johnson, initials AJ on gray background"
                            class="rounded-full w-12 h-12 object-cover" height="48" loading="lazy"
                            src="https://storage.googleapis.com/a1aa/image/c151394c-3a92-471f-0edb-c844bd3a1bda.jpg"
                            width="48" />
                    </li>
                    <li class="py-3 flex justify-between items-center">
                        <div>
                            <p class="font-semibold text-gray-900">
                                Account created
                            </p>
                            <p class="text-gray-600 text-sm">
                                Purchased 10 minutes ago
                            </p>
                            <p class="text-gray-500 text-xs font-mono">
                                Landing Page → Signup → Purchase
                            </p>
                        </div>
                        <img alt="Profile picture placeholder for Michael Smith, initials MS on gray background"
                            class="rounded-full w-12 h-12 object-cover" height="48" loading="lazy"
                            src="https://storage.googleapis.com/a1aa/image/cc2bfb81-ee43-4144-1ba2-910080a1e54e.jpg"
                            width="48" />
                    </li>
                    <li class="py-3 flex justify-between items-center">
                        <div>
                            <p class="font-semibold text-gray-900">
                                Checkout completed
                            </p>
                            <p class="text-gray-600 text-sm">
                                Confirmed email 15 minutes ago
                            </p>
                            <p class="text-gray-500 text-xs font-mono">
                                Landing Page → Signup → Email Confirm
                            </p>
                        </div>
                        <img alt="Profile picture placeholder for Sofia Lee, initials SL on gray background"
                            class="rounded-full w-12 h-12 object-cover" height="48" loading="lazy"
                            src="https://storage.googleapis.com/a1aa/image/166f3b23-d09f-43e4-46cb-021603a3be79.jpg"
                            width="48" />
                    </li>
                    <li class="py-3 flex justify-between items-center">
                        <div>
                            <p class="font-semibold text-gray-900">
                                Download started
                            </p>
                            <p class="text-gray-600 text-sm">
                                Signed up 20 minutes ago
                            </p>
                            <p class="text-gray-500 text-xs font-mono">
                                Landing Page → Signup
                            </p>
                        </div>
                        <img alt="Profile picture placeholder for David Kim, initials DK on gray background"
                            class="rounded-full w-12 h-12 object-cover" height="48" loading="lazy"
                            src="https://storage.googleapis.com/a1aa/image/e592fa43-4d0f-4d5d-b00b-e5423bed6899.jpg"
                            width="48" />
                    </li>
                </ul>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <!-- User Journey Snapshots -->
            <div class="rounded-2xl border border-gray-200 shadow-sm p-6 transition-all">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-semibold text-lg flex items-center">
                            <!-- <i data-lucide="map" class="w-5 h-5 mr-2 text-cyan-500"></i> -->
                            User Journey
                        </h3>
                        <p class="text-gray-500 text-sm">Sample conversion path</p>
                    </div>
                    <button class="text-sm text-gray-600 hover:text-gray-800">Refresh</button>
                </div>
                
                <ul class="space-y-4 overflow-y-auto max-h-[250px]">
                    <li
                        class="p-3 border border-gray-200 rounded-xl hover:ring-1 ring-gray-200 transition cursor-pointer">
                        <p class="text-gray-800 font-semibold mb-1">
                            User #12345
                        </p>
                        <p class="text-gray-600 text-sm mb-2">
                            Landing Page → Signup → Email Confirm → Purchase
                        </p>
                        <div class="flex space-x-2 text-gray-500 text-xs font-mono">
                            <span>
                                0m
                            </span>
                            <span>
                                5m
                            </span>
                            <span>
                                15m
                            </span>
                            <span>
                                1h
                            </span>
                        </div>
                    </li>
                    <li
                        class="p-3 border border-gray-200 rounded-xl hover:ring-1 ring-gray-200 transition cursor-pointer">
                        <p class="text-gray-800 font-semibold mb-1">
                            User #67890
                        </p>
                        <p class="text-gray-600 text-sm mb-2">
                            Landing Page → Signup → Purchase
                        </p>
                        <div class="flex space-x-2 text-gray-500 text-xs font-mono">
                            <span>
                                0m
                            </span>
                            <span>
                                7m
                            </span>
                            <span>
                                45m
                            </span>
                        </div>
                    </li>
                    <li
                        class="p-3 border border-gray-200 rounded-xl hover:ring-1 ring-gray-200 transition cursor-pointer">
                        <p class="text-gray-800 font-semibold mb-1">
                            User #54321
                        </p>
                        <p class="text-gray-600 text-sm mb-2">
                            Landing Page → Signup → Email Confirm
                        </p>
                        <div class="flex space-x-2 text-gray-500 text-xs font-mono">
                            <span>
                                0m
                            </span>
                            <span>
                                4m
                            </span>
                            <span>
                                20m
                            </span>
                        </div>
                    </li>
                    <li
                        class="p-3 border border-gray-200 rounded-xl hover:ring-1 ring-gray-200 transition cursor-pointer">
                        <p class="text-gray-800 font-semibold mb-1">
                            User #98765
                        </p>
                        <p class="text-gray-600 text-sm mb-2">
                            Landing Page → Purchase
                        </p>
                        <div class="flex space-x-2 text-gray-500 text-xs font-mono">
                            <span>
                                0m
                            </span>
                            <span>
                                30m
                            </span>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Conversion Goals -->
            <div class="rounded-2xl border border-gray-200 shadow-sm p-6 transition-all md:col-span-2">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-semibold text-lg flex items-center">
                            <!-- <i data-lucide="target" class="w-5 h-5 mr-2 text-pink-500"></i> -->
                            Conversion Goals
                        </h3>
                        <p class="text-gray-500 text-sm">Tracked custom events</p>
                    </div>
                    <button class="text-sm text-gray-600 hover:text-gray-800">Add goal</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <div class="flex items-center">
                                <div class="bg-blue-100 p-1.5 rounded-lg mr-3">
                                    <i data-lucide="shopping-cart" class="w-4 h-4 text-blue-600"></i>
                                </div>
                                <span class="font-medium">Purchase</span>
                            </div>
                            <span class="text-sm font-medium text-green-600">+8%</span>
                        </div>
                        <p class="text-sm text-gray-500 mb-2">Completed checkouts</p>
                        <div class="flex justify-between text-sm">
                            <span>2,098</span>
                            <span class="text-gray-500">24% CR</span>
                        </div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <div class="flex items-center">
                                <div class="bg-purple-100 p-1.5 rounded-lg mr-3">
                                    <i data-lucide="user-plus" class="w-4 h-4 text-purple-600"></i>
                                </div>
                                <span class="font-medium">Signup</span>
                            </div>
                            <span class="text-sm font-medium text-green-600">+12%</span>
                        </div>
                        <p class="text-sm text-gray-500 mb-2">New accounts created</p>
                        <div class="flex justify-between text-sm">
                            <span>1,542</span>
                            <span class="text-gray-500">18% CR</span>
                        </div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <div class="flex items-center">
                                <div class="bg-green-100 p-1.5 rounded-lg mr-3">
                                    <i data-lucide="download" class="w-4 h-4 text-green-600"></i>
                                </div>
                                <span class="font-medium">Download</span>
                            </div>
                            <span class="text-sm font-medium text-rose-500">-3%</span>
                        </div>
                        <p class="text-sm text-gray-500 mb-2">File downloads</p>
                        <div class="flex justify-between text-sm">
                            <span>876</span>
                            <span class="text-gray-500">10% CR</span>
                        </div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <div class="flex items-center">
                                <div class="bg-amber-100 p-1.5 rounded-lg mr-3">
                                    <i data-lucide="mail" class="w-4 h-4 text-amber-600"></i>
                                </div>
                                <span class="font-medium">Subscribe</span>
                            </div>
                            <span class="text-sm font-medium text-green-600">+5%</span>
                        </div>
                        <p class="text-sm text-gray-500 mb-2">Newsletter signups</p>
                        <div class="flex justify-between text-sm">
                            <span>1,209</span>
                            <span class="text-gray-500">14% CR</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DashboardAdminLayout>
</template>