<template>
    <VueApexCharts type="line" height="400" :options="chartOptions" :series="series" />
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
    title: { type: String, default: 'Line Chart' },
    categories: { type: Array, default: () => [] },
    seriesData: { type: Array, default: () => [] },
    colors: {
        type: Array,
        default: () => ['#000000', '#F59E0B'] // Default colors (blue, green, amber)
    }
})

const chartOptions = computed(() => ({
    chart: { id: 'line-chart',zoom: { enabled: false }, },
    title: {
        text: props.title,
        align: 'center',
        style: { fontSize: '14px', fontWeight: 'bold' }
    },
    xaxis: {
        categories: props.categories,
        labels: { style: { fontSize: '12px' } }
    },
    stroke: { curve: 'smooth', width: 2, },
    colors: props.colors,
    dataLabels: { enabled: false },
    tooltip: { shared: true, intersect: false }
}))

const series = computed(() => [{ name: props.title, data: props.seriesData }])
</script>