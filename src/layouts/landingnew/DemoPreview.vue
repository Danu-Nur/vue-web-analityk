<script setup></script>
<template>
    <!-- Live Preview Section -->
    <section id="demo" class="preview-gradient py-10">
        <div class="container mx-auto px-6 py-20">
            <div class="flex flex-col lg:flex-row items-center gap-12">
                <div class="lg:w-1/2 fade-up">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 drop-shadow-lg">See exactly what's
                        happening on your site</h2>
                    <p class="text-gray-600 mb-8 drop-shadow-lg">
                        Our live demo shows you the power of TrafficVerse in action.
                        Watch as visitors interact with your site in real-time, without compromising their privacy.
                    </p>
                    <ul class="space-y-4 drop-shadow-lg">
                        <li class="flex items-start">
                            <div class="flex-shrink-0 mt-1">
                                <div class="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <svg class="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                </div>
                            </div>
                            <p class="ml-3 text-gray-700">Real-time visitor tracking with country and device
                                details</p>
                        </li>
                        <li class="flex items-start">
                            <div class="flex-shrink-0 mt-1">
                                <div class="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <svg class="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                </div>
                            </div>
                            <p class="ml-3 text-gray-700">Detailed page analytics showing top-performing content</p>
                        </li>
                        <li class="flex items-start">
                            <div class="flex-shrink-0 mt-1">
                                <div class="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <svg class="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                </div>
                            </div>
                            <p class="ml-3 text-gray-700">Customizable dashboards to focus on metrics that matter to
                                you</p>
                        </li>
                    </ul>
                    <div class="mt-8">
                        <a href="#pricing"
                            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-blue-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Start Your Free Trial
                            <svg class="ml-3 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="lg:w-1/2 relative floating shadow-xl fade-up">
                    <div class="dashboard-preview bg-gray-800 rounded-xl overflow-hidden">
                        <div class="bg-gray-900 h-10 flex items-center px-4">
                            <div class="flex space-x-2">
                                <div class="w-3 h-3 rounded-full bg-red-400"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div class="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div class="ml-4 text-sm text-gray-400">demo.TrafficVerse.com</div>
                        </div>
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-6">
                                <h3 class="text-xl font-medium text-white">Live Dashboard</h3>
                                <div class="flex space-x-2">
                                    <span class="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded">Today</span>
                                    <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">Last 30 min</span>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div class="bg-gray-700 p-3 rounded-lg">
                                    <p class="text-xs text-gray-400">Visitors</p>
                                    <p class="text-xl font-bold text-white">42</p>
                                </div>
                                <div class="bg-gray-700 p-3 rounded-lg">
                                    <p class="text-xs text-gray-400">Pageviews</p>
                                    <p class="text-xl font-bold text-white">127</p>
                                </div>
                                <div class="bg-gray-700 p-3 rounded-lg">
                                    <p class="text-xs text-gray-400">Avg. Duration</p>
                                    <p class="text-xl font-bold text-white">2:34</p>
                                </div>
                                <div class="bg-gray-700 p-3 rounded-lg">
                                    <p class="text-xs text-gray-400">Bounce Rate</p>
                                    <p class="text-xl font-bold text-white">31%</p>
                                </div>
                            </div>

                            <div class="h-48 bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
                                <p class="text-gray-500">Live visitors chart</p>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 class="text-sm font-medium text-white mb-2">Top Pages</h4>
                                    <div class="bg-gray-700 rounded-lg p-3">
                                        <div class="flex justify-between text-sm text-gray-300 mb-2">
                                            <span>/home</span>
                                            <span>42 views</span>
                                        </div>
                                        <div class="flex justify-between text-sm text-gray-300 mb-2">
                                            <span>/pricing</span>
                                            <span>28 views</span>
                                        </div>
                                        <div class="flex justify-between text-sm text-gray-300">
                                            <span>/blog</span>
                                            <span>19 views</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 class="text-sm font-medium text-white mb-2">Referrers</h4>
                                    <div class="bg-gray-700 rounded-lg p-3">
                                        <div class="flex justify-between text-sm text-gray-300 mb-2">
                                            <span>Direct</span>
                                            <span>24 visits</span>
                                        </div>
                                        <div class="flex justify-between text-sm text-gray-300 mb-2">
                                            <span>Google</span>
                                            <span>12 visits</span>
                                        </div>
                                        <div class="flex justify-between text-sm text-gray-300">
                                            <span>Twitter</span>
                                            <span>6 visits</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>