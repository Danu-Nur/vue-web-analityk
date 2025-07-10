<template>
    <VueApexCharts type="pie" height="400" :options="chartOptions" :series="processedSeriesData" />
</template>

<script setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
    categories: {
        type: Array,
        default: () => [],
        validator: (categories) => categories.every((item) => typeof item === 'string'),
    },
    seriesData: {
        type: Array,
        default: () => [],
        validator: (series) => series.every((item) => typeof item === 'number' && item >= 0),
    },
    satuan: {
        type: String,
        default: '',
    },
    chartColors: {
        type: Array,
        default: () => [],
    },
    monochromeEnabled: {
        type: Boolean,
        default: true,
    },
    monochromeColor: {
        type: String,
        default: '#9ca3af',
    },
});

const processedSeriesData = computed(() => {
    if (!props.seriesData || props.seriesData.length === 0) {
        return [1];
    }
    return props.seriesData;
});

const processedCategories = computed(() => {
    if (!props.categories || props.categories.length === 0 || props.categories.length !== processedSeriesData.value.length) {
        if (processedSeriesData.value.length === 1 && processedSeriesData.value[0] === 1) {
            return ['No Data'];
        }
        return Array.from({ length: processedSeriesData.value.length }, (_, i) => `Item ${i + 1}`);
    }
    return props.categories;
});

const chartOptions = computed(() => ({
    chart: {
        type: 'pie',
        height: 400,
        toolbar: { show: false },
    },
    labels: processedCategories.value,

    colors: props.monochromeEnabled ? undefined : (props.chartColors.length > 0 ? props.chartColors : ['#F59E0B', '#000000', '#10B981', '#EF4444', '#3B82F6']),

    plotOptions: {
        pie: {
            expandOnClick: true,
            donut: {
                labels: {
                    show: false,
                },
            },
        },
    },
    theme: {
        monochrome: {
            enabled: props.monochromeEnabled,
            color: props.monochromeColor,
            shadeTo: 'dark',
            shadeIntensity: 0.7,
        },
    },
    legend: {
        position: 'bottom',
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        labels: {
            colors: '#4b5563',
        },
    },
    dataLabels: {
        enabled: true,
        formatter: (val) => `${Math.round(val)}%`,
        style: {
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            // --- PERUBAHAN DI SINI ---
            colors: ['#FFFFFF'], // Mengatur warna teks dataLabels menjadi putih
            // ------------------------
        },
    },
    tooltip: {
        theme: 'light',
        y: {
            formatter: (val) => `${val}${props.satuan}`,
        },
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                height: 300,
            },
            legend: {
                position: 'bottom',
            },
        },
    }],
}));
</script>

<style scoped>
/* Tidak ada gaya khusus yang diperlukan di sini. */
</style>