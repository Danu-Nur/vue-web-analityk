import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../../services/axios'

export const useBehaviorStore = defineStore('behavior', {
    state: () => ({
        clickEvents: ref({
            title: '',
            categories: [],
            seriesData: []
        }),
        scrollDepth: ref({
            headers: [],
            items: [],
            title: ''
        }),
        customEvents: ref({
            headers: [],
            items: [],
            title: ''
        }),
        heatmap: ref({
            urls: [],
            heatmapData: {}
        }),
        eventTimeline: ref({
            headers: [],
            items: [],
            title: ''
        }),
        urls: ref([]),
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
                    this.fetchClickEvents(),
                    this.fetchScrollDepth(),
                    this.fetchCustomEvents(),
                    this.fetchHeatmap(),
                    this.fetchEventTimeline(),
                    this.fetchUrls()
                ]);
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch behavior data';
                console.error('Fetch all behavior data error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchClickEvents() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/behavior/click-events', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.clickEvents = {
                    title: data.title || '',
                    categories: data.categories || [],
                    seriesData: data.seriesData || []
                };
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch click events data';
                this.clickEvents = { title: 'Click Events', categories: [], seriesData: [] };
                console.error('Fetch click events error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchScrollDepth() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/behavior/scroll-depth', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.scrollDepth = {
                    headers: data.headers || [],
                    items: data.items || [],
                    title: data.title || ''
                };
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch scroll depth data';
                this.scrollDepth = { headers: [], items: [], title: 'Scroll Depth Distribution' };
                console.error('Fetch scroll depth error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchCustomEvents() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/behavior/custom-events', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.customEvents = {
                    headers: data.headers || [],
                    items: data.items || [],
                    title: data.title || ''
                };
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch custom events data';
                this.customEvents = { headers: [], items: [], title: 'Top Clicked Elements' };
                console.error('Fetch custom events error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchHeatmap() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/behavior/heatmap', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.heatmap = {
                    urls: data.urls || [],
                    heatmapData: data.heatmapData || {}
                };
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch heatmap data';
                this.heatmap = { urls: [], heatmapData: {} };
                console.error('Fetch heatmap error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchEventTimeline() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/behavior/event-timeline', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.eventTimeline = {
                    headers: data.headers || [],
                    items: data.items || [],
                    title: data.title || ''
                };
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch event timeline data';
                this.eventTimeline = { headers: [], items: [], title: 'Event Timeline' };
                console.error('Fetch event timeline error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchUrls() {
            try {
                this.loading = true;
                const { data } = await axios.get('/api/admin/behavior/urls', {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });
                this.urls = data || [];
            } catch (error) {
                this.error = error.response?.data?.error || 'Failed to fetch URLs data';
                this.urls = [];
                console.error('Fetch URLs error:', error);
            } finally {
                this.loading = false;
            }
        }
    }
})