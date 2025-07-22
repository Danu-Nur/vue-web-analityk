import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../../services/axios';

export const useVisitorStore = defineStore('visitor', {
    state: () => ({
        liveUsers: [],
        sessions: [],
        devices: { title: '', categories: [], seriesData: [] },
        timezoneLang: [],
        mapData: [],
        hourlyVisitors: { title: '', categories: [], seriesData: [] },
        // State baru
        urlHourlyVisitors: [],

        headers: {
            liveUsers: [],
            sessions: [],
            timezoneLang: [],
            // State header baru
            urlHourlyVisitors: [],
        },
        loading: ref(false),
        error: ref(null),
        // Update format tanggal untuk menyertakan waktu
        date_from: ref(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0] + ' 00:00:00'),
        date_to: ref(new Date().toISOString().split('T')[0] + ' 23:59:59')
    }),

    actions: {
        setDateRange(date_from, date_to) {
            this.date_from = date_from;
            this.date_to = date_to;
        },

        async fetchAllData(options = { forceRefresh: false, isBackground: false }) {
            if (!options.isBackground) {
                this.loading = true;
            }
            this.error = null;

            try {
                const results = await Promise.allSettled([
                    this.fetchLiveUsers(),
                    this.fetchSessionsSummary(),
                    this.fetchDeviceBreakdown(),
                    this.fetchTimezonesAndLanguage(),
                    this.fetchMapRealTime(),
                    this.fetchHourlyVisitors(),
                    this.fetchUrlHourlyVisitors() // Panggil fungsi baru
                ]);

                const rejectedPromises = results.filter(result => result.status === 'rejected');
                if (rejectedPromises.length > 0) {
                    this.error = 'Sebagian data gagal dimuat.';
                    rejectedPromises.forEach((rejected, index) => {
                        console.error(`Operasi fetch ke-${index} gagal:`, rejected.reason);
                    });
                }
            } catch (err) {
                this.error = 'Gagal memuat semua data pengunjung';
                console.error('Kesalahan kritis saat memuat semua data:', err);
            } finally {
                this.loading = false;
            }
        },

        async _fetchData(endpoint, property, defaultValues, headersProperty = null, errorMessage) {
            try {
                const { data } = await axios.get(endpoint, {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });

                // Logika spesifik untuk data baru
                if (property === 'urlHourlyVisitors') {
                    this.urlHourlyVisitors = data.items || defaultValues;
                    if (headersProperty) {
                        this.headers[headersProperty] = data.headers || [];
                    }
                    return; // Selesai
                }

                // Logika yang sudah ada sebelumnya
                if (Array.isArray(this[property])) {
                    this[property] = data.items || data.data || defaultValues;
                    if (headersProperty && data.headers) {
                        this.headers[headersProperty] = data.headers;
                    }
                } else if (typeof this[property] === 'object' && (property === 'devices' || property === 'hourlyVisitors')) {
                    this[property] = {
                        title: data.title || defaultValues.title,
                        categories: data.categories || defaultValues.categories,
                        seriesData: data.seriesData || defaultValues.seriesData
                    };
                } else {
                    this[property] = data || defaultValues;
                }
            } catch (error) {
                console.error(`${errorMessage} error:`, error);
                if (Array.isArray(this[property])) {
                    this[property] = defaultValues;
                    if (headersProperty) this.headers[headersProperty] = [];
                } else if (typeof this[property] === 'object') {
                    this[property] = { ...defaultValues };
                }
            }
        },

        async fetchHourlyVisitors() {
            await this._fetchData('/api/admin/visitors/hourly-visitors', 'hourlyVisitors', { title: 'Hourly Visitors', categories: [], seriesData: [] }, null, 'Fetch hourly visitors');
        },
        async fetchLiveUsers() {
            await this._fetchData('/api/admin/visitors/live-users', 'liveUsers', [], 'liveUsers', 'Fetch live users');
        },
        async fetchSessionsSummary() {
            await this._fetchData('/api/admin/visitors/sessions-summary', 'sessions', [], 'sessions', 'Fetch sessions summary');
        },
        async fetchDeviceBreakdown() {
            await this._fetchData('/api/admin/visitors/device-breakdown', 'devices', { title: 'Device Breakdown', categories: [], seriesData: [] }, null, 'Fetch device breakdown');
        },
        async fetchTimezonesAndLanguage() {
            await this._fetchData('/api/admin/visitors/timezones-language', 'timezoneLang', [], 'timezoneLang', 'Fetch timezones and language');
        },
        async fetchMapRealTime() {
            await this._fetchData('/api/admin/visitors/map-realtime', 'mapData', [], null, 'Fetch map real-time data');
        },
        // Fungsi baru
        async fetchUrlHourlyVisitors() {
            await this._fetchData(
                '/api/admin/visitors/hourly-per-url',
                'urlHourlyVisitors',
                [],
                'urlHourlyVisitors',
                'Fetch hourly visitors per URL'
            );
        }
    }
});