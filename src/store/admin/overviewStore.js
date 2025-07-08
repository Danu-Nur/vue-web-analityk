import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../../services/axios'

export const useOverviewStore = defineStore('overview', {
    state: () => ({
        metrics: ref({
            page_views: 0,
            visitors: 0,
            bounce_rate: 0,
            avg_duration: '00:00'
        }),
        lineChart: ref({
            title: '',
            categories: [],
            seriesData: []
        }),
        topPages: ref([]),
        deviceChart: ref({
            title: '',
            categories: [],
            seriesData: []
        }),
        referrers: ref([]),
        entryExitPages: ref([]),
        geoMap: ref([]),
        headers: ref({
            topPages: [],
            geoMap: [],
            referrers: [],
            entryExitPages: []
        }),
        loading: ref(false),
        error: ref(null),
        date_from: ref(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]), // Default: 30 days ago
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
                    this.fetchMetrics(),
                    this.fetchLineChart(),
                    this.fetchTopPages(),
                    this.fetchDeviceChart(),
                    this.fetchReferrers(),
                    this.fetchEntryExitPages(),
                    this.fetchGeoMap(),
                ]);
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch overview data';
                console.error('Fetch all overview data error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchMetrics() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/overview/metrics', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.metrics = {
                    page_views: data.page_views || 0,
                    visitors: data.visitors || 0,
                    bounce_rate: data.bounce_rate || 0,
                    avg_duration: data.avg_duration || '00:00'
                };
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch metrics data';
                this.metrics = { page_views: 0, visitors: 0, bounce_rate: 0, avg_duration: '00:00' };
                console.error('Fetch metrics error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchLineChart() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/overview/line-chart', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.lineChart = {
                    title: data.title || '',
                    categories: data.categories || [],
                    seriesData: data.seriesData || []
                };
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch line chart data';
                this.lineChart = { title: 'Page Views per Day', categories: [], seriesData: [] };
                console.error('Fetch line chart error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchTopPages() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/overview/top-pages', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.topPages = data.items || [];
                this.headers.topPages = data.headers || [];
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch top pages data';
                this.topPages = [];
                this.headers.topPages = [];
                console.error('Fetch top pages error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchGeoMap() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/overview/geo-map', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.geoMap = data.items || [];
                this.headers.geoMap = data.headers || [];
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch geo map data';
                this.geoMap = [];
                this.headers.geoMap = [];
                console.error('Fetch geo map error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchDeviceChart() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/overview/device-chart', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.deviceChart = {
                    title: data.title || '',
                    categories: data.categories || [],
                    seriesData: data.seriesData || []
                };
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch device chart data';
                this.deviceChart = { title: 'Device Type Distribution', categories: [], seriesData: [] };
                console.error('Fetch device chart error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchReferrers() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/overview/referrers', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.referrers = data.items || [];
                this.headers.referrers = data.headers || [];
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch referrers data';
                this.referrers = [];
                this.headers.referrers = [];
                console.error('Fetch referrers error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchEntryExitPages() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/overview/entry-exit-pages', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.entryExitPages = data.items || [];
                this.headers.entryExitPages = data.headers || [];
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch entry/exit pages data';
                this.entryExitPages = [];
                this.headers.entryExitPages = [];
                console.error('Fetch entry/exit pages error:', error);
            } finally {
                this.loading = false;
            }
        },
    }
})