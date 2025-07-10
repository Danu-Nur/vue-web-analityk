<script setup>
import { defineAsyncComponent } from 'vue';
// import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
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
    <!-- <DashboardAdminLayout> -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Card 1: Affiliate Earnings (2x1) -->
            <div class="p-4 col-span-1 sm:col-span-2 border border-gray-200 rounded-lg bg-white">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Affiliate Earnings</h2>
                    <div class="flex items-center space-x-2">
                        <select class="bg-white text-sm rounded-lg px-3 py-1 border border-gray-200">
                            <option>This Month</option>
                            <option>Last Month</option>
                            <option>All Time</option>
                        </select>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <p class="text-gray-500 text-sm">Total Earnings</p>
                        <p class="text-3xl font-bold">$2,845.50</p>
                        <p class="text-green-500 text-sm mt-1">+12.5% from last month</p>
                    </div>
                    <div class="mt-4 sm:mt-0">
                        <p class="text-gray-500 text-sm">Pending Payout</p>
                        <p class="text-2xl font-semibold">$1,250.00</p>
                    </div>
                    <div class="mt-4 sm:mt-0">
                        <p class="text-gray-500 text-sm">Referrals</p>
                        <p class="text-2xl font-semibold">42</p>
                    </div>
                </div>
                <div class="chart-container mt-6">
                    <Suspense>
                        <template #default>
                            <AreaChartTrends title="" :categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
                                :seriesData="[450, 800, 1200, 950, 1500, 2000]" :height="300" />
                        </template>
                        <template #fallback>
                            <SkeletonChart chartType="bar" />
                        </template>
                    </Suspense>
                </div>
            </div>

            <!-- Card 2: Referral Link (1x1) -->
            <div class="p-4 border border-gray-200 rounded-lg bg-white">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Your Referral Link</h2>
                    <i data-lucide="link" class="text-gray-400"></i>
                </div>
                <div class="bg-gray-50 rounded-lg p-3 flex items-center justify-between mb-4">
                    <p class="text-sm truncate">https://analyticspro.com/ref/yourusername</p>
                    <button class="copy-btn bg-white rounded-md p-1 px-2 border border-gray-200 hover:bg-gray-50">
                        <i class="bi bi-copy"></i>
                    </button>
                </div>
                <div class="flex flex-col items-center">
                    <div class="bg-white p-3 rounded-lg mb-3">
                        <img alt="QR code preview of referral link https://app.example.com/referral?code=ABCD1234"
                            class="w-64 h-auto rounded-lg shadow-md" loading="lazy"
                            src="https://storage.googleapis.com/a1aa/image/74319177-0989-4f22-71ec-70c374e8b8df.jpg" />
                    </div>
                    <p class="text-sm text-gray-500">Scan to share</p>
                </div>
            </div>

            <!-- Card 3: Signups from Referrals (1x2) -->
            <div class="p-4 border border-gray-200 rounded-lg row-span-2 bg-white">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Signups from Referrals</h2>
                    <i data-lucide="users" class="text-gray-400"></i>
                </div>
                <div class="h-max">
                    <Suspense>
                        <template #default>
                            <BarStepByStep title="" :categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
                                :seriesData="[3, 7, 4, 8, 6, 10]" :height="460" />
                        </template>
                        <template #fallback>
                            <SkeletonChart chartType="bar" />
                        </template>
                    </Suspense>
                </div>
                <div class="mt-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm font-medium">Successful Conversions</p>
                        <p class="text-sm font-semibold">32/42</p>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-gradient-to-r from-blue-400 to-gray-600 h-2 rounded-full" style="width: 76%"></div>
                    </div>
                    <div class="mt-4 grid grid-cols-3 gap-4">
                        <div>
                            <p class="text-gray-500 text-xs">Today</p>
                            <p class="font-medium">2</p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-xs">This Week</p>
                            <p class="font-medium">8</p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-xs">This Month</p>
                            <p class="font-medium">22</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 4: Commission Tier (1x1) -->
            <div class="p-4 border border-gray-200 rounded-lg bg-white">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Commission Tier</h2>
                    <i data-lucide="award" class="text-gray-400"></i>
                </div>
                <div class="flex items-center mb-4">
                    <div class="relative">
                        <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                            <i data-lucide="gem" class="w-6 h-6 text-blue-500"></i>
                        </div>
                        <div
                            class="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            2</div>
                    </div>
                    <div class="ml-4">
                        <p class="font-semibold">Silver Tier</p>
                        <p class="text-sm text-gray-500">20% commission</p>
                    </div>
                </div>
                <div class="mb-2">
                    <p class="text-sm text-gray-500">Progress to Gold Tier</p>
                    <p class="text-sm font-semibold">$755/$1,500</p>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-yellow-400 h-2 rounded-full" style="width: 50%"></div>
                </div>
                <div class="mt-4">
                    <p class="text-xs text-gray-500">Earn $745 more this month to unlock Gold Tier (25% commission)</p>
                </div>
            </div>

            <!-- Card 5: Invite Friends (1x1) -->
            <div class="p-4 border border-gray-200 rounded-lg bg-white">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Invite Friends</h2>
                    <i data-lucide="send" class="text-gray-400"></i>
                </div>
                <p class="text-sm text-gray-600 mb-4">Earn 20% of their subscription payments for 12 months</p>
                <div class="space-y-3">
                    <button
                        class="w-full flex items-center justify-center space-x-2 bg-black text-white rounded-lg py-2 px-4 hover:bg-gray-800 transition">
                        <i data-lucide="mail" class="w-4 h-4"></i>
                        <span>Send Email Invite</span>
                    </button>
                    <button
                        class="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition">
                        <i data-lucide="share-2" class="w-4 h-4"></i>
                        <span>Share Link</span>
                    </button>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100">
                    <p class="text-sm font-medium mb-2">Share via social media</p>
                    <div class="flex space-x-2">
                        <button
                            class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                            <i data-lucide="twitter" class="w-4 h-4 text-blue-400"></i>
                        </button>
                        <button
                            class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                            <i data-lucide="facebook" class="w-4 h-4 text-blue-600"></i>
                        </button>
                        <button
                            class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                            <i data-lucide="linkedin" class="w-4 h-4 text-blue-700"></i>
                        </button>
                        <button
                            class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                            <i data-lucide="message-circle" class="w-4 h-4 text-green-500"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Card 6: Top Affiliates Leaderboard (2x1) -->
            <div class="p-4 border border-gray-200 rounded-lg col-span-1 sm:col-span-2 bg-white">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Top Affiliates</h2>
                    <i data-lucide="trophy" class="text-gray-400"></i>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="text-left text-sm text-gray-500 border-b border-gray-100">
                                <th class="pb-2">Rank</th>
                                <th class="pb-2">Affiliate</th>
                                <th class="pb-2">Referrals</th>
                                <th class="pb-2">Earnings</th>
                                <th class="pb-2">Tier</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-100 hover:bg-gray-50">
                                <td class="py-3">
                                    <div
                                        class="w-6 h-6 rounded-full bg-yellow-400 text-white flex items-center justify-center text-xs font-bold">
                                        1</div>
                                </td>
                                <td class="py-3 font-medium">Sarah Johnson</td>
                                <td class="py-3">128</td>
                                <td class="py-3 font-semibold">$8,420</td>
                                <td class="py-3">
                                    <span
                                        class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Platinum</span>
                                </td>
                            </tr>
                            <tr class="border-b border-gray-100 hover:bg-gray-50">
                                <td class="py-3">
                                    <div
                                        class="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs font-bold">
                                        2</div>
                                </td>
                                <td class="py-3 font-medium">Michael Chen</td>
                                <td class="py-3">96</td>
                                <td class="py-3 font-semibold">$6,150</td>
                                <td class="py-3">
                                    <span
                                        class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Gold</span>
                                </td>
                            </tr>
                            <tr class="border-b border-gray-100 hover:bg-gray-50">
                                <td class="py-3">
                                    <div
                                        class="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold">
                                        3</div>
                                </td>
                                <td class="py-3 font-medium">Alex Rodriguez</td>
                                <td class="py-3">78</td>
                                <td class="py-3 font-semibold">$4,980</td>
                                <td class="py-3">
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Silver</span>
                                </td>
                            </tr>
                            <tr class="border-b border-gray-100 hover:bg-gray-50">
                                <td class="py-3">
                                    <div
                                        class="w-6 h-6 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center text-xs font-bold">
                                        4</div>
                                </td>
                                <td class="py-3 font-medium">You</td>
                                <td class="py-3">42</td>
                                <td class="py-3 font-semibold">$2,845</td>
                                <td class="py-3">
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Silver</span>
                                </td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="py-3">
                                    <div
                                        class="w-6 h-6 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center text-xs font-bold">
                                        5</div>
                                </td>
                                <td class="py-3 font-medium">Jamie Wilson</td>
                                <td class="py-3">38</td>
                                <td class="py-3 font-semibold">$2,410</td>
                                <td class="py-3">
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Silver</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Card 7: Payout History (1x1) -->
            <div class="p-4 border border-gray-200 rounded-lg bg-white">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Payout History</h2>
                    <i data-lucide="banknote" class="text-gray-400"></i>
                </div>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-medium">May 2023</p>
                            <p class="text-sm text-gray-500">Completed</p>
                        </div>
                        <p class="font-semibold">$1,240.50</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-medium">April 2023</p>
                            <p class="text-sm text-gray-500">Completed</p>
                        </div>
                        <p class="font-semibold">$980.00</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-medium">March 2023</p>
                            <p class="text-sm text-gray-500">Completed</p>
                        </div>
                        <p class="font-semibold">$625.00</p>
                    </div>
                </div>
                <button
                    class="w-full mt-4 text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center justify-center space-x-1">
                    <span>View All</span>
                    <i data-lucide="chevron-right" class="w-4 h-4"></i>
                </button>
            </div>

            <!-- Card 8: Promo Banners & Assets (1x1) -->
            <div class="p-4 border border-gray-200 rounded-lg bg-white">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Promo Assets</h2>
                    <i data-lucide="image" class="text-gray-400"></i>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-4">
                    <div class="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                        <i data-lucide="image" class="w-8 h-8 text-gray-400"></i>
                    </div>
                    <div class="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                        <i data-lucide="image" class="w-8 h-8 text-gray-400"></i>
                    </div>
                    <div class="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                        <i data-lucide="image" class="w-8 h-8 text-gray-400"></i>
                    </div>
                    <div class="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                        <i data-lucide="image" class="w-8 h-8 text-gray-400"></i>
                    </div>
                </div>
                <button
                    class="w-full bg-black text-white rounded-lg py-2 px-4 hover:bg-gray-800 transition flex items-center justify-center space-x-2">
                    <i data-lucide="download" class="w-4 h-4"></i>
                    <span>Download All Assets</span>
                </button>
            </div>

            <!-- Card 9: Affiliate Settings (1x1) -->
            <div class="p-4 border border-gray-200 rounded-lg bg-white">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Affiliate Settings</h2>
                    <i data-lucide="settings" class="text-gray-400"></i>
                </div>
                <div class="space-y-4">
                    <div>
                        <p class="text-sm font-medium mb-1">Payout Method</p>
                        <select class="w-full bg-white rounded-lg px-3 py-2 border border-gray-200 text-sm">
                            <option>PayPal</option>
                            <option>Bank Transfer</option>
                            <option>Stripe</option>
                        </select>
                    </div>
                    <div>
                        <p class="text-sm font-medium mb-1">Payout Email</p>
                        <input type="email" value="your.email@example.com"
                            class="w-full bg-white rounded-lg px-3 py-2 border border-gray-200 text-sm">
                    </div>
                    <div class="flex items-center justify-between pt-2">
                        <div>
                            <p class="text-sm font-medium">Email Notifications</p>
                            <p class="text-xs text-gray-500">Get updates about your referrals</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer" checked>
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500">
                            </div>
                        </label>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium">SMS Notifications</p>
                            <p class="text-xs text-gray-500">Important alerts via SMS</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer">
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500">
                            </div>
                        </label>
                    </div>
                </div>
                <button class="w-full mt-6 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition">
                    Save Settings
                </button>
            </div>
        </div>
    <!-- </DashboardAdminLayout> -->
</template>