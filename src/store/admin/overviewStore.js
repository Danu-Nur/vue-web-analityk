import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../../services/axios' // Pastikan jalur ini benar

export const useOverviewStore = defineStore('overview', {
    state: () => ({
        // Menggunakan `ref` secara eksplisit untuk reaktivitas di luar actions/getters
        // Ini sudah sesuai dengan praktik Pinia Composition API style.
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
        // Headers juga bisa diinisialisasi sebagai objek kosong dan diisi nanti
        headers: ref({
            topPages: [],
            geoMap: [],
            referrers: [],
            entryExitPages: []
        }),
        loading: ref(false),
        error: ref(null),
        // Pastikan format tanggal sesuai kebutuhan API (YYYY-MM-DD)
        date_from: ref(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]), // Default: 30 days ago
        date_to: ref(new Date().toISOString().split('T')[0]) // Default: today
    }),

    actions: {
        setDateRange(date_from, date_to) {
            this.date_from = date_from;
            this.date_to = date_to;
        },

        // Fetch semua data secara paralel
        async fetchAllData(forceRefresh = false) {
            // Perbaikan logika caching: Cek apakah `metrics` memiliki nilai yang valid.
            // Jika kamu ingin semua data di-fetch ulang setiap kali, hapus kondisi `!this.metrics.page_views`
            // Namun, jika `metrics.page_views` adalah 0 secara default, ini bisa memicu fetch berulang.
            // Lebih baik gunakan sebuah flag `isDataLoaded` atau cek properti yang pasti akan terisi setelah fetch pertama.
            // Untuk saat ini, kita akan asumsikan jika `metrics.page_views` tidak 0, data sudah ada.
            // Atau, lebih baik lagi, gunakan `forceRefresh` sebagai satu-satunya pemicu refresh.
            // Jika `metrics` adalah objek, `!this.metrics` akan selalu false.
            // Asumsi: jika `metrics.page_views` adalah 0, berarti data belum terisi.
            if (!forceRefresh && this.metrics.page_views !== 0) {
                console.log('Data already loaded, skipping fetchAllData unless forced.');
                return;
            }

            this.loading = true;
            this.error = null; // Reset error sebelum mencoba fetch

            try {
                // Gunakan Promise.allSettled untuk memungkinkan semua promise berjalan
                // meskipun ada yang gagal. Ini lebih tangguh daripada Promise.all.
                const results = await Promise.allSettled([
                    this.fetchMetrics(),
                    this.fetchLineChart(),
                    this.fetchTopPages(),
                    this.fetchDeviceChart(),
                    this.fetchReferrers(),
                    this.fetchEntryExitPages(),
                    this.fetchGeoMap(),
                ]);

                // Periksa hasil dari setiap promise.
                // Jika ada yang rejected, kita bisa mengumpulkan pesan error.
                const rejectedPromises = results.filter(result => result.status === 'rejected');
                if (rejectedPromises.length > 0) {
                    this.error = 'Some data failed to load. Please check console for details.';
                    rejectedPromises.forEach((rejected, index) => {
                        console.error(`Fetch operation ${index} failed:`, rejected.reason);
                    });
                }

            } catch (err) {
                // Tangani error yang mungkin terjadi jika Promise.all itu sendiri gagal (misalnya, masalah jaringan umum)
                this.error = err.response?.data?.error || 'Failed to fetch all overview data';
                console.error('Fetch all overview data critical error:', err);
            } finally {
                this.loading = false;
            }
        },

        // Fungsi pembantu untuk meminimalkan duplikasi kode error handling
        async _fetchData(endpoint, property, defaultValues, headersProperty = null, errorMessage) {
            try {
                // Tidak perlu mengatur this.loading di sini karena sudah diatur di fetchAllData
                // Atau jika kamu memanggil fungsi ini secara individual, kamu bisa mengatur loading per data,
                // tapi itu akan membuat loading spinner berkedip-kedip.
                const { data } = await axios.get(endpoint, {
                    params: { date_from: this.date_from, date_to: this.date_to }
                });

                // Memperbarui state berdasarkan tipe data yang diharapkan
                if (Array.isArray(this[property])) { // Untuk array seperti topPages, geoMap, referrers, entryExitPages
                    this[property] = data.items || defaultValues;
                    if (headersProperty && data.headers) {
                        this.headers[headersProperty] = data.headers;
                    }
                } else if (typeof this[property] === 'object' && property.endsWith('Chart')) { // Untuk objek chart
                    this[property] = {
                        title: data.title || defaultValues.title,
                        categories: data.categories || defaultValues.categories,
                        seriesData: data.seriesData || defaultValues.seriesData
                    };
                } else if (typeof this[property] === 'object' && property === 'metrics') { // Untuk objek metrics
                    this[property] = {
                        page_views: data.page_views || defaultValues.page_views,
                        visitors: data.visitors || defaultValues.visitors,
                        bounce_rate: data.bounce_rate || defaultValues.bounce_rate,
                        avg_duration: data.avg_duration || defaultValues.avg_duration
                    };
                } else {
                    // Penanganan umum jika tipe data tidak cocok dengan di atas
                    this[property] = data || defaultValues;
                }

            } catch (error) {
                // Atur error spesifik untuk fetch ini, tapi jangan menimpa `this.error` global
                // secara langsung jika ini dipanggil dari Promise.allSettled.
                // Jika kamu ingin menampilkannya di UI, kamu bisa membuat state error per bagian,
                // atau kumpulkan semua error di `fetchAllData`.
                // Untuk kesederhanaan, kita hanya log dan set nilai default.
                console.error(`${errorMessage} error:`, error);
                if (Array.isArray(this[property])) {
                    this[property] = defaultValues;
                    if (headersProperty) this.headers[headersProperty] = [];
                } else if (typeof this[property] === 'object' && property.endsWith('Chart')) {
                    this[property] = { ...defaultValues }; // Gunakan spread untuk objek default
                } else if (typeof this[property] === 'object' && property === 'metrics') {
                    this[property] = { ...defaultValues };
                } else {
                    this[property] = defaultValues;
                }
                // Kamu bisa mempertimbangkan untuk menyimpan error per-item juga jika perlu tampilan error granular.
                // Misalnya: this.errors.metrics = error.response?.data?.error
            }
        },

        async fetchMetrics() {
            await this._fetchData(
                '/api/admin/overview/metrics',
                'metrics',
                { page_views: 0, visitors: 0, bounce_rate: 0, avg_duration: '00:00' },
                null,
                'Fetch metrics'
            );
        },

        async fetchLineChart() {
            await this._fetchData(
                '/api/admin/overview/line-chart',
                'lineChart',
                { title: 'Page Views per Day', categories: [], seriesData: [] },
                null,
                'Fetch line chart'
            );
        },

        async fetchTopPages() {
            await this._fetchData(
                '/api/admin/overview/top-pages',
                'topPages',
                [],
                'topPages',
                'Fetch top pages'
            );
        },

        async fetchGeoMap() {
            await this._fetchData(
                '/api/admin/overview/geo-map',
                'geoMap',
                [],
                'geoMap',
                'Fetch geo map'
            );
        },

        async fetchDeviceChart() {
            await this._fetchData(
                '/api/admin/overview/device-chart',
                'deviceChart',
                { title: 'Device Type Distribution', categories: [], seriesData: [] },
                null,
                'Fetch device chart'
            );
        },

        async fetchReferrers() {
            await this._fetchData(
                '/api/admin/overview/referrers',
                'referrers',
                [],
                'referrers',
                'Fetch referrers'
            );
        },

        async fetchEntryExitPages() {
            await this._fetchData(
                '/api/admin/overview/entry-exit-pages',
                'entryExitPages',
                [],
                'entryExitPages',
                'Fetch entry/exit pages'
            );
        },
    }
})