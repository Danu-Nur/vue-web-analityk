<template>
    <div class="relative w-full h-full overflow-y-auto aspect-video">
        <div :style="{ height: `${scaledIframeHeight}px` }">
            <div class="iframe-wrapper" :style="{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: `${1280 / scale}px`,
                height: `${baseIframeHeight / scale}px`, // Menggunakan baseIframeHeight untuk skala
            }">
                <iframe :src="websiteUrl" class="w-[1280px] h-full absolute top-0 left-0 z-0" ref="websiteIframe"
                    @load="handleIframeLoad" title="Website Preview"></iframe>
                <div v-if="!isCrossOrigin" class="absolute top-0 left-0 w-[1280px] z-10 bg-transparent"
                    :style="{ height: `${baseIframeHeight / scale}px` }">
                    <div v-for="(item, index) in heatmapData.items" :key="index" :title="`${item.clicks} clicks`"
                        class="absolute rounded-full pointer-events-none" :style="{
                            left: `${item.x}px`,
                            top: `${item.y}px`,
                            width: `${Math.min(item.clicks, 50)}px`, // Ukuran maksimal 50px
                            height: `${Math.min(item.clicks, 50)}px`, // Ukuran maksimal 50px
                            backgroundColor: getColor(item.clicks),
                            opacity: 0.4,
                            transform: 'translate(-50%, -50%)',
                        }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';

const props = defineProps({
    websiteUrl: {
        type: String,
        required: true, // websiteUrl seharusnya wajib ada
        default: 'about:blank' // Default agar tidak error jika tidak ada URL
    },
    heatmapData: {
        type: Object,
        default: () => ({ items: [] }),
        validator: (data) => data && Array.isArray(data.items) && data.items.every(item => typeof item.x === 'number' && typeof item.y === 'number' && typeof item.clicks === 'number')
    },
    scale: {
        type: Number,
        default: 1,
        validator: (value) => value > 0 // Skala harus lebih dari 0
    },
    defaultIframeHeight: { // Prop baru untuk tinggi default iframe
        type: Number,
        default: 720
    }
});

const websiteIframe = ref(null);
const baseIframeHeight = ref(props.defaultIframeHeight); // Tinggi iframe aktual tanpa skala
const isCrossOrigin = ref(false); // Flag untuk menandai jika iframe adalah cross-origin

let resizeObserver = null;

// Tinggi iframe yang sudah diskalakan, digunakan untuk div pembungkus
const scaledIframeHeight = computed(() => {
    return Math.max(baseIframeHeight.value * props.scale, props.defaultIframeHeight);
});

// Fungsi untuk mendapatkan warna berdasarkan jumlah klik
const getColor = (clicks) => {
    if (clicks <= 25) return 'rgba(0, 161, 0, 0.5)'; // Hijau muda
    if (clicks <= 50) return 'rgba(100, 180, 50, 0.5)'; // Hijau kekuningan
    if (clicks <= 100) return 'rgba(180, 200, 50, 0.5)'; // Kuning hijau
    if (clicks <= 300) return 'rgba(255, 200, 0, 0.5)'; // Kuning terang
    if (clicks <= 500) return 'rgba(255, 160, 0, 0.5)'; // Oranye terang
    if (clicks <= 800) return 'rgba(255, 100, 0, 0.5)'; // Oranye pekat
    if (clicks <= 1000) return 'rgba(255, 60, 0, 0.5)'; // Merah-oranye
    return 'rgba(220, 0, 0, 0.5)'; // Merah pekat
};

// Menangani event 'load' iframe
const handleIframeLoad = () => {
    const iframe = websiteIframe.value;
    if (!iframe) return;

    try {
        // Mencoba mengakses contentDocument
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        // Jika berhasil, berarti bukan cross-origin
        isCrossOrigin.value = false;

        // Tambahkan event listener hanya jika bukan cross-origin
        iframeDoc.addEventListener('click', handleIframeClick);

        // Update tinggi awal dan siapkan ResizeObserver
        updateIframeHeight();
        resizeObserver = new ResizeObserver(updateIframeHeight);
        resizeObserver.observe(iframeDoc.documentElement);

    } catch (e) {
        // Jika terjadi error (biasanya SecurityError), berarti cross-origin
        console.warn('Iframe cross-origin, tidak bisa akses konten:', e);
        isCrossOrigin.value = true;
        baseIframeHeight.value = props.defaultIframeHeight; // Tetapkan tinggi default
    }
};

// Handler untuk klik di dalam iframe (jika tidak cross-origin)
const handleIframeClick = (event) => {
    const x = Math.floor(event.clientX / props.scale);
    const y = Math.floor(event.clientY / props.scale);

    // Emit event untuk memberitahu parent tentang klik baru
    emit('heatmapClick', { x, y });

    // Opsional: Langsung update data di sini jika komponen ini bertanggung jawab penuh
    // untuk menambahkan klik baru ke heatmapData
    // const existingItem = props.heatmapData.items.find(item => item.x === x && item.y === y);
    // if (existingItem) {
    //     existingItem.clicks++;
    // } else {
    //     props.heatmapData.items.push({ x, y, clicks: 1 });
    // }
};

// Memperbarui tinggi iframe berdasarkan konten
const updateIframeHeight = () => {
    const iframe = websiteIframe.value;
    if (iframe && !isCrossOrigin.value) {
        const contentHeight = iframe.contentDocument?.documentElement.scrollHeight || props.defaultIframeHeight;
        baseIframeHeight.value = Math.max(contentHeight, props.defaultIframeHeight);
    } else if (isCrossOrigin.value) {
        baseIframeHeight.value = props.defaultIframeHeight;
    }
};

// Emit event kustom
const emit = defineEmits(['heatmapClick']);

onMounted(() => {
    // Pastikan iframe sudah dimuat saat komponen dipasang jika websiteUrl sudah ada
    // Jika iframe sudah dimuat sebelum onMounted, handleIframeLoad akan dipanggil melalui @load
    if (websiteIframe.value && websiteIframe.value.contentDocument && websiteIframe.value.contentDocument.readyState === 'complete') {
        handleIframeLoad();
    }
});

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect();
    }
    // Hapus event listener saat komponen di-unmount
    const iframe = websiteIframe.value;
    if (iframe && !isCrossOrigin.value) {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.removeEventListener('click', handleIframeClick);
        } catch (e) {
            // Abaikan error jika iframe sudah tidak bisa diakses
        }
    }
});

// Watcher untuk perubahan scale atau data heatmap
watch(
    () => [props.scale, props.heatmapData.items.length], // Hanya watch panjang array untuk performa
    () => {
        updateIframeHeight(); // Perbarui tinggi jika skala berubah atau ada item baru (opsional)
    },
    { deep: false } // deep: true tidak diperlukan jika hanya watching length atau primitif
);

// Watcher untuk perubahan websiteUrl
watch(() => props.websiteUrl, () => {
    // Reset state ketika URL berubah
    isCrossOrigin.value = false;
    baseIframeHeight.value = props.defaultIframeHeight;
    if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
    }
});
</script>

<style scoped>
iframe {
    border: none;
    /* Tambahkan gaya reset dasar jika perlu */
    margin: 0;
    padding: 0;
}

.iframe-wrapper {
    position: relative;
    /* max-width: 100%; - ini tidak diperlukan jika width sudah fix 1280px */
    margin: 0;
    /* Pastikan margin 0 untuk transform origin */
    padding: 0;
}

/* Hindari pointer events pada elemen heatmap agar klik bisa tembus ke iframe */
.pointer-events-none {
    pointer-events: none;
}
</style>