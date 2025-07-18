<script setup>
// import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
import { errorLogs, botTable, humanVsBot, jsErrorRate, pageLoadTable, monthHumanBot } from '../../../../dummydata/pages5/dataPages5';
const DataTable = defineAsyncComponent(() => import('../../../../components/datatables/DataTable.vue'))
// Importing the PieChart component asynchronously
const PieChart = defineAsyncComponent(() =>
    import('../../../../components/apexchart/PieChart.vue')
)

// Importing the LineChart component asynchronously
const LineChart = defineAsyncComponent(() =>
    import('../../../../components/apexchart/AreaChart.vue')
)
import SkeletonTable from '../../../../components/skeleton/SkeletonTable.vue';
import { defineAsyncComponent } from 'vue';
</script>
<template>
    <!-- <DashboardAdminLayout> -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

            <!-- 1. Integration Warnings -->
            <section class="border border-gray-200 rounded-lg bg-white p-4 col-span-1 lg:col-span-1 flex flex-col">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">⚠️ Integration Warnings</h2>
                    <button aria-label="Filter warnings"
                        class="text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 rounded">
                        <i class="fas fa-filter"></i>
                    </button>
                </div>
                <div class="flex space-x-3 mb-4">
                    <button data-filter="all"
                        class="filter-btn bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">All</button>
                    <button data-filter="missing"
                        class="filter-btn bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">Missing
                        Pageviews</button>
                    <button data-filter="invalid"
                        class="filter-btn bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">Invalid
                        Keys</button>
                </div>
                <ul class="space-y-3 overflow-y-auto max-h-[290px] pr-2">
                    <li data-type="missing"
                        class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div>
                            <p class="font-medium text-gray-900">Missing pageview event on /checkout</p>
                            <p class="text-sm text-gray-500">tracking_sessions</p>
                        </div>
                        <span
                            class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-2 py-0.5 text-xs font-semibold">Warning</span>
                    </li>
                    <li data-type="invalid"
                        class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div>
                            <p class="font-medium text-gray-900">Invalid API key detected</p>
                            <p class="text-sm text-gray-500">api_keys</p>
                        </div>
                        <span
                            class="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-xs font-semibold">Error</span>
                    </li>
                    <li data-type="missing"
                        class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div>
                            <p class="font-medium text-gray-900">Missing pageview event on /pricing</p>
                            <p class="text-sm text-gray-500">tracking_sessions</p>
                        </div>
                        <span
                            class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-2 py-0.5 text-xs font-semibold">Warning</span>
                    </li>
                    <li data-type="invalid"
                        class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div>
                            <p class="font-medium text-gray-900">Invalid API key format</p>
                            <p class="text-sm text-gray-500">api_keys</p>
                        </div>
                        <span
                            class="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-xs font-semibold">Error</span>
                    </li>
                    <li data-type="missing"
                        class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div>
                            <p class="font-medium text-gray-900">Missing pageview event on /signup</p>
                            <p class="text-sm text-gray-500">tracking_sessions</p>
                        </div>
                        <span
                            class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-2 py-0.5 text-xs font-semibold">Warning</span>
                    </li>
                </ul>
            </section>

            <!-- 2. Bot Detection Logs -->
            <section class="border border-gray-200 rounded-lg bg-white p-4 col-span-1 lg:col-span-1 flex flex-col">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">🧠 Bot Detection Logs</h2>
                    <button aria-label="Filter bot logs"
                        class="text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 rounded">
                        <i class="fas fa-filter"></i>
                    </button>
                </div>
                <div class="overflow-y-auto max-h-64">
                    <table class="w-full text-left text-sm text-gray-700">
                        <thead class="border-b border-gray-300">
                            <tr>
                                <th class="py-2 px-3 font-medium">User-Agent</th>
                                <th class="py-2 px-3 font-medium hidden sm:table-cell">Country</th>
                                <th class="py-2 px-3 font-medium">Time</th>
                                <th class="py-2 px-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-200 hover:bg-gray-50">
                                <td class="py-2 px-3 truncate max-w-[150px]"
                                    title="Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)">
                                    Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)</td>
                                <td class="py-2 px-3 hidden sm:table-cell">US</td>
                                <td class="py-2 px-3">2024-06-15 14:23:11</td>
                                <td class="py-2 px-3"><span
                                        class="inline-flex items-center rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold">Detected</span>
                                </td>
                            </tr>
                            <tr class="border-b border-gray-200 hover:bg-gray-50">
                                <td class="py-2 px-3 truncate max-w-[150px]"
                                    title="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/90.0.4430.93">
                                    Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/90.0.4430.93
                                </td>
                                <td class="py-2 px-3 hidden sm:table-cell">DE</td>
                                <td class="py-2 px-3">2024-06-15 14:22:45</td>
                                <td class="py-2 px-3"><span
                                        class="inline-flex items-center rounded-full bg-gray-100 text-gray-500 px-2 py-0.5 text-xs font-semibold">Not
                                        Bot</span></td>
                            </tr>
                            <tr class="border-b border-gray-200 hover:bg-gray-50">
                                <td class="py-2 px-3 truncate max-w-[150px]" title="curl/7.64.1">curl/7.64.1</td>
                                <td class="py-2 px-3 hidden sm:table-cell">FR</td>
                                <td class="py-2 px-3">2024-06-15 14:21:59</td>
                                <td class="py-2 px-3"><span
                                        class="inline-flex items-center rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold">Detected</span>
                                </td>
                            </tr>
                            <tr class="border-b border-gray-200 hover:bg-gray-50">
                                <td class="py-2 px-3 truncate max-w-[150px]"
                                    title="Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)">
                                    Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)</td>
                                <td class="py-2 px-3 hidden sm:table-cell">GB</td>
                                <td class="py-2 px-3">2024-06-15 14:20:33</td>
                                <td class="py-2 px-3"><span
                                        class="inline-flex items-center rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold">Detected</span>
                                </td>
                            </tr>
                            <tr class="border-b border-gray-200 hover:bg-gray-50">
                                <td class="py-2 px-3 truncate max-w-[150px]"
                                    title="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15">
                                    Mozilla/5.0
                                    (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15</td>
                                <td class="py-2 px-3 hidden sm:table-cell">US</td>
                                <td class="py-2 px-3">2024-06-15 14:19:58</td>
                                <td class="py-2 px-3"><span
                                        class="inline-flex items-center rounded-full bg-gray-100 text-gray-500 px-2 py-0.5 text-xs font-semibold">Not
                                        Bot</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- Tracking Session Health -->
            <section class="border border-gray-200 rounded-lg bg-white p-4 col-span-1">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="font-semibold text-lg flex items-center">
                        <span class="mr-2">🧪</span> Session Health
                    </h2>
                    <span class="text-xs text-gray-500">Last 15 min</span>
                </div>
                <div class="grid grid-cols-3 gap-2 mb-4">
                    <div class="bg-gray-50 p-2 rounded text-center">
                        <div class="text-2xl font-bold">142</div>
                        <div class="text-xs text-gray-500">Active</div>
                    </div>
                    <div class="bg-gray-50 p-2 rounded text-center">
                        <div class="text-2xl font-bold">8</div>
                        <div class="text-xs text-gray-500">Suspicious</div>
                    </div>
                    <div class="bg-gray-50 p-2 rounded text-center">
                        <div class="text-2xl font-bold">3</div>
                        <div class="text-xs text-gray-500">Invalid</div>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center justify-between text-sm">
                        <span>US Chrome Desktop</span>
                        <span class="font-medium">68</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                        <span>UK Safari Mobile</span>
                        <span class="font-medium">42</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                        <span>DE Firefox Desktop</span>
                        <span class="font-medium">19</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                        <span>FR Edge Desktop</span>
                        <span class="font-medium">13</span>
                    </div>
                </div>
            </section>

            <section aria-label="Overview chart"
                class="border border-gray-200 xl:col-span-3 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Bot vs Human Traffic</h2>
                <Suspense>
                    <template #default>
                        <LineChart :title="humanVsBot.title" :categories="humanVsBot.categories"
                            :seriesData="humanVsBot.seriesData" :height="400"/>
                    </template>
                    <template #fallback>
                        <SkeletonChart chartType="bar" />
                    </template>
                </Suspense>
            </section>

            <!-- 3. Live Event Monitor -->
            <section class="border border-gray-200 rounded-lg bg-white p-4 col-span-1 lg:col-span-2 flex flex-col">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">🧪 Live Event Monitor</h2>
                    <div class="flex items-center space-x-3">
                        <button data-filter="all"
                            class="live-filter-btn bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">All</button>
                        <button data-filter="pageview"
                            class="live-filter-btn bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">Page
                            Views</button>
                        <button data-filter="custom"
                            class="live-filter-btn bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">Custom
                            Events</button>
                    </div>
                </div>
                <div
                    class="overflow-y-auto max-h-72 border border-gray-200 rounded-lg bg-gray-50 p-3 font-mono text-xs text-gray-800">
                    <ul id="live-event-list" class="space-y-1">
                        <li data-type="pageview" class="px-2 py-1 rounded bg-white shadow-sm border border-gray-200">
                            <time class="text-gray-400 mr-2">14:23:15</time> Pageview: <span
                                class="font-semibold">/home</span> from
                            <span class="italic">192.168.1.10</span>
                        </li>
                        <li data-type="custom" class="px-2 py-1 rounded bg-white shadow-sm border border-gray-200">
                            <time class="text-gray-400 mr-2">14:23:12</time> Event: <span
                                class="font-semibold">button_click</span>
                            on <span class="italic">signup_form</span>
                        </li>
                        <li data-type="pageview" class="px-2 py-1 rounded bg-white shadow-sm border border-gray-200">
                            <time class="text-gray-400 mr-2">14:23:10</time> Pageview: <span
                                class="font-semibold">/pricing</span>
                            from <span class="italic">192.168.1.11</span>
                        </li>
                        <li data-type="custom" class="px-2 py-1 rounded bg-white shadow-sm border border-gray-200">
                            <time class="text-gray-400 mr-2">14:23:08</time> Event: <span
                                class="font-semibold">form_submit</span>
                            on <span class="italic">contact_us</span>
                        </li>
                        <li data-type="pageview" class="px-2 py-1 rounded bg-white shadow-sm border border-gray-200">
                            <time class="text-gray-400 mr-2">14:23:05</time> Pageview: <span
                                class="font-semibold">/blog/post-123</span> from <span
                                class="italic">192.168.1.12</span>
                        </li>
                        <li data-type="custom" class="px-2 py-1 rounded bg-white shadow-sm border border-gray-200">
                            <time class="text-gray-400 mr-2">14:23:02</time> Event: <span
                                class="font-semibold">video_play</span> on
                            <span class="italic">homepage_video</span>
                        </li>
                        <li data-type="pageview" class="px-2 py-1 rounded bg-white shadow-sm border border-gray-200">
                            <time class="text-gray-400 mr-2">14:22:59</time> Pageview: <span
                                class="font-semibold">/features</span>
                            from <span class="italic">192.168.1.13</span>
                        </li>
                        <li data-type="custom" class="px-2 py-1 rounded bg-white shadow-sm border border-gray-200">
                            <time class="text-gray-400 mr-2">14:22:55</time> Event: <span
                                class="font-semibold">scroll_depth</span>
                            50% on <span class="italic">blog/post-123</span>
                        </li>
                        <li data-type="pageview" class="px-2 py-1 rounded bg-white shadow-sm border border-gray-200">
                            <time class="text-gray-400 mr-2">14:22:52</time> Pageview: <span
                                class="font-semibold">/contact</span>
                            from <span class="italic">192.168.1.14</span>
                        </li>
                        <li data-type="custom" class="px-2 py-1 rounded bg-white shadow-sm border border-gray-200">
                            <time class="text-gray-400 mr-2">14:22:50</time> Event: <span
                                class="font-semibold">link_click</span> on
                            <span class="italic">footer_link</span>
                        </li>
                    </ul>
                </div>
            </section>

            <!-- 4. Tracking Script Status -->
            <section class="border border-gray-200 rounded-lg bg-white p-4 col-span-1 lg:col-span-1 flex flex-col">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">🛠️ Tracking Script Status</h2>
                    <button aria-label="Refresh script status" id="refresh-script-status"
                        class="text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 rounded">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
                <ul class="space-y-3 overflow-y-auto max-h-[290px] pr-2">
                    <li class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div>
                            <p class="font-medium text-gray-900 truncate max-w-[180px]" title="example.com">example.com
                            </p>
                            <p class="text-sm text-gray-500">Last loaded: 2024-06-15 14:20:00</p>
                        </div>
                        <span
                            class="inline-flex items-center rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold">OK</span>
                    </li>
                    <li class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div>
                            <p class="font-medium text-gray-900 truncate max-w-[180px]" title="shop.example.com">
                                shop.example.com</p>
                            <p class="text-sm text-gray-500">Last loaded: 2024-06-15 14:18:45</p>
                        </div>
                        <span
                            class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-2 py-0.5 text-xs font-semibold">Warning</span>
                    </li>
                    <li class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div>
                            <p class="font-medium text-gray-900 truncate max-w-[180px]" title="blog.example.com">
                                blog.example.com</p>
                            <p class="text-sm text-gray-500">Last loaded: 2024-06-15 13:50:12</p>
                        </div>
                        <span
                            class="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-xs font-semibold">Error</span>
                    </li>
                    <li class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div>
                            <p class="font-medium text-gray-900 truncate max-w-[180px]" title="app.example.net">
                                app.example.net</p>
                            <p class="text-sm text-gray-500">Last loaded: 2024-06-15 14:19:30</p>
                        </div>
                        <span
                            class="inline-flex items-center rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold">OK</span>
                    </li>
                    <li class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div>
                            <p class="font-medium text-gray-900 truncate max-w-[180px]" title="dev.example.org">
                                dev.example.org</p>
                            <p class="text-sm text-gray-500">Last loaded: 2024-06-15 14:10:05</p>
                        </div>
                        <span
                            class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-2 py-0.5 text-xs font-semibold">Warning</span>
                    </li>
                </ul>
            </section>

            <!-- 5. Client-side JS Errors -->
            <section class="border border-gray-200 rounded-lg bg-white p-4 col-span-1 lg:col-span-2 flex flex-col">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">❌ Client-side JS Errors</h2>
                    <button aria-label="Filter errors"
                        class="text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 rounded">
                        <i class="fas fa-filter"></i>
                    </button>
                </div>
                <div
                    class="overflow-y-auto max-h-72 border border-gray-200 rounded-lg bg-gray-50 p-3 font-mono text-xs text-gray-800">
                    <ul class="space-y-2">
                        <li class="bg-white border border-gray-200 rounded p-3 shadow-sm">
                            <div class="flex justify-between items-center mb-1">
                                <span class="font-semibold text-red-700">TypeError</span>
                                <time class="text-gray-400 text-xs">2024-06-15 14:22:10</time>
                            </div>
                            <pre class="whitespace-pre-wrap break-words bg-gray-100 p-2 rounded text-xs">Cannot read property
                    'length' of undefined at analytics.js:45:12</pre>
                        </li>
                        <li class="bg-white border border-gray-200 rounded p-3 shadow-sm">
                            <div class="flex justify-between items-center mb-1">
                                <span class="font-semibold text-red-700">ReferenceError</span>
                                <time class="text-gray-400 text-xs">2024-06-15 14:21:55</time>
                            </div>
                            <pre class="whitespace-pre-wrap break-words bg-gray-100 p-2 rounded text-xs">eventData is not defined at
                    tracker.js:78:5</pre>
                        </li>
                        <li class="bg-white border border-gray-200 rounded p-3 shadow-sm">
                            <div class="flex justify-between items-center mb-1">
                                <span class="font-semibold text-red-700">SyntaxError</span>
                                <time class="text-gray-400 text-xs">2024-06-15 14:20:40</time>
                            </div>
                            <pre class="whitespace-pre-wrap break-words bg-gray-100 p-2 rounded text-xs">Unexpected token '<' in
                        JSON at position 0 at parser.js:12:3</pre>
                        </li>
                        <li class="bg-white border border-gray-200 rounded p-3 shadow-sm">
                            <div class="flex justify-between items-center mb-1">
                                <span class="font-semibold text-red-700">TypeError</span>
                                <time class="text-gray-400 text-xs">2024-06-15 14:19:30</time>
                            </div>
                            <pre class="whitespace-pre-wrap break-words bg-gray-100 p-2 rounded text-xs">Cannot read property 'push'
                    of null at events.js:33:10</pre>
                        </li>
                        <li class="bg-white border border-gray-200 rounded p-3 shadow-sm">
                            <div class="flex justify-between items-center mb-1">
                                <span class="font-semibold text-red-700">RangeError</span>
                                <time class="text-gray-400 text-xs">2024-06-15 14:18:15</time>
                            </div>
                            <pre class="whitespace-pre-wrap break-words bg-gray-100 p-2 rounded text-xs">Maximum call stack size
                    exceeded at recursive.js:22:7</pre>
                        </li>
                    </ul>
                </div>
            </section>

            <!-- 6. Unverified Domains -->
            <section class="border border-gray-200 rounded-lg bg-white p-4 col-span-1 lg:col-span-1 flex flex-col">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">🔍 Unverified Domains</h2>
                    <button aria-label="Refresh unverified domains" id="refresh-unverified"
                        class="text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 rounded">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
                <ul class="space-y-3 overflow-y-auto max-h-[290px] pr-2">
                    <li class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <p class="font-medium text-gray-900 truncate max-w-[180px]" title="unknown-domain.com">
                            unknown-domain.com</p>
                        <span
                            class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-2 py-0.5 text-xs font-semibold">Unverified</span>
                    </li>
                    <li class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <p class="font-medium text-gray-900 truncate max-w-[180px]" title="malicious-site.net">
                            malicious-site.net</p>
                        <span
                            class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-2 py-0.5 text-xs font-semibold">Unverified</span>
                    </li>
                    <li class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <p class="font-medium text-gray-900 truncate max-w-[180px]" title="randomtracker.org">
                            randomtracker.org</p>
                        <span
                            class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-2 py-0.5 text-xs font-semibold">Unverified</span>
                    </li>
                    <li class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <p class="font-medium text-gray-900 truncate max-w-[180px]" title="unknown123.io">unknown123.io
                        </p>
                        <span
                            class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-2 py-0.5 text-xs font-semibold">Unverified</span>
                    </li>
                    <li class="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <p class="font-medium text-gray-900 truncate max-w-[180px]" title="tracker-bot.com">
                            tracker-bot.com
                        </p>
                        <span
                            class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-2 py-0.5 text-xs font-semibold">Unverified</span>
                    </li>
                </ul>
            </section>

            <!-- 7. Data Flow Health -->
            <section class="border border-gray-200 rounded-lg bg-white p-4 col-span-1 lg:col-span-2 flex flex-col">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">🔁 Retry Queue & Failed Events</h2>
                    <button aria-label="Refresh retry queue" id="refresh-retry"
                        class="text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 rounded">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table
                        class="w-full text-left text-sm text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
                        <thead class="bg-gray-100 border-b border-gray-300">
                            <tr>
                                <th class="py-3 px-4 font-medium">Event ID</th>
                                <th class="py-3 px-4 font-medium">Type</th>
                                <th class="py-3 px-4 font-medium">Last Attempt</th>
                                <th class="py-3 px-4 font-medium">Error Message</th>
                                <th class="py-3 px-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-200 hover:bg-gray-50">
                                <td class="py-2 px-4 font-mono truncate max-w-[120px]" title="evt_00123">evt_00123</td>
                                <td class="py-2 px-4">page_view</td>
                                <td class="py-2 px-4">2024-06-15 14:15:00</td>
                                <td class="py-2 px-4 truncate max-w-[250px]" title="Timeout while sending batch">Timeout
                                    while sending batch</td>
                                <td class="py-2 px-4"><span
                                        class="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-xs font-semibold">Failed</span>
                                </td>
                            </tr>
                            <tr class="border-b border-gray-200 hover:bg-gray-50">
                                <td class="py-2 px-4 font-mono truncate max-w-[120px]" title="evt_00124">evt_00124</td>
                                <td class="py-2 px-4">custom_event</td>
                                <td class="py-2 px-4">2024-06-15 14:14:30</td>
                                <td class="py-2 px-4 truncate max-w-[250px]" title="Network error">Network error</td>
                                <td class="py-2 px-4"><span
                                        class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-2 py-0.5 text-xs font-semibold">Retrying</span>
                                </td>
                            </tr>
                            <tr class="border-b border-gray-200 hover:bg-gray-50">
                                <td class="py-2 px-4 font-mono truncate max-w-[120px]" title="evt_00125">evt_00125</td>
                                <td class="py-2 px-4">page_view</td>
                                <td class="py-2 px-4">2024-06-15 14:13:50</td>
                                <td class="py-2 px-4 truncate max-w-[250px]" title="Server 500 error">Server 500 error
                                </td>
                                <td class="py-2 px-4"><span
                                        class="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-xs font-semibold">Failed</span>
                                </td>
                            </tr>
                            <tr class="border-b border-gray-200 hover:bg-gray-50">
                                <td class="py-2 px-4 font-mono truncate max-w-[120px]" title="evt_00126">evt_00126</td>
                                <td class="py-2 px-4">custom_event</td>
                                <td class="py-2 px-4">2024-06-15 14:12:40</td>
                                <td class="py-2 px-4 truncate max-w-[250px]" title="Timeout while sending batch">Timeout
                                    while sending batch</td>
                                <td class="py-2 px-4"><span
                                        class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-2 py-0.5 text-xs font-semibold">Retrying</span>
                                </td>
                            </tr>
                            <tr class="border-b border-gray-200 hover:bg-gray-50">
                                <td class="py-2 px-4 font-mono truncate max-w-[120px]" title="evt_00127">evt_00127</td>
                                <td class="py-2 px-4">page_view</td>
                                <td class="py-2 px-4">2024-06-15 14:11:30</td>
                                <td class="py-2 px-4 truncate max-w-[250px]" title="Network error">Network error</td>
                                <td class="py-2 px-4"><span
                                        class="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-xs font-semibold">Failed</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 8. Raw Payload Inspector -->
            <section class="border border-gray-200 rounded-lg bg-white p-4 col-span-1 lg:col-span-1 flex flex-col">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">📦 Raw Payload Inspector</h2>
                    <button aria-label="Copy JSON" id="copy-payload"
                        class="text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 rounded">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
                <pre class="bg-gray-100 rounded-lg p-4 overflow-auto max-h-[290px] text-xs font-mono text-gray-800"
                    id="payload-json" tabindex="0" aria-label="Recent incoming JSON payload preview">
        {
        "event": "page_view",
        "timestamp": "2024-06-15T14:23:15Z",
        "user": {
        "id": "user_12345",
        "ip": "192.168.1.10",
        "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        },
        "page": {
        "url": "https://example.com/home",
        "referrer": "https://google.com"
        },
        "properties": {
        "session_id": "sess_67890",
        "campaign": "summer_sale"
        }
        }
    </pre>
            </section>

        </div>
        <!-- <section aria-label="Main content"
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
        </section> -->
        <!-- 
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
        </section> -->
    <!-- </DashboardAdminLayout> -->
</template>