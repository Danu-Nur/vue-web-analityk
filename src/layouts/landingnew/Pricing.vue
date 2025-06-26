<script setup>
import { ref } from 'vue';
const isMonthly = ref(true);
const activeClass = 'bg-white text-gray-900 shadow-md';
const inActiveClass = 'text-gray-600';

const togglePricing = () => {
    isMonthly.value = !isMonthly.value;
}
</script>
<template>
    <!-- Pricing Section -->
    <section id="pricing" class="pricing-gradient pricing-pattern py-10 ">
        <div class="container max-w-6xl mx-auto px-6 py-20">
            <div class="max-w-2xl mx-auto text-center mb-12 drop-shadow-lg">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
                <p class="text-gray-600">Start with our free plan and upgrade as your needs grow.</p>
            </div>

            <div class="flex justify-center mb-12">
                <div class="inline-flex bg-gray-200 rounded-full p-1">
                    <button aria-pressed="true" type="button" id="monthly-toggle" @click="togglePricing"
                        :class="isMonthly ? activeClass : inActiveClass"
                        class="relative inline-flex items-center px-6 py-2 rounded-full font-semibold focus:outline-none">
                        Monthly
                    </button>
                    <button aria-pressed="true" type="button" id="yearly-toggle" @click="togglePricing"
                        :class="!isMonthly ? activeClass : inActiveClass"
                        class="-ml-px relative inline-flex items-center px-6 py-2 rounded-full font-semibold text-gray-600 hover:text-gray-900 focus:outline-none">
                        Yearly <span class="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Save
                            20%</span>
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Basic Plan -->
                <div class="bg-white shadow-sm rounded-xl hover-glow transition-all">
                    <div class="h-full p-8 shadow-lg rounded-xl  lg:shadow-xl">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Free</h3>
                        <p class="text-gray-600 mb-6">Perfect for personal websites and small projects</p>
                        <div class="mb-6">
                            <span class="text-4xl font-bold text-gray-900">$0</span>
                            <span class="text-gray-500">/month</span>
                        </div>
                        <button
                            class="w-full py-3 border border-gray-200 rounded-lg mb-8 hover:bg-gray-50 transition-all">
                            Get Started
                        </button>
                        <ul class="space-y-3 mb-8">
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">Up to 5,000 page views/month</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">Basic analytics dashboard</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">1 website</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">30-day data retention</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Popular Plan -->
                <div
                    class="bg-white shadow-sm rounded-xl border-2 border-indigo-300 relative hover-glow transition-all transform scale-105">
                    <div class=" h-full rounded-xl p-8 shadow-lg lg:shadow-xl">
                        <div
                            class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            MOST POPULAR
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
                        <p class="text-gray-600 mb-6">For growing businesses and professional websites</p>
                        <div class="mb-6">
                            <span v-if="isMonthly" class="text-4xl font-bold text-gray-900 monthly-price">$19</span>
                            <span v-else class="text-4xl font-bold text-gray-900 yearly-price">$15</span>
                            <span class="text-gray-500">/month</span>
                        </div>
                        <button
                            class="w-full py-3 bg-indigo-500 text-white rounded-lg mb-8 hover:bg-indigo-600 transition-all">
                            Start 14-Day Free Trial
                        </button>
                        <ul class="space-y-3 mb-8">
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">Up to 50,000 page views/month</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">Advanced analytics dashboard</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">Up to 5 websites</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">6-month data retention</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">Heatmaps & session recordings</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Enterprise Plan -->
                <div class="bg-white shadow-sm rounded-xl hover-glow transition-all">
                    <div class="shadow-xl  p-8 lg:shadow-xl ">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Business</h3>
                        <p class="text-gray-600 mb-6">For agencies and high-traffic websites</p>
                        <div class="mb-6">
                            <span v-if="isMonthly" class="text-4xl font-bold text-gray-900 monthly-price">$99</span>
                            <span v-else class="text-4xl font-bold text-gray-900 yearly-price">$79</span>
                            <span class="text-gray-500">/month</span>
                        </div>
                        <button
                            class="w-full py-3 border border-gray-200 rounded-lg mb-8 hover:bg-gray-50 transition-all">
                            Contact Sales
                        </button>
                        <ul class="space-y-3 mb-8">
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">Up to 500,000 pageviews/month</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">All Pro features plus:</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">Unlimited websites</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">2-year data retention</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">Priority support</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-600">Custom reports</span>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
            <div class="mt-12 text-center  drop-shadow-lg">
                <p class="text-gray-600">Need more? We offer custom enterprise plans for high-volume needs.</p>
                <a href="#" class="inline-flex items-center text-blue-600 hover:text-blue-800 mt-2">
                    Contact our sales team
                    <svg class="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </a>
            </div>
        </div>
    </section>

</template>