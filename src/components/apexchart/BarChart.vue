<template>
    <VueApexCharts type="bar" class="h-full w-full" :height="props.height" :options="chartOptions" :series="series" />
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
    title: { type: String, default: 'Bar Chart' },
    categories: { type: Array, default: () => [] },
    seriesData: {
        type: Array,
        default: () => [{ name: 'Series 1', data: [] }], // Default to single series
        validator: (series) => series.every(s => s.name && Array.isArray(s.data))
    },
    colors: {
        type: Array,
        default: () => ['#F59E0B','#000000'] // Default colors (blue, green, amber)
    },
    height: {
        type: Number,
        default: 450
    }
})

const chartOptions = computed(() => ({
    chart: { id: 'bar-chart', height: props.height },
    title: {
        text: props.title,
        align: 'left',
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
            borderRadius: 4
        }
    },
    colors: props.colors,
    dataLabels: { enabled: false },
    tooltip: {
        shared: true,
        intersect: false,
        style: { fontSize: '12px' }
    },
    grid: {
        borderColor: '#e5e7eb',
        strokeDashArray: 4
    }
}))

const series = computed(() => {
    // Check if seriesData is a single array (backward compatibility) or array of series objects
    if (Array.isArray(props.seriesData) && props.seriesData.length > 0 && !props.seriesData[0].name) {
        return [{ name: props.title, data: props.seriesData }]
    }
    return props.seriesData
})
</script>