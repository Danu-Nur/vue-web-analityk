<script setup>
const DataTable = defineAsyncComponent(() => import('../../components/datatables/DataTable.vue'))
import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
import { currentPlan, billingTable, planComparison, upgradeCTA, usage } from '../../dummydata/pages7/dataPages7';
import SkeletonTable from '../../components/skeleton/SkeletonTable.vue';
import { defineAsyncComponent } from 'vue';
</script>
<template>
    <DashboardAdminLayout>
        <div class="mx-auto">
            <!-- <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold text-gray-900">Billing & Plans</h1>
                <div class="flex space-x-2">
                    <button
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Help Center
                    </button>
                </div>
            </div> -->

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                <!-- Current Plan Summary -->
                <div class="border border-gray-200 p-6 rounded-lg">
                    <div class="flex justify-between items-start mb-4">
                        <h2 class="text-xl font-semibold text-gray-900">Current Plan</h2>
                        <span class="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Active</span>
                    </div>

                    <div class="mb-6">
                        <h3 class="text-2xl font-bold mb-1">Pro Plan</h3>
                        <p class="text-gray-600">$29/month</p>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <p class="text-sm text-gray-500 mb-1">Billing Cycle</p>
                            <p class="font-medium">Monthly</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500 mb-1">Next Billing Date</p>
                            <p class="font-medium">May 15, 2023</p>
                        </div>
                    </div>
                </div>

                <!-- Usage Overview -->
                <div class="border border-gray-200 md:col-span-2 p-6 rounded-lg">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6">Usage Overview</h2>

                    <div class="space-y-6">
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="text-sm font-medium text-gray-700">Pageviews</span>
                                <span class="text-sm font-medium text-gray-700">75,000/100,000</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 75%"></div>
                            </div>
                        </div>

                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="text-sm font-medium text-gray-700">Custom Events</span>
                                <span class="text-sm font-medium text-gray-700">1,200/2,000</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 60%"></div>
                            </div>
                        </div>

                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="text-sm font-medium text-gray-700">Team Members</span>
                                <span class="text-sm font-medium text-gray-700">3/5</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 60%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Plan Comparison Table -->
                <div class="border border-gray-200 md:col-span-2 p-6 rounded-lg">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6">Plan Comparison</h2>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Feature</th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Free</th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Pro</th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Enterprise</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Price</td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$0</td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$29/mo</td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$99/mo</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Pageviews
                                    </td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">10,000/mo</td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">100,000/mo</td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Unlimited</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Custom
                                        Events
                                    </td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">500/mo</td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2,000/mo</td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Unlimited</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Team
                                        Members
                                    </td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">1</td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">5</td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Unlimited</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Data
                                        Retention
                                    </td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">3 months</td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">12 months</td>
                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Unlimited</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Upgrade / Downgrade -->
                <div class="border border-gray-200 p-6 rounded-lg">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6">Change Plan</h2>

                    <div class="space-y-4">
                        <div class="plan-card p-4 border border-gray-200 rounded-lg transition-all duration-300">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h3 class="font-medium">Free</h3>
                                    <p class="text-sm text-gray-500">$0/month</p>
                                </div>
                                <button
                                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                                    Downgrade
                                </button>
                            </div>
                        </div>

                        <div
                            class="plan-card p-4 border border-blue-200 rounded-lg bg-blue-50 transition-all duration-300">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h3 class="font-medium">Pro</h3>
                                    <p class="text-sm text-blue-600">Current Plan</p>
                                </div>
                                <button
                                    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-not-allowed opacity-50"
                                    disabled>
                                    Current
                                </button>
                            </div>
                        </div>

                        <div class="plan-card p-4 border border-gray-200 rounded-lg transition-all duration-300">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h3 class="font-medium">Enterprise</h3>
                                    <p class="text-sm text-gray-500">$99/month</p>
                                </div>
                                <button
                                    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payment Method -->
                <div class="border border-gray-200 p-6 rounded-lg">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-semibold text-gray-900">Payment Method</h2>
                        <button
                            class="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-lg border border-blue-200 hover:bg-blue-50">
                            Change
                        </button>
                    </div>

                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <div>
                            <p class="font-medium">Visa ending in 4242</p>
                            <p class="text-sm text-gray-500">Expires 04/2025</p>
                        </div>
                    </div>
                </div>

                <!-- Billing History -->
                <div class="border border-gray-200 p-6 rounded-lg">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6">Billing History</h2>

                    <div class="space-y-4">
                        <div class="flex justify-between items-center py-3 border-b border-gray-100">
                            <div>
                                <p class="font-medium">Pro Plan Subscription</p>
                                <p class="text-sm text-gray-500">April 15, 2023</p>
                            </div>
                            <div class="text-right">
                                <p class="font-medium">$29.00</p>
                                <button class="text-sm text-blue-600 hover:text-blue-800">View Invoice</button>
                            </div>
                        </div>

                        <div class="flex justify-between items-center py-3 border-b border-gray-100">
                            <div>
                                <p class="font-medium">Pro Plan Subscription</p>
                                <p class="text-sm text-gray-500">March 15, 2023</p>
                            </div>
                            <div class="text-right">
                                <p class="font-medium">$29.00</p>
                                <button class="text-sm text-blue-600 hover:text-blue-800">View Invoice</button>
                            </div>
                        </div>

                        <div class="flex justify-between items-center py-3">
                            <div>
                                <p class="font-medium">Pro Plan Subscription</p>
                                <p class="text-sm text-gray-500">February 15, 2023</p>
                            </div>
                            <div class="text-right">
                                <p class="font-medium">$29.00</p>
                                <button class="text-sm text-blue-600 hover:text-blue-800">View Invoice</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Subscription Settings -->
                <div class="border border-gray-200 p-6 rounded-lg">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6">Subscription Settings</h2>

                    <div class="space-y-6">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-medium">Auto-renew</p>
                                <p class="text-sm text-gray-500">Automatically renew your subscription</p>
                            </div>
                            <div class="relative inline-block w-10 mr-2 align-middle select-none">
                                <input type="checkbox" name="auto-renew" id="auto-renew"
                                    class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                    checked />
                                <label for="auto-renew"
                                    class="toggle-label block overflow-hidden h-6 rounded-full bg-blue-200 cursor-pointer"></label>
                            </div>
                        </div>

                        <div>
                            <p class="font-medium mb-2">Billing Cycle</p>
                            <div class="flex space-x-2">
                                <button
                                    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                    Monthly
                                </button>
                                <button
                                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                                    Yearly (Save 20%)
                                </button>
                            </div>
                        </div>

                        <div class="pt-4 border-t border-gray-100">
                            <button
                                class="w-full px-4 py-2 text-sm font-medium text-red-600 bg-white rounded-lg border border-red-200 hover:bg-red-50">
                                Cancel Subscription
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DashboardAdminLayout>
</template>