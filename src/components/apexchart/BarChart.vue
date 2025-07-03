<template>
    <VueApexCharts type="bar" class="h-full" :height="props.height" :options="chartOptions" :series="series" />
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
    title: { type: String, default: 'Bar Chart' },
    categories: { type: Array, default: () => [] },
    seriesData: { type: Array, default: () => [] },
    colors: {
        type: Array,
        default: () => ['#000000', '#F59E0B'] // Default colors (blue, green, amber)
    },
    height: {
        type: Number, default: 450
    }
})

const chartOptions = computed(() => ({
    chart: { id: 'bar-chart', height: 500 },
    title: {
        text: props.title,
        align: 'center',
        style: { fontSize: '16px', fontWeight: 'bold' }
    },
    xaxis: {
        categories: props.categories,
        labels: { style: { fontSize: '12px' } }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 4 // Adds slight rounding to bars
        }
    },
    colors: props.colors, // Use colors from props
    dataLabels: { enabled: false },
    tooltip: {
        shared: true,
        intersect: false,
        style: { fontSize: '12px' }
    },
    grid: {
        borderColor: '#e5e7eb', // Light grid lines
        strokeDashArray: 4
    }
}))

const series = computed(() => [{ name: props.title, data: props.seriesData }])
</script>