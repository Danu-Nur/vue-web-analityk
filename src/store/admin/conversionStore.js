import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../../services/axios' // Adjust path as needed

export const useConversionStore = defineStore('conversion', {
    state: () => ({
        funnelOverview: ref({
            total_users: 0,
            converted: 0
        }),
        conversionRate: ref({
            current_rate: 0,
            previous_rate: 0,
            change: 0
        }),
        topSources: ref({
            headers: [],
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
            headers: [],
            items: [],
            title: 'Conversion Timeline'
        }),
        recentConversions: ref({
            headers: [],
            items: [],
            title: 'Recent Conversions'
        }),
        userJourney: ref({
            headers: [],
            items: [],
            title: 'User Journey'
        }),
        conversionGoals: ref({
            headers: [],
            items: [],
            title: 'Conversion Goals'
        }),
        urls: ref([]),
        loading: ref(false),
        error: ref(null),
        date_from: ref(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]), // Default: 30 days ago
        date_to: ref(new Date().toISOString().split('T')[0]) // Default: today
        // client_id: ref(null), // Store client_id for API requests
        // time_range: ref('last_7_days') // Default: last 7 days
    }),

    actions: {
        setDateRange(date_from, date_to) {
            this.date_from = date_from;
            this.date_to = date_to;
        },

        // setClientId(client_id) {
        //     this.client_id = client_id;
        // },

        async fetchAllData(forceRefresh = false) {
            // Check if data is already loaded to avoid redundant fetches
            if (!forceRefresh && this.funnelOverview.total_users > 0) {
                console.log('Conversion data already loaded, skipping fetchAllData unless forced.');
                return;
            }

            // Ensure client_id is set
            // if (!this.client_id) {
            //     this.error = 'Client ID is required to fetch conversion data';
            //     console.error(this.error);
            //     return;
            // }

            this.loading = true;
            this.error = null; // Reset error before fetching

            try {
                // Fetch all data concurrently
                const results = await Promise.allSettled([
                    this.fetchFunnelOverview(),
                    this.fetchConversionRate(),
                    this.fetchTopSources(),
                    this.fetchStepByStepDropoff(),
                    this.fetchConversionTimeline(),
                    this.fetchRecentConversions(),
                    this.fetchUserJourney(),
                    this.fetchConversionGoals(),
                    this.fetchUrls()
                ]);

                // Check for failed requests
                const rejectedPromises = results.filter(result => result.status === 'rejected');
                if (rejectedPromises.length > 0) {
                    this.error = 'Some conversion data failed to load. Please check console for details.';
                    rejectedPromises.forEach((rejected, index) => {
                        console.error(`Fetch operation ${ index } failed: `, rejected.reason);
                    });
                }

            } catch (err) {
                this.error = err.response?.data?.error || 'Failed to fetch all conversion data';
                console.error('Fetch all conversion data critical error:', err);
            } finally {
                this.loading = false;
            }
        },

        // Helper function to reduce code duplication
        async _fetchData(endpoint, property, defaultValues, errorMessage) {
            try {
                const { data } = await axios.get(endpoint, {
                    params: { 
                        client_id: this.client_id,
                        time_range: this.time_range 
                    }
                });

                // Update state based on data structure
                if (Array.isArray(this[property])) { // For `urls`
                    this[property] = data || defaultValues;
                } else if (['funnelOverview', 'conversionRate'].includes(property)) { // For key-value data
                    this[property] = { ...defaultValues, ...data };
                } else if (['stepByStepDropoff'].includes(property)) { // For chart data
                    this[property] = {
                        title: data.title || defaultValues.title,
                        categories: data.categories || defaultValues.categories,
                        seriesData: data.seriesData || defaultValues.seriesData,
                        dropOffs: data.dropOffs || defaultValues.dropOffs
                    };
                } else { // For table data (topSources, conversionTimeline, recentConversions, userJourney, conversionGoals)
                    this[property] = {
                        headers: data.headers || defaultValues.headers,
                        items: data.items || defaultValues.items,
                        title: data.title || defaultValues.title
                    };
                }

            } catch (error) {
                console.error(`${ errorMessage } error: `, error);
                // Reset to default values on error
                this[property] = { ...defaultValues };
            }
        },

        async fetchFunnelOverview() {
            await this._fetchData(
                '/api/admin/conversions/funnel-overview',
                'funnelOverview',
                { total_users: 0, converted: 0 },
                'Fetch funnel overview'
            );
        },

        async fetchConversionRate() {
            await this._fetchData(
                '/api/admin/conversions/conversion-rate',
                'conversionRate',
                { current_rate: 0, previous_rate: 0, change: 0 },
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
                '/api/admin/conversions/conversion-timeline',
                'conversionTimeline',
                { headers: [], items: [], title: 'Conversion Timeline' },
                'Fetch conversion timeline'
            );
        },

        async fetchRecentConversions() {
            await this._fetchData(
                '/api/admin/conversions/recent-conversions',
                'recentConversions',
                { headers: [], items: [], title: 'Recent Conversions' },
                'Fetch recent conversions'
            );
        },

        async fetchUserJourney() {
            await this._fetchData(
                '/api/admin/conversions/user-journey',
                'userJourney',
                { headers: [], items: [], title: 'User Journey' },
                'Fetch user journey'
            );
        },

        async fetchConversionGoals() {
            await this._fetchData(
                '/api/admin/conversions/conversion-goals',
                'conversionGoals',
                { headers: [], items: [], title: 'Conversion Goals' },
                'Fetch conversion goals'
            );
        },

        async fetchUrls() {
            await this._fetchData(
                '/api/admin/conversions/urls',
                'urls',
                [],
                'Fetch URLs'
            );
        }
    }
})