<template>
    <VueApexCharts type="area" height="500" :options="chartOptions" :series="series" />
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
    title: { type: String, default: 'Area Chart' },
    categories: { type: Array, default: () => [] },
    // seriesData: { type: Array, default: () => [] },
    seriesData: {
        type: Array,
        default: () => [{ name: 'Series 1', data: [] }], // Default to single series
        validator: (series) => series.every(s => s.name && Array.isArray(s.data))
    },
    colors: {
        type: Array,
        default: () => ['#F59E0B','#000000'] // Gray-600 and gray-400 for gradient
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

const series = computed(() => {
    // Check if seriesData is a single array (backward compatibility) or array of series objects
    if (Array.isArray(props.seriesData) && props.seriesData.length > 0 && !props.seriesData[0].name) {
        return [{ name: props.title, data: props.seriesData }]
    }
    return props.seriesData
})

// const series = computed(() => [
//     {
//         name: props.title,
//         data: props.seriesData.length ? props.seriesData : [0, 0, 0, 0, 0, 0, 0]
//     }
// ])
</script>