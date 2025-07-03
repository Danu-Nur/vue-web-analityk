<template>
    <VueApexCharts type="area" height="500" :options="chartOptions" :series="series" />
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
    title: { type: String, default: 'Area Chart' },
    categories: { type: Array, default: () => [] },
    seriesData: { type: Array, default: () => [] },
    colors: {
        type: Array,
        default: () => ['#4b5563', '#9ca3af'] // Gray-600 and gray-400 for gradient
    }
})

const chartOptions = computed(() => ({
    chart: {
        id: 'area-chart',
        type: 'area',
        height: 400, // Sesuaikan dengan height di template
        // toolbar: { show: false },
        zoom: { enabled: false },
        // sparkline: { enabled: false } // Nonaktifkan sparkline untuk menampilkan sumbu
    },
    title: {
        text: props.title,
        align: 'center',
        style: { fontSize: '14px', fontWeight: 'bold' }
    },
    colors: props.colors, // Gunakan prop colors
    dataLabels: { enabled: false },
    stroke: {
        curve: 'smooth',
        width: 2,
        colors: props.colors // Gunakan prop colors untuk garis
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
        categories: props.categories.length ? props.categories : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
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
            }
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
            format: 'MMM dd'
        },
        y: {
            formatter: (value) => `${value}`
        }
    }
}))

const series = computed(() => [
    {
        name: props.title,
        data: props.seriesData.length ? props.seriesData : [0, 0, 0, 0, 0, 0, 0]
    }
])
</script>