import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../../services/axios' // Pastikan jalur ini benar

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
            data: [] // Kini akan menyimpan array objek per URL
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

        async fetchAllData(forceRefresh = false) {
            // Perbaikan logika caching: Cek apakah `clickEvents` memiliki data.
            // Contoh: jika categories di clickEvents terisi, berarti data sudah dimuat.
            if (!forceRefresh && this.clickEvents.categories.length > 0) {
                console.log('Behavior data already loaded, skipping fetchAllData unless forced.');
                return;
            }

            this.loading = true;
            this.error = null; // Reset error sebelum memulai fetching

            try {
                // Menggunakan Promise.allSettled untuk memastikan semua permintaan selesai
                const results = await Promise.allSettled([
                    this.fetchClickEvents(),
                    this.fetchScrollDepth(),
                    this.fetchCustomEvents(),
                    this.fetchHeatmap(),
                    this.fetchEventTimeline(),
                    this.fetchUrls()
                ]);

                // Memeriksa hasil dari Promise.allSettled untuk mengidentifikasi kegagalan
                const rejectedPromises = results.filter(result => result.status === 'rejected');
                if (rejectedPromises.length > 0) {
                    this.error = 'Some behavior data failed to load. Please check console for details.';
                    rejectedPromises.forEach((rejected, index) => {
                        console.error(`Fetch operation ${index} failed:`, rejected.reason);
                    });
                }

            } catch (err) {
                // Tangani error umum jika Promise.allSettled itu sendiri gagal
                this.error = err.response?.data?.error || 'Failed to fetch all behavior data';
                console.error('Fetch all behavior data critical error:', err);
            } finally {
                this.loading = false;
            }
        },

        // Fungsi pembantu untuk mengurangi duplikasi kode
        async _fetchData(endpoint, property, defaultValues, errorMessage) {
            try {
                const { data } = await axios.get(endpoint, {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });

                // Pembaruan state berdasarkan tipe data dan struktur respons yang diharapkan
                if (Array.isArray(this[property])) { // Untuk `urls`
                    this[property] = data || defaultValues;
                } else if (property === 'heatmap') {
                    this[property] = {
                        data: data.data || defaultValues.data // Mengambil array 'data' dari respons
                    };
                } else if (property === 'clickEvents') { // Untuk chart seperti `clickEvents`
                    this[property] = {
                        title: data.title || defaultValues.title,
                        categories: data.categories || defaultValues.categories,
                        seriesData: data.seriesData || defaultValues.seriesData
                    };
                } else { // Untuk objek dengan `headers`, `items`, `title` (scrollDepth, customEvents, eventTimeline)
                    this[property] = {
                        headers: data.headers || defaultValues.headers,
                        items: data.items || defaultValues.items,
                        title: data.title || defaultValues.title
                    };
                }

            } catch (error) {
                console.error(`${errorMessage} error:`, error);
                // Reset ke nilai default jika terjadi error
                if (Array.isArray(this[property])) {
                    this[property] = defaultValues;
                } else {
                    this[property] = { ...defaultValues };
                }
            }
        },

        async fetchClickEvents() {
            await this._fetchData(
                '/api/admin/behavior/click-events',
                'clickEvents',
                { title: 'Click Events', categories: [], seriesData: [] },
                'Fetch click events'
            );
        },

        async fetchScrollDepth() {
            await this._fetchData(
                '/api/admin/behavior/scroll-depth',
                'scrollDepth',
                { headers: [], items: [], title: 'Scroll Depth Distribution' },
                'Fetch scroll depth'
            );
        },

        async fetchCustomEvents() {
            await this._fetchData(
                '/api/admin/behavior/custom-events',
                'customEvents',
                { headers: [], items: [], title: 'Top Clicked Elements' },
                'Fetch custom events'
            );
        },

        async fetchHeatmap() {
            await this._fetchData(
                '/api/admin/behavior/heatmap',
                'heatmap',
                { data:[] },
                'Fetch heatmap'
            );
        },

        async fetchEventTimeline() {
            await this._fetchData(
                '/api/admin/behavior/event-timeline',
                'eventTimeline',
                { headers: [], items: [], title: 'Event Timeline' },
                'Fetch event timeline'
            );
        },

        async fetchUrls() {
            await this._fetchData(
                '/api/admin/behavior/urls',
                'urls',
                [],
                'Fetch URLs'
            );
        }
    }
})