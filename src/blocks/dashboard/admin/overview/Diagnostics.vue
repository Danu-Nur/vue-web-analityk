<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent, computed } from 'vue';
import { useDiagnosticsStore } from '../../../../store/admin/diagnosticsStore';

// --- Komponen & Store ---
const DataTable = defineAsyncComponent(() => import('../../../../components/datatables/DataTable.vue'));
const PieChart = defineAsyncComponent(() => import('../../../../components/apexchart/PieChart.vue'));
const LineChart = defineAsyncComponent(() => import('../../../../components/apexchart/AreaChart.vue'));
import SkeletonTable from '../../../../components/skeleton/SkeletonTable.vue';

const diagnosticsStore = useDiagnosticsStore();
const isLoading = computed(() => diagnosticsStore.loading);
const error = computed(() => diagnosticsStore.error);

// --- Logika untuk Scroll Load More ---

// Ref untuk setiap elemen daftar yang bisa di-scroll
const botLogsListEl = ref(null);
const clientErrorsListEl = ref(null);
const failedJobsListEl = ref(null);

/**
 * Fungsi reusable untuk membuat event handler scroll.
 * @param {ref} listRef - Ref ke elemen DOM yang di-scroll.
 * @param {string} stateKey - Nama state di store (misal: 'botLogs').
 * @param {string} fetchAction - Nama action di store untuk mengambil data.
 * @returns {ref} - Ref boolean untuk status loading.
 */
const createScrollHandler = (listRef, stateKey, fetchAction) => {
    const isLoadingMore = ref(false);
    const handleScroll = async () => {
        const el = listRef.value;
        if (!el) return;

        const state = diagnosticsStore[stateKey];
        const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20; // -20px buffer

        if (isAtBottom && !isLoadingMore.value && state.hasMore) {
            isLoadingMore.value = true;
            await diagnosticsStore[fetchAction](true); // Panggil action dengan flag loadMore
            isLoadingMore.value = false;
        }
    };

    onMounted(() => listRef.value?.addEventListener('scroll', handleScroll));
    onUnmounted(() => listRef.value?.removeEventListener('scroll', handleScroll));

    return isLoadingMore;
};

// Buat instance scroll handler untuk setiap komponen
const isLoadingBotLogs = createScrollHandler(botLogsListEl, 'botLogs', 'fetchBotDetectionLogs');
const isLoadingErrors = createScrollHandler(clientErrorsListEl, 'clientErrors', 'fetchClientSideErrors');
const isLoadingJobs = createScrollHandler(failedJobsListEl, 'failedJobs', 'fetchFailedJobs');


// Ambil semua data saat komponen pertama kali dimuat
onMounted(() => {
    diagnosticsStore.fetchAllDiagnostics();
});
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

        <section class="card-new rounded-lg bg-white p-4 col-span-1 lg:col-span-2 flex flex-col">
            <h2 class="text-xl font-semibold">⚠️ Integration Warnings</h2>
            <ul class="space-y-3 overflow-y-auto max-h-[290px] pr-2">
                <li v-if="!isLoading && !diagnosticsStore.integrationWarnings.length" class="text-gray-500">
                    No integration warnings. System looks healthy.
                </li>
                <li v-for="(warning, index) in diagnosticsStore.integrationWarnings" :key="index"
                    class="flex justify-between items-center p-3 rounded-lg bg-gray-50 card-new">
                    <div>
                        <p class="font-medium text-gray-900">{{ warning.message }}</p>
                        <p class="text-sm text-gray-500">{{ warning.source_table }}</p>
                    </div>
                    <span :class="{
                        'bg-yellow-100 text-yellow-700': warning.severity === 'Warning',
                        'bg-red-100 text-red-700': warning.severity === 'Error'
                    }" class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold">
                        {{ warning.severity }}
                    </span>
                </li>
            </ul>
        </section>

        <section class="card-new rounded-lg bg-white p-4 col-span-1 lg:col-span-1 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold">🧠 Bot Detection Logs</h2>
            </div>
            <div ref="botLogsListEl" class="overflow-y-auto max-h-64">
                <table class="w-full text-left text-sm text-gray-700">
                    <tbody>
                        <tr v-if="!isLoading && !diagnosticsStore.botLogs.length">
                            <td colspan="4" class="text-center py-4 text-gray-500">No bot logs found.</td>
                        </tr>
                        <tr v-for="(log, index) in diagnosticsStore.botLogs" :key="index"
                            class="border-b border-gray-200 hover:bg-gray-50">
                            <td class="py-2 px-3 truncate max-w-[150px]" :title="log.user_agent">{{ log.user_agent }}
                            </td>
                            <td class="py-2 px-3 hidden sm:table-cell">{{ log.country }}</td>
                            <td class="py-2 px-3">{{ log.time }}</td>
                            <td class="py-2 px-3">
                                <span
                                    :class="log.status === 'Detected' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                                    class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold">
                                    {{ log.status }}
                                </span>
                            </td>
                        </tr>
                        <tr v-if="isLoadingBotLogs">
                            <td colspan="4" class="text-center py-2 text-gray-500 text-xs">Loading more...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- <section class="card-new rounded-lg bg-white p-4 col-span-1">
            <div class="flex items-center justify-between mb-4">
                <h2 class="font-semibold text-lg flex items-center">
                    <span class="mr-2">🧪</span> Session Health
                </h2>
            </div>
            <div class="grid grid-cols-3 gap-2 mb-4">
                <div class="bg-gray-50 p-2 rounded text-center">
                    <div class="text-2xl font-bold">{{ diagnosticsStore.sessionHealth.counts.active }}</div>
                    <div class="text-xs text-gray-500">Active</div>
                </div>
                <div class="bg-gray-50 p-2 rounded text-center">
                    <div class="text-2xl font-bold">{{ diagnosticsStore.sessionHealth.counts.suspicious }}</div>
                    <div class="text-xs text-gray-500">Suspicious</div>
                </div>
                <div class="bg-gray-50 p-2 rounded text-center">
                    <div class="text-2xl font-bold">{{ diagnosticsStore.sessionHealth.counts.invalid }}</div>
                    <div class="text-xs text-gray-500">Invalid</div>
                </div>
            </div>
            <div class="space-y-2">
                <div v-if="!isLoading && !diagnosticsStore.sessionHealth.top_sources.length"
                    class="text-sm text-gray-500">
                    Awaiting session data...
                </div>
                <div v-for="(source, index) in diagnosticsStore.sessionHealth.top_sources" :key="index"
                    class="flex items-center justify-between text-sm">
                    <span>{{ source.name }}</span>
                    <span class="font-medium">{{ source.count }}</span>
                </div>
            </div>
        </section> -->

        <section aria-label="Overview chart" class="card-new xl:col-span-3 rounded-lg p-4 flex flex-col">
            <h2 class="font-semibold text-gray-900 mb-4">Bot vs Human Traffic</h2>
            <Suspense>
                <template #default>
                    <LineChart :title="diagnosticsStore.botVsHumanTraffic.title"
                        :categories="diagnosticsStore.botVsHumanTraffic.categories"
                        :seriesData="diagnosticsStore.botVsHumanTraffic.seriesData" :height="400" />
                </template>
                <template #fallback>
                    <div class="w-full h-[400px] bg-gray-200 rounded animate-pulse"></div>
                </template>
            </Suspense>
        </section>

        <section class="card-new rounded-lg bg-white p-4 col-span-1 lg:col-span-3 flex flex-col">
            <h2 class="text-xl font-semibold">🧪 Live Event Monitor</h2>
            <div class="overflow-y-auto max-h-72 card-new rounded-lg bg-gray-50 p-3 font-mono text-xs text-gray-800">
                <ul id="live-event-list" class="space-y-1">
                    <li v-if="!isLoading && !diagnosticsStore.liveEvents.length">Awaiting incoming events...</li>
                    <li v-for="(event, index) in diagnosticsStore.liveEvents" :key="index"
                        class="px-2 py-1 rounded bg-white shadow-sm card-new">
                        <time class="text-gray-400 mr-2">{{ new Date(event.time).toLocaleTimeString() }}</time>
                        {{ event.type }}: <span class="font-semibold">{{ event.description }}</span>
                        from <span class="italic">{{ event.ip_address }}</span>
                    </li>
                </ul>
            </div>
        </section>

        <section class="card-new rounded-lg bg-white p-4 col-span-1 lg:col-span-1 flex flex-col">
            <h2 class="text-xl font-semibold">🛠️ Tracking Script Status</h2>
            <ul class="space-y-3 overflow-y-auto max-h-[290px] pr-2">
                <li v-if="!isLoading && !diagnosticsStore.scriptStatus.length">No domains found.</li>
                <li v-for="(item, index) in diagnosticsStore.scriptStatus" :key="index"
                    class="flex justify-between items-center p-3 rounded-lg bg-gray-50 card-new">
                    <div>
                        <p class="font-medium text-gray-900 truncate max-w-[180px]" :title="item.domain">{{ item.domain
                            }}</p>
                        <p class="text-sm text-gray-500">Last loaded: {{ item.last_loaded }}</p>
                    </div>
                    <span :class="{
                        'bg-green-100 text-green-700': item.status === 'OK',
                        'bg-yellow-100 text-yellow-700': item.status === 'Warning',
                        'bg-red-100 text-red-700': item.status === 'Error'
                    }" class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold">
                        {{ item.status }}
                    </span>
                </li>
            </ul>
        </section>

        <section class="card-new rounded-lg bg-white p-4 col-span-1 lg:col-span-2 flex flex-col">
            <h2 class="text-xl font-semibold">❌ Client-side JS Errors</h2>
            <div ref="clientErrorsListEl"
                class="overflow-y-auto max-h-72 card-new rounded-lg bg-gray-50 p-3 font-mono text-xs text-gray-800">
                <ul class="space-y-2">
                    <li v-if="!isLoading && !diagnosticsStore.clientErrors.length"
                        class="text-center text-gray-500">No
                        client-side errors recorded.</li>
                    <li v-for="error in diagnosticsStore.clientErrors" :key="error.id"
                        class="bg-white card-new rounded p-3 shadow-sm">
                        <div class="flex justify-between items-center mb-1">
                            <span class="font-semibold text-red-700">JavaScript Error</span>
                            <time class="text-gray-400 text-xs">{{ new Date(error.occurred_at).toLocaleString()
                                }}</time>
                        </div>
                        <pre class="whitespace-pre-wrap break-words bg-gray-100 p-2 rounded text-xs">{{ error.error_message }}
                </pre>
                    </li>
                    <li v-if="isLoadingErrors" class="text-center text-gray-500 text-xs py-2">Loading more...</li>
                </ul>
            </div>
        </section>

        <section class="card-new rounded-lg bg-white p-4 col-span-1 lg:col-span-3 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold">🔁 Retry Queue & Failed Events</h2>
            </div>
            <div ref="failedJobsListEl" class="overflow-x-auto max-h-72">
                <table class="w-full text-left text-sm text-gray-700 card-new rounded-lg overflow-hidden">
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
                        <tr v-if="!isLoading && !diagnosticsStore.failedJobs.length">
                            <td colspan="5" class="text-center py-4 text-gray-500">No failed jobs found.</td>
                        </tr>
                        <tr v-for="job in diagnosticsStore.failedJobs" :key="job.id"
                            class="border-b border-gray-200 hover:bg-gray-50">
                            <td class="py-2 px-4 font-mono truncate max-w-[120px]" :title="job.id">{{ job.id }}</td>
                            <td class="py-2 px-4">{{ job.type }}</td>
                            <td class="py-2 px-4">{{ job.last_attempt }}</td>
                            <td class="py-2 px-4 truncate max-w-[250px]" :title="job.error_message">{{ job.error_message
                                }}</td>
                            <td class="py-2 px-4">
                                <span
                                    class="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-xs font-semibold">
                                    {{ job.status }}
                                </span>
                            </td>
                        </tr>
                        <tr v-if="isLoadingJobs">
                            <td colspan="5" class="text-center py-2 text-gray-500 text-xs">Loading more...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>