<template>
    <apexchart type="pie" height="350" :options="chartOptions" :series="series" />
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

defineProps({
    labels: { type: Array, default: () => [] },
    series: { type: Array, default: () => [] }
})

const chartOptions = computed(() => ({
    labels,
    legend: { position: 'bottom' }
}))
</script>
