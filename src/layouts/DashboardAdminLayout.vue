<template>
    <div class="text-gray-900 h-full min-h-screen relative">
        <HeaderAdmin />
        <main class="mx-auto px-4 sm:px-6 lg:px-12 py-6 ">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h1 class="text-2xl sm:text-3xl font-extrabold leading-tight text-gray-900 mb-4 md:mb-0 drop-shadow-lg">
                    {{ pageTitle }}
                </h1>
                <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <select v-model="selectedRange"
                        class="card-new rounded-md py-2 px-4 w-full sm:w-auto bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option v-for="range in dateRanges" :key="range.value" :value="range.value">
                            {{ range.label }}
                        </option>
                    </select>

                    <DateRangePicker v-if="selectedRange === 'custom'" :startDate="customRange.startDate"
                        :endDate="customRange.endDate" @update:startDate="handleCustomStartDateChange"
                        @update:endDate="handleCustomEndDateChange" />

                    <button
                        class="bg-blue-600 text-white font-semibold rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-auto"
                        type="button">
                        Download
                    </button>
                </div>
            </div>
            <router-view v-slot="{ Component }">
                <!-- <keep-alive> -->
                    <component :is="Component" />
                <!-- </keep-alive> -->
            </router-view>
        </main>

        <Transition name="fade">
            <div v-if="isLoading" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div class="loader"></div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOverviewStore } from '../store/admin/overviewStore';
import { useVisitorStore } from '../store/admin/visitorStore';
import { useBehaviorStore } from '../store/admin/behaviorStore';
import { useConversionStore } from '../store/admin/conversionStore';
import HeaderAdmin from './dashboardadmin/HeaderAdmin.vue';
import DateRangePicker from '../components/ui/DateRangePicker.vue';

const route = useRoute();
const router = useRouter();
const overviewStore = useOverviewStore();
const visitorStore = useVisitorStore();
const behaviorStore = useBehaviorStore();
const conversionStore = useConversionStore();

const pageTitle = computed(() => route.meta.title || 'Dashboard');
const isLoading = ref(false);

const dateRanges = [
    { label: 'Hari Ini', value: 'today' },
    { label: '1 Bulan Lalu', value: '1month_ago' },
    { label: '3 Bulan Lalu', value: '3months_ago' },
    { label: 'Kustom', value: 'custom' },
];

// State lokal untuk selectedRange dan customRange. Ini akan disinkronkan dengan URL.
const selectedRange = ref('1month_ago'); // Default awal
const customRange = ref({
    startDate: null,
    endDate: null,
});

// Computed property untuk mendapatkan store yang aktif berdasarkan rute saat ini
const activeStore = computed(() => {
    switch (route.name) {
        case 'admin.overview':
            return overviewStore;
        case 'admin.visitor':
            return visitorStore;
        case 'admin.behavior':
            return behaviorStore;
        case 'admin.conversion':
            return conversionStore;
        default:
            return overviewStore; // Default ke overviewStore
    }
});

// Helper: Format tanggal ke YYYY-MM-DD HH:mm:ss untuk API
const formatApiDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        console.error('Invalid date for API formatting:', date);
        return null;
    }
    return d.toISOString().slice(0, 19).replace('T', ' ');
};

// Helper: Parse string tanggal dari URL (YYYY-MM-DD) ke objek Date
const parseDateString = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    // Flatpickr menggunakan format YYYY-MM-DD, kita tambahkan waktu agar tidak ada masalah timezone
    // Saat diinisialisasi dari string YYYY-MM-DD, bisa jadi dianggap tengah malam UTC
    // dan bergeser ke hari sebelumnya di timezone lokal.
    // Menambahkan 'T00:00:00' atau waktu spesifik akan membantu konsistensi.
    const d = new Date(`${dateString}T00:00:00`);
    return isNaN(d.getTime()) ? null : d;
};

// --- Fungsi Utama untuk Mengelola Tanggal dan URL ---

// Fungsi untuk memperbarui parameter query di URL
const updateUrlParams = () => {
    const query = { range: selectedRange.value };
    if (selectedRange.value === 'custom' && customRange.value.startDate && customRange.value.endDate) {
        // Flatpickr menggunakan format YYYY-MM-DD, jadi simpan di URL dalam format itu
        query.from = customRange.value.startDate.toISOString().split('T')[0];
        query.to = customRange.value.endDate.toISOString().split('T')[0];
    } else {
        // Jika bukan custom, hapus parameter from dan to dari URL
        delete query.from;
        delete query.to;
    }

    // Ganti URL tanpa navigasi ulang halaman penuh
    // Gunakan { path: route.path, query } untuk memastikan hanya query yang berubah
    router.replace({ path: route.path, query }).catch(err => {
        // Tangani error jika navigasi sama
        if (err.name !== 'NavigationDuplicated') {
            console.error('Failed to update URL query params:', err);
        }
    });
};

// Fungsi untuk menghitung rentang tanggal berdasarkan selectedRange LOKAL
// dan memperbarui customRange LOKAL, lalu set ke store dan fetch data.
const calculateSetDatesAndFetch = async () => {
    const now = new Date();
    let tempDateFrom = null;
    let tempDateTo = null;

    if (selectedRange.value === 'today') {
        tempDateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        tempDateTo = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    } else if (selectedRange.value === '1month_ago') {
        tempDateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        tempDateFrom.setHours(0, 0, 0, 0); // Pastikan waktu di set ke awal hari
        tempDateTo = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999); // Akhir hari ini
    } else if (selectedRange.value === '3months_ago') {
        tempDateFrom = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        tempDateFrom.setHours(0, 0, 0, 0); // Pastikan waktu di set ke awal hari
        tempDateTo = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999); // Akhir hari ini
    } else if (selectedRange.value === 'custom') {
        // Jika mode custom, ambil dari customRange lokal
        tempDateFrom = customRange.value.startDate;
        tempDateTo = customRange.value.endDate;
    }

    // Perbarui customRange lokal (penting untuk DateRangePicker)
    customRange.value.startDate = tempDateFrom;
    customRange.value.endDate = tempDateTo;

    // Set tanggal di store aktif dan panggil fetch data
    if (activeStore.value && tempDateFrom && tempDateTo) {
        const fromApi = formatApiDate(tempDateFrom);
        const toApi = formatApiDate(tempDateTo);
        // Hanya perbarui store jika ada perubahan yang signifikan
        if (activeStore.value.date_from !== fromApi || activeStore.value.date_to !== toApi) {
            activeStore.value.setDateRange(fromApi, toApi);
            await fetchActiveStoreData(true);
        }
    }
};

// Fungsi untuk mengambil data dari store yang aktif
const fetchActiveStoreData = async (forceRefresh = false) => {
    if (activeStore.value) {
        try {
            isLoading.value = true;
            await activeStore.value.fetchAllData(forceRefresh);
        } catch (error) {
            console.error('Gagal mengambil data dari store aktif:', error);
        } finally {
            isLoading.value = false;
        }
    } else {
        console.warn('Tidak ada store aktif yang ditemukan untuk mengambil data.');
    }
};

// --- Handler Event DateRangePicker ---

// Handle perubahan startDate dari DateRangePicker
const handleCustomStartDateChange = (date) => {
    customRange.value.startDate = date;
    // Panggil pembaruan dan fetch hanya jika kedua tanggal lengkap
    if (customRange.value.startDate && customRange.value.endDate) {
        updateUrlParams(); // Simpan ke URL
        calculateSetDatesAndFetch();
    }
};

// Handle perubahan endDate dari DateRangePicker
const handleCustomEndDateChange = (date) => {
    customRange.value.endDate = date;
    // Panggil pembaruan dan fetch hanya jika kedua tanggal lengkap
    if (customRange.value.startDate && customRange.value.endDate) {
        updateUrlParams(); // Simpan ke URL
        calculateSetDatesAndFetch();
    }
};

// --- Watchers ---

// Watcher untuk selectedRange LOKAL: saat berubah, perbarui URL dan panggil fungsi utama
watch(selectedRange, async (newRange, oldRange) => {
    // Selalu update URL saat selectedRange berubah, bahkan jika nilai awalnya sama
    // Ini penting jika URL diubah secara manual oleh user.
    updateUrlParams();

    if (newRange !== 'custom') {
        // Jika beralih dari 'custom' ke range preset, langsung panggil calculateSetDatesAndFetch
        await calculateSetDatesAndFetch();
    } else {
        // Ketika beralih ke 'custom', inisialisasi customRange dari URL jika ada.
        // Jika tidak ada di URL, inisialisasi dengan rentang default (misal hari ini).
        const fromQuery = route.query.from;
        const toQuery = route.query.to;
        if (fromQuery && toQuery) {
            customRange.value.startDate = parseDateString(fromQuery);
            customRange.value.endDate = parseDateString(toQuery);
        } else {
            // Default jika tidak ada di URL dan beralih ke 'custom'
            const now = new Date();
            customRange.value.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
            customRange.value.endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        }
        // Setelah customRange diperbarui, panggil fetch
        calculateSetDatesAndFetch();
    }
});

// Watcher untuk perubahan rute: Ini adalah titik masuk utama saat berpindah halaman.
watch(
    () => route.fullPath, // Ini akan terpicu ketika URL, termasuk query, berubah
    async (newFullPath, oldFullPath) => {
        if (newFullPath !== oldFullPath) { // Hanya proses jika URL benar-benar berbeda
            const queryRange = route.query.range || '1month_ago';
            const queryFrom = route.query.from;
            const queryTo = route.query.to;

            selectedRange.value = queryRange; // Set state lokal dari URL

            if (queryRange === 'custom' && queryFrom && queryTo) {
                customRange.value.startDate = parseDateString(queryFrom);
                customRange.value.endDate = parseDateString(queryTo);
            } else {
                customRange.value.startDate = null;
                customRange.value.endDate = null;
            }

            await calculateSetDatesAndFetch(); // Kemudian panggil untuk update store dan fetch data
        }
    },
    { immediate: true } // Jalankan ini saat komponen pertama kali dimuat
);


// --- Inisialisasi Saat Komponen Dimuat ---
// onMounted tidak lagi diperlukan untuk inisialisasi awal karena { immediate: true } di watcher route.fullPath akan menangani ini.
// Namun, kita bisa tetap memiliki onMounted jika ada logika lain yang perlu dijalankan.
// Di sini, kita akan mengandalkan watcher route.fullPath dengan immediate: true.
/*
onMounted(async () => {
    // Logika inisialisasi awal kini ditangani oleh watcher route.fullPath dengan immediate: true
    // Ini memastikan bahwa state awal diset dari URL saat komponen pertama kali dimuat.
});
*/

// Router guards untuk mengelola state loading saat navigasi halaman
router.beforeEach((to, from, next) => {
    isLoading.value = true;
    next();
});

router.afterEach(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 300);
});
</script>

<style scoped>
select,
.date-range-picker {
    min-width: 150px;
}

/* Transisi Fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Gaya Spinner Loading (contoh sederhana) */
.loader {
    border: 8px solid #f3f3f3;
    /* Light grey */
    border-top: 8px solid #3498db;
    /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>