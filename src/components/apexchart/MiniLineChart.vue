<template>
    <div class="w-full h-full justify-center items-center flex">
        <VueApexCharts type="line" width="200" height="60" :options="chartOptions" :series="series" />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
    title: { type: String, default: 'Line Chart' },
    categories: { type: Array, default: () => [] },
    seriesData: { type: Array, default: () => [] },
    colors: {
        type: Array,
        default: () => ['#000000', '#F59E0B'], // Default colors (black, amber)
    },
});

const chartOptions = computed(() => ({
    chart: {
        id: 'line-chart',
        toolbar: { show: false }, // Hide toolbar
        zoom: { enabled: false }, // Disable zoom
        animations: { enabled: false }, // Optional: Disable animations for minimal look
        background: '', // Set background color (customize as needed)
    },
    title: {
        text: undefined, // Hide title
        show: false,
    },
    xaxis: {
        labels: { show: false }, // Hide x-axis labels
        axisTicks: { show: false }, // Hide x-axis ticks
        axisBorder: { show: false }, // Hide x-axis border
        categories: props.categories, // Still pass categories for data alignment
    },
    yaxis: {
        labels: { show: false }, // Hide y-axis labels
        axisTicks: { show: false }, // Hide y-axis ticks
        axisBorder: { show: false }, // Hide y-axis border
    },
    grid: {
        show: false, // Hide grid lines
    },
    stroke: {
        curve: 'smooth', // Smooth line curve
        width: 2, // Line thickness
    },
    colors: props.colors, // Apply custom colors
    dataLabels: {
        enabled: false, // Hide data labels
    },
    tooltip: {
        enabled: false, // Disable tooltips
    },
    markers: {
        size: 0, // Hide data points/markers
    },
    legend: {
        show: false, // Hide legend
    },
}));

const series = computed(() => [{ name: props.title, data: props.seriesData }]);
</script>