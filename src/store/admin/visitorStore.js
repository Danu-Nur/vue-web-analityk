import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../../services/axios'

export const useVisitorStore = defineStore('visitor', {
    state: () => ({
        liveUsers: ref([]),
        sessions: ref([]),
        devices: ref({
            title: '',
            categories: [],
            seriesData: []
        }),
        timezoneLang: ref([]),
        mapData: ref([]),
        userJourneys: ref([]),
        breadcrumb: ref([]),
        hourlyVisitors: ref({ title: '', categories: [], seriesData: [] }),
        headers: ref({
            liveUsers: [],
            sessions: [],
            timezoneLang: [],
            userJourneys: []
        }),
        loading: ref(false),
        error: ref(null),
        date_from: ref(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]), // Default: 1 day ago
        date_to: ref(new Date().toISOString().split('T')[0]) // Default: today
    }),

    actions: {
        setDateRange(date_from, date_to) {
            this.date_from = date_from;
            this.date_to = date_to;
        },

        async fetchAllData() {
            this.loading = true;
            this.error = null;
            try {
                await Promise.all([
                    this.fetchLiveUsers(),
                    this.fetchSessionsSummary(),
                    this.fetchDeviceBreakdown(),
                    this.fetchTimezonesAndLanguage(),
                    this.fetchMapRealTime(),
                    this.fetchUserJourneys(),
                    this.fetchHourlyVisitors()
                ]);
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch data';
                console.error('Fetch all data error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchHourlyVisitors() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/visitors/hourly-visitors', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.hourlyVisitors = data;
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch hourly visitors';
                this.hourlyVisitors = { title: 'Hourly Visitors', categories: [], seriesData: [] };
                console.error('Fetch hourly visitors error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchLiveUsers() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/visitors/live-users', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.liveUsers = data.items || [];
                this.headers.liveUsers = data.headers || [];
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch live users';
                console.error('Fetch live users error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchSessionsSummary() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/visitors/sessions-summary', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.sessions = data.items || [];
                this.headers.sessions = data.headers || [];
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch sessions summary';
                console.error('Fetch sessions summary error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchDeviceBreakdown() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/visitors/device-breakdown', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.devices = {
                    title: data.title || '',
                    categories: data.categories || [],
                    seriesData: data.seriesData || []
                };
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch device breakdown';
                console.error('Fetch device breakdown error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchTimezonesAndLanguage() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/visitors/timezones-language', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.timezoneLang = data.items || [];
                this.headers.timezoneLang = data.headers || [];
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch timezones and language';
                console.error('Fetch timezones and language error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchMapRealTime() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/visitors/map-realtime', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.mapData = data.data || [];
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch map real-time data';
                console.error('Fetch map real-time error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchUserJourneys() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/visitors/user-journey', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.userJourneys = data.items || [];
                this.breadcrumb = data.breadcrumb || [];
                this.headers.userJourneys = data.headers || [];
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch user journeys';
                console.error('Fetch user journeys error:', error);
            } finally {
                this.loading = false;
            }
        }
    }
})