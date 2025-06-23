<template>
    <apexchart type="line" height="350" :options="chartOptions" :series="series" />
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

defineProps({
    title: { type: String, default: 'Line Chart' },
    categories: { type: Array, default: () => [] },
    seriesData: { type: Array, default: () => [] }
})

const chartOptions = computed(() => ({
    chart: { id: 'line-chart' },
    title: { text: title },
    xaxis: { categories },
    stroke: { curve: 'smooth' },
    dataLabels: { enabled: false },
    tooltip: { shared: true, intersect: false }
}))

const series = computed(() => [{ name: title, data: seriesData }])
</script>