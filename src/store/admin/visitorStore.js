import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../../services/axios' // Pastikan jalur ini benar

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

        async fetchAllData(forceRefresh = false) {
            // Perbaikan logika caching: Asumsikan jika `liveUsers` memiliki elemen, data sudah dimuat.
            // Kamu bisa memilih properti state lain yang dianggap sebagai indikator data sudah terisi.
            if (!forceRefresh && this.liveUsers.length > 0) {
                console.log('Visitor data already loaded, skipping fetchAllData unless forced.');
                return;
            }

            this.loading = true;
            this.error = null; // Reset error sebelum memulai fetching

            try {
                // Menggunakan Promise.allSettled untuk memastikan semua permintaan selesai,
                // bahkan jika ada yang gagal, dan mengumpulkan hasilnya.
                const results = await Promise.allSettled([
                    this.fetchLiveUsers(),
                    this.fetchSessionsSummary(),
                    this.fetchDeviceBreakdown(),
                    this.fetchTimezonesAndLanguage(),
                    this.fetchMapRealTime(),
                    this.fetchUserJourneys(),
                    this.fetchHourlyVisitors()
                ]);

                // Memeriksa hasil dari Promise.allSettled untuk mengidentifikasi kegagalan
                const rejectedPromises = results.filter(result => result.status === 'rejected');
                if (rejectedPromises.length > 0) {
                    this.error = 'Some visitor data failed to load. Please check console for details.';
                    rejectedPromises.forEach((rejected, index) => {
                        console.error(`Fetch operation ${index} failed:`, rejected.reason);
                    });
                }

            } catch (err) {
                // Tangani error umum jika Promise.allSettled itu sendiri gagal (misalnya, masalah jaringan)
                this.error = err.response?.data?.error || 'Failed to fetch all visitor data';
                console.error('Fetch all visitor data critical error:', err);
            } finally {
                this.loading = false;
            }
        },

        // Fungsi pembantu untuk mengurangi duplikasi kode
        async _fetchData(endpoint, property, defaultValues, headersProperty = null, errorMessage) {
            try {
                const { data } = await axios.get(endpoint, {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });

                // Pembaruan state berdasarkan tipe data yang diharapkan
                if (Array.isArray(this[property])) { // Untuk array seperti liveUsers, sessions, timezoneLang, userJourneys, mapData
                    this[property] = data.items || data.data || defaultValues; // `data.data` untuk mapData
                    if (headersProperty && data.headers) {
                        this.headers[headersProperty] = data.headers;
                    }
                } else if (typeof this[property] === 'object' && (property === 'devices' || property === 'hourlyVisitors')) { // Untuk objek chart
                    this[property] = {
                        title: data.title || defaultValues.title,
                        categories: data.categories || defaultValues.categories,
                        seriesData: data.seriesData || defaultValues.seriesData
                    };
                    // Khusus untuk userJourneys yang punya breadcrumb
                    if (property === 'userJourneys' && data.breadcrumb) {
                        this.breadcrumb = data.breadcrumb;
                    }
                } else {
                    // Penanganan umum jika tipe data tidak cocok dengan di atas
                    this[property] = data || defaultValues;
                }

            } catch (error) {
                console.error(`${errorMessage} error:`, error);
                // Reset ke nilai default jika terjadi error
                if (Array.isArray(this[property])) {
                    this[property] = defaultValues;
                    if (headersProperty) this.headers[headersProperty] = [];
                } else if (typeof this[property] === 'object') {
                    this[property] = { ...defaultValues };
                }
                // Jika kamu ingin menampilkan error per-item di UI, kamu bisa menyimpannya di objek error lain
                // Misal: this.errorsPerSection[property] = error.response?.data?.error;
            }
        },

        async fetchHourlyVisitors() {
            await this._fetchData(
                '/api/admin/visitors/hourly-visitors',
                'hourlyVisitors',
                { title: 'Hourly Visitors', categories: [], seriesData: [] },
                null,
                'Fetch hourly visitors'
            );
        },

        async fetchLiveUsers() {
            await this._fetchData(
                '/api/admin/visitors/live-users',
                'liveUsers',
                [],
                'liveUsers',
                'Fetch live users'
            );
        },

        async fetchSessionsSummary() {
            await this._fetchData(
                '/api/admin/visitors/sessions-summary',
                'sessions',
                [],
                'sessions',
                'Fetch sessions summary'
            );
        },

        async fetchDeviceBreakdown() {
            await this._fetchData(
                '/api/admin/visitors/device-breakdown',
                'devices',
                { title: 'Device Breakdown', categories: [], seriesData: [] },
                null,
                'Fetch device breakdown'
            );
        },

        async fetchTimezonesAndLanguage() {
            await this._fetchData(
                '/api/admin/visitors/timezones-language',
                'timezoneLang',
                [],
                'timezoneLang',
                'Fetch timezones and language'
            );
        },

        async fetchMapRealTime() {
            await this._fetchData(
                '/api/admin/visitors/map-realtime',
                'mapData', // Perhatikan, properti state adalah `mapData`
                [], // `data.data` bukan `data.items` untuk ini
                null,
                'Fetch map real-time data'
            );
        },

        async fetchUserJourneys() {
            await this._fetchData(
                '/api/admin/visitors/user-journey',
                'userJourneys',
                [],
                'userJourneys',
                'Fetch user journeys'
            );
        }
    }
})