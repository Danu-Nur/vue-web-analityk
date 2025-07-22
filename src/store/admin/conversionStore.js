import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../../services/axios'; // Pastikan path ini benar

export const useConversionStore = defineStore('conversion', {
    state: () => ({
        funnelOverview: ref({ total_users: 0, converted_percentage: 0 }),
        conversionRate: ref({ conversion_rate: 0, last_week_rate: 0, change_percentage: 0 }),
        topSources: ref({ items: [] }),
        stepByStepDropoff: ref({ title: 'Funnel Step-by-Step Drop-off', categories: [], seriesData: [] }),
        conversionTimeline: ref({ items: [] }),
        recentConversions: ref({ items: [] }),
        userJourney: ref({ items: [] }),
        conversionGoals: ref({ items: [] }),
        conversionTrends: ref({ title: 'Daily Conversion Rate', categories: [], seriesData: [], change_percentage: 0 }),
        loading: ref(false),
        error: ref(null),
        date_from: ref(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
        date_to: ref(new Date().toISOString().split('T')[0])
    }),

    actions: {
        setDateRange(from, to) {
            this.date_from = from;
            this.date_to = to;
            this.fetchAllData(true); // Fetch data lagi dengan date range baru
        },

        async fetchAllData(forceRefresh = false) {
            if (this.loading) return; // Jangan fetch jika sedang loading
            if (!forceRefresh && this.funnelOverview.total_users > 0) return;

            this.loading = true;
            this.error = null;

            const apiTasks = [
                this.fetchFunnelOverview(),
                this.fetchConversionRate(),
                this.fetchTopSources(),
                this.fetchStepByStepDropoff(),
                this.fetchConversionTimeline(),
                this.fetchRecentConversions(),
                this.fetchUserJourney(),
                this.fetchConversionGoals(),
                this.fetchConversionTrends()
            ];

            try {
                await Promise.allSettled(apiTasks);
            } catch (err) {
                this.error = 'Failed to fetch all conversion data.';
                console.error('Critical error fetching all data:', err);
            } finally {
                this.loading = false;
            }
        },

        // Helper untuk fetch data dari satu endpoint
        async _fetchData(endpoint, dataProcessor) {
            try {
                const response = await axios.get(endpoint, {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                dataProcessor(response.data);
            } catch (error) {
                console.error(`Error fetching ${endpoint}:`, error);
                this.error = `Failed to load data from ${endpoint}.`;
            }
        },

        // Actions individual
        fetchFunnelOverview() {
            return this._fetchData('/api/admin/conversions/overview', (data) => { this.funnelOverview = data; });
        },
        fetchConversionRate() {
            return this._fetchData('/api/admin/conversions/conversion-rate', (data) => { this.conversionRate = data; });
        },
        fetchTopSources() {
            return this._fetchData('/api/admin/conversions/top-sources', (data) => { this.topSources.items = data; });
        },
        fetchStepByStepDropoff() {
            return this._fetchData('/api/admin/conversions/step-by-step-dropoff', (data) => { this.stepByStepDropoff = data; });
        },
        fetchConversionTimeline() {
            return this._fetchData('/api/admin/conversions/timeline', (data) => { this.conversionTimeline.items = data; });
        },
        fetchRecentConversions() {
            return this._fetchData('/api/admin/conversions/recent', (data) => { this.recentConversions.items = data; });
        },
        fetchUserJourney() {
            return this._fetchData('/api/admin/conversions/user-journeys', (data) => { this.userJourney.items = data; });
        },
        fetchConversionGoals() {
            return this._fetchData('/api/admin/conversions/goals', (data) => { this.conversionGoals.items = data; });
        },
        fetchConversionTrends() {
            return this._fetchData('/api/admin/conversions/trends', (data) => { this.conversionTrends = data; });
        },
    }
});