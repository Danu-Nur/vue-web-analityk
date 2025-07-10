<template>
    <VueApexCharts type="area" class="w-full h-full" :options="chartOptions" :series="chartSeries" />
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
    title: {
        type: String,
        default: 'Area Chart'
    },
    categories: {
        type: Array,
        default: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] // Default categories
    },
    seriesData: {
        type: Array,
        default: () => [{ name: 'Series 1', data: [0, 0, 0, 0, 0, 0, 0] }], // Default with example data
        validator: (series) => series.every(s => typeof s === 'object' && s !== null && 'name' in s && Array.isArray(s.data))
    },
    colors: {
        type: Array,
        default: () => ['#F59E0B', '#000000'] // Default colors for gradient
    }
})

// Opsi grafik yang dihitung berdasarkan props
const chartOptions = computed(() => ({
    chart: {
        id: 'area-chart',
        type: 'area',
        zoom: { enabled: false },
    },
    title: {
        text: props.title,
        align: 'left',
        style: { fontSize: '14px', fontWeight: 'bold' }
    },
    colors: props.colors,
    dataLabels: { enabled: false },
    stroke: {
        curve: 'smooth',
        width: 2,
        colors: props.colors
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [0, 90, 100]
        }
    },
    xaxis: {
        categories: props.categories, // Langsung gunakan prop categories
        labels: {
            style: {
                colors: '#9ca3af',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif'
            }
        },
        axisBorder: {
            show: true,
            color: '#e5e7eb'
        },
        axisTicks: {
            show: true,
            color: '#e5e7eb'
        }
    },
    yaxis: {
        labels: {
            show: true,
            style: {
                colors: '#9ca3af',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif'
            },
            // Tambahkan formatter sederhana jika dibutuhkan
            // formatter: (value) => `${value}`
        }
    },
    grid: {
        borderColor: '#e5e7eb',
        strokeDashArray: 4,
        xaxis: {
            lines: { show: true }
        },
        yaxis: {
            lines: { show: true }
        }
    },
    tooltip: {
        theme: 'light',
        x: {
            format: 'MMM dd' // Format default untuk tanggal
        },
        y: {
            formatter: (value) => `${value}`
        }
    }
}))

// Memastikan format series selalu sesuai dengan yang diharapkan ApexCharts
const chartSeries = computed(() => {
    // Jika seriesData memiliki format lama (array angka), konversi ke format baru
    if (props.seriesData.length > 0 && typeof props.seriesData[0] !== 'object') {
        console.warn("Using old seriesData format. Please update to [{ name: '...', data: [...] }] for better clarity.");
        return [{ name: props.title, data: props.seriesData }];
    }
    return props.seriesData;
});
</script>