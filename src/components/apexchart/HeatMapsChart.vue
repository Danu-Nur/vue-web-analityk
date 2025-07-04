<template>
    <div class="relative w-full h-full overflow-y-auto aspect-video">
        <div :style="{ height: `${iframeHeight}px` }">
            <div class="iframe-container" :style="{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: `${1280 / scale}px`,
                height: `${iframeHeight / scale}px`,
                margin: '0',
                padding: '0',
            }">
                <iframe :src="websiteUrl" class="w-[1280px] h-full absolute top-0 left-0 z-0" ref="websiteIframe"
                    @load="initHeatmap"></iframe>
                <div class="absolute top-0 left-0 w-[1280px] z-10 bg-transparent" :style="{ height: `${iframeHeight / scale}px` }">
                    <div v-for="(item, index) in heatmapData.items" :key="index" :title="`${item.clicks}` + 'click'"
                        class="absolute rounded-full" :style="{
                            left: `${item.x}px`,
                            top: `${item.y}px`,
                            width: `${item.clicks < 50 ? item.clicks : 50}px`,
                            height: `${item.clicks < 50 ? item.clicks : 50}px`,
                            backgroundColor: getColor(item.clicks),
                            opacity: 0.4,
                            transform: 'translate(-50%, -50%)'
                        }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
    websiteUrl: String,
    heatmapData: {
        type: Object,
        default: () => ({
            items: [],
        }),
    },
    scale: {
        type: Number,
        default: 1,
    },
});

const websiteIframe = ref(null);
const heatmapContainer = ref(null);
const iframeHeight = ref(720);
let resizeObserver = null;

const getColor = (clicks) => {
    if (clicks <= 25) return 'rgba(0, 161, 0, 0.5)';           // Hijau muda
    if (clicks <= 50) return 'rgba(100, 180, 50, 0.5)';        // Hijau kekuningan
    if (clicks <= 100) return 'rgba(180, 200, 50, 0.5)';        // Kuning hijau
    if (clicks <= 300) return 'rgba(255, 200, 0, 0.5)';         // Kuning terang
    if (clicks <= 500) return 'rgba(255, 160, 0, 0.5)';         // Oranye terang
    if (clicks <= 800) return 'rgba(255, 100, 0, 0.5)';         // Oranye pekat
    if (clicks <= 1000) return 'rgba(255, 60, 0, 0.5)';         // Merah-oranye
    return 'rgba(220, 0, 0, 0.5)';                             // Merah pekat
};



const initHeatmap = () => {
    const iframe = websiteIframe.value;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    try {
        iframeDoc.addEventListener('click', (event) => {
            const x = Math.floor(event.clientX / props.scale);
            const y = Math.floor(event.clientY / props.scale);
            props.heatmapData.items.push({ x, y, clicks: 1 });
            updateHeatmap();
        });

        const updateHeight = () => {
            const contentHeight = iframeDoc.documentElement.scrollHeight;
            iframeHeight.value = Math.max(contentHeight * props.scale, 720);
            if (heatmapContainer.value) {
                heatmapContainer.value.style.height = `${contentHeight}px`;
            }
        };

        updateHeight();
        resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(iframeDoc.documentElement);
    } catch (e) {
        console.warn('Iframe cross-origin, tidak bisa akses konten:', e);
        iframeHeight.value = 900;
    }
};

const updateHeatmap = () => {
    const iframe = websiteIframe.value;
    const height = iframe?.contentDocument?.documentElement.scrollHeight || 720;
    iframeHeight.value = Math.max(height * props.scale, 720);
    if (heatmapContainer.value) {
        heatmapContainer.value.style.height = `${height}px`;
    }
};

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect();
    }
});

watch(
    () => [props.heatmapData.items.length, props.scale],
    () => {
        updateHeatmap();
    },
    { deep: true }
);
</script>

<style scoped>
iframe {
    border: none;
}

.iframe-container {
    position: relative;
    max-width: 100%;
    margin: 0 -100 0 0;
    padding: 0;
}
</style>