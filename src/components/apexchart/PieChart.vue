<template>
    <VueApexCharts type="pie" height="350" :options="chartOptions" :series="series" />
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
    labels: { type: Array, default: () => [] },
    series: { type: Array, default: () => [] }
})



const chartOptions = computed(() => ({
    labels,
    legend: { position: 'bottom' }
}))
</script>
