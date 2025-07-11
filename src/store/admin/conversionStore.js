import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../../services/axios'; // Adjust path as needed

export const useConversionStore = defineStore('conversion', {
    state: () => ({
        funnelOverview: ref({
            total_users: 0,
            converted_percentage: 0
        }),
        conversionRate: ref({
            conversion_rate: 0,
            last_week_rate: 0,
            change_percentage: 0
        }),
        topSources: ref({
            headers: [
                { text: 'Source', value: 'name' },
                { text: 'Percentage', value: 'percentage' },
            ],
            items: [],
            title: 'Top Sources'
        }),
        stepByStepDropoff: ref({
            title: 'Funnel Step-by-Step Drop-off',
            categories: [],
            seriesData: [],
            dropOffs: []
        }),
        conversionTimeline: ref({
            headers: [
                { text: 'Time Range', value: 'range' },
                { text: 'Percentage', value: 'percentage' },
            ],
            items: [],
            title: 'Conversion Timeline'
        }),
        recentConversions: ref({
            headers: [
                { text: 'Event', value: 'title' },
                { text: 'Description', value: 'description' },
                { text: 'Journey', value: 'journey_path' },
                { text: 'User ID', value: 'user_id' },
            ],
            items: [],
            title: 'Recent Conversions'
        }),
        userJourney: ref({
            headers: [
                { text: 'User ID', value: 'user_id' },
                { text: 'Journey Path', value: 'journey_path' },
                { text: 'Times', value: 'times' },
            ],
            items: [],
            title: 'User Journey'
        }),
        conversionGoals: ref({
            headers: [],
            items: [],
            title: 'Conversion Goals'
        }),
        conversionTrends: ref({ // Added conversionTrends state
            title: 'Daily Conversion Rate',
            categories: [],
            seriesData: [],
            change_percentage: 0
        }),
        urls: ref([]),
        loading: ref(false),
        error: ref(null),
        date_from: ref(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
        date_to: ref(new Date().toISOString().split('T')[0])
    }),

    actions: {
        setDateRange(date_from, date_to) {
            this.date_from = date_from;
            this.date_to = date_to;
        },

        async fetchAllData(forceRefresh = false) {
            if (!forceRefresh && this.funnelOverview.total_users > 0 && this.date_from === this.date_from && this.date_to === this.date_to) {
                console.log('Conversion data already loaded for current date range, skipping fetchAllData unless forced.');
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                const results = await Promise.allSettled([
                    this.fetchFunnelOverview(),
                    this.fetchConversionRate(),
                    this.fetchTopSources(),
                    this.fetchStepByStepDropoff(),
                    this.fetchConversionTimeline(),
                    this.fetchRecentConversions(),
                    this.fetchUserJourney(),
                    this.fetchConversionGoals(),
                    this.fetchConversionTrends() // Added fetchConversionTrends here
                ]);

                const rejectedPromises = results.filter(result => result.status === 'rejected');
                if (rejectedPromises.length > 0) {
                    this.error = 'Some conversion data failed to load. Please check console for details.';
                    rejectedPromises.forEach((rejected, index) => {
                        console.error(`Fetch operation ${index} failed: `, rejected.reason);
                    });
                }

            } catch (err) {
                this.error = err.response?.data?.error || 'Failed to fetch all conversion data';
                console.error('Fetch all conversion data critical error:', err);
            } finally {
                this.loading = false;
            }
        },

        async _fetchData(endpoint, property, defaultValues, errorMessage) {
            try {
                const { data } = await axios.get(endpoint, {
                    params: {
                        date_from: this.date_from,
                        date_to: this.date_to
                    }
                });

                if (['funnelOverview'].includes(property)) {
                    this[property].total_users = data.total_users ?? defaultValues.total_users;
                    this[property].converted_percentage = data.converted_percentage ?? defaultValues.converted_percentage;
                } else if (['conversionRate'].includes(property)) {
                    this[property].conversion_rate = data.conversion_rate ?? defaultValues.conversion_rate;
                    this[property].last_week_rate = data.last_week_rate ?? defaultValues.last_week_rate;
                    this[property].change_percentage = data.change_percentage ?? defaultValues.change_percentage;
                } else if (['stepByStepDropoff', 'conversionTrends'].includes(property)) { // Added conversionTrends here
                    this[property].title = data.title || defaultValues.title;
                    this[property].categories = data.categories || defaultValues.categories;
                    this[property].seriesData = data.seriesData || defaultValues.seriesData;
                    if (property === 'conversionTrends') { // Specific for conversionTrends
                        this[property].change_percentage = data.change_percentage ?? defaultValues.change_percentage;
                    }
                }
                else if (['topSources', 'conversionTimeline', 'recentConversions', 'userJourney', 'conversionGoals'].includes(property)) {
                    this[property].items = data || defaultValues.items;
                }
                else if (Array.isArray(this[property])) {
                    this[property] = data || defaultValues;
                }

            } catch (error) {
                console.error(`${errorMessage} error: `, error);
                if (Array.isArray(this[property])) {
                    this[property] = [...defaultValues];
                } else {
                    this[property] = { ...defaultValues };
                }
            }
        },

        async fetchFunnelOverview() {
            await this._fetchData(
                '/api/admin/conversions/overview',
                'funnelOverview',
                { total_users: 0, converted_percentage: 0 },
                'Fetch funnel overview'
            );
        },

        async fetchConversionRate() {
            await this._fetchData(
                '/api/admin/conversions/conversion-rate',
                'conversionRate',
                { conversion_rate: 0, last_week_rate: 0, change_percentage: 0 },
                'Fetch conversion rate'
            );
        },

        async fetchTopSources() {
            await this._fetchData(
                '/api/admin/conversions/top-sources',
                'topSources',
                { headers: [], items: [], title: 'Top Sources' },
                'Fetch top sources'
            );
        },

        async fetchStepByStepDropoff() {
            await this._fetchData(
                '/api/admin/conversions/step-by-step-dropoff',
                'stepByStepDropoff',
                { title: 'Funnel Step-by-Step Drop-off', categories: [], seriesData: [], dropOffs: [] },
                'Fetch step-by-step dropoff'
            );
        },

        async fetchConversionTimeline() {
            await this._fetchData(
                '/api/admin/conversions/timeline',
                'conversionTimeline',
                { headers: [], items: [], title: 'Conversion Timeline' },
                'Fetch conversion timeline'
            );
        },

        async fetchRecentConversions() {
            await this._fetchData(
                '/api/admin/conversions/recent',
                'recentConversions',
                { headers: [], items: [], title: 'Recent Conversions' },
                'Fetch recent conversions'
            );
        },

        async fetchUserJourney() {
            await this._fetchData(
                '/api/admin/conversions/user-journeys',
                'userJourney',
                { headers: [], items: [], title: 'User Journey' },
                'Fetch user journey'
            );
        },

        async fetchConversionGoals() {
            await this._fetchData(
                '/api/admin/conversions/goals',
                'conversionGoals',
                { headers: [], items: [], title: 'Conversion Goals' },
                'Fetch conversion goals'
            );
        },

        async fetchConversionTrends() { // New action for conversion trends
            await this._fetchData(
                '/api/admin/conversions/trends', // Endpoint for conversion trends
                'conversionTrends',
                { title: 'Daily Conversion Rate', categories: [], seriesData: [], change_percentage: 0 },
                'Fetch conversion trends'
            );
        },
    }
});