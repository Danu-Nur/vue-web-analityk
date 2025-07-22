import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../../services/axios'; // Pastikan path ini benar

export const useDiagnosticsStore = defineStore('diagnostics', {
    state: () => ({
        // State untuk setiap kartu/komponen
        botLogs: ref([]),
        botVsHumanTraffic: ref({ title: '', categories: [], seriesData: [] }),
        clientErrors: ref([]),
        sessionHealth: ref({
            counts: { active: 0, suspicious: 0, invalid: 0 },
            top_sources: [],
        }),
        integrationWarnings: ref([]),
        liveEvents: ref([]),
        scriptStatus: ref([]),
        failedJobs: ref([]),

        // State global
        loading: ref(false),
        error: ref(null),
        date_from: ref(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
        date_to: ref(new Date().toISOString().split('T')[0])
    }),

    actions: {
        // Mengubah rentang tanggal dan memuat ulang semua data
        setDateRange(from, to) {
            this.date_from = from;
            this.date_to = to;
            this.fetchAllDiagnostics(true); // Paksa refresh saat tanggal berubah
        },

        // Memuat semua data diagnostik secara paralel
        async fetchAllDiagnostics(forceRefresh = false) {
            if (this.loading) return;
            // [FIXED] Kondisi menggunakan state yang ada di store ini
            if (!forceRefresh && this.botVsHumanTraffic.categories.length > 0) return;

            this.loading = true;
            this.error = null;

            await Promise.allSettled([
                this.fetchBotDetectionLogs(), // Panggil dengan false untuk mereset paginasi
                this.fetchBotVsHumanTraffic(),
                this.fetchClientSideErrors(),
                this.fetchSessionHealth(),
                this.fetchIntegrationWarnings(),
                this.fetchLiveEvents(),
                this.fetchScriptStatus(),
                this.fetchFailedJobs(),
            ]);

            this.loading = false;
        },

        // Helper untuk fetch data dengan parameter tanggal
        async _fetchData(endpoint, dataProcessor) {
            try {
                const response = await axios.get(endpoint, {
                    params: {
                        date_from: this.date_from,
                        date_to: this.date_to,
                    }
                });
                dataProcessor(response.data);
            } catch (err) {
                console.error(`Error fetching ${endpoint}:`, err);
                this.error = `Failed to load data from ${endpoint}.`;
            }
        },

        // [FIXED] Mengembalikan logika paginasi yang benar
        fetchBotDetectionLogs() {
            return this._fetchData('/api/admin/diagnostics/bot-logs', (data) => { this.botLogs = data; });
        },
        fetchBotVsHumanTraffic() {
            return this._fetchData('/api/admin/diagnostics/bot-vs-human', (data) => { this.botVsHumanTraffic = data; });
        },
        fetchClientSideErrors() {
            return this._fetchData('/api/admin/diagnostics/client-errors', (data) => { this.clientErrors = data; });
        },
        fetchSessionHealth() {
            return this._fetchData('/api/admin/diagnostics/session-health', (data) => { this.sessionHealth = data; });
        },
        fetchIntegrationWarnings() {
            return this._fetchData('/api/admin/diagnostics/integration-warnings', (data) => { this.integrationWarnings = data; });
        },
        fetchLiveEvents() {
            return this._fetchData('/api/admin/diagnostics/live-events', (data) => { this.liveEvents = data; });
        },
        fetchFailedJobs() {
            return this._fetchData('/api/admin/diagnostics/failed-jobs', (data) => { this.failedJobs = data; });
        },

        // Action untuk status script (tidak menggunakan rentang tanggal)
        async fetchScriptStatus() {
            try {
                const response = await axios.get('/api/admin/diagnostics/script-status');
                this.scriptStatus = response.data;
            } catch (err) {
                console.error("Failed to fetch script status:", err);
            }
        },
    }
});