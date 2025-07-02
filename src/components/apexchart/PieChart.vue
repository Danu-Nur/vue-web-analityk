<template>
    <VueApexCharts type="pie" height="400" :options="chartOptions" :series="seriesData" />
</template>

<script setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
    categories: {
        type: Array,
        default: () => [],
        validator: (categories) => categories.every((item) => typeof item === 'string'),
    },
    seriesData: {
        type: Array,
        default: () => [],
        validator: (series) => series.every((item) => typeof item === 'number' && item >= 0),
    },
});

const chartOptions = computed(() => ({
    chart: {
        type: 'pie',
        height: 400,
        toolbar: { show: false },
    },
    labels: props.categories.length ? props.categories : ['No Data'],
    series: props.seriesData.length ? props.seriesData : [1],
    // Aktifkan mode Monochrome
    // fill: {
    //     type: 'gradient',
    //     gradient: {
    //         shade: 'dark',
    //         type: 'horizontal',
    //         shadeIntensity: 0.4,
    //         inverseColors: false,
    //         opacityFrom: 0.9,
    //         opacityTo: 1,
    //         stops: [0, 100],
    //     },
    // },
    colors: ['#d1d5db'], // Base color abu-abu (Tailwind: gray-300)
    plotOptions: {
        pie: {
            expandOnClick: true,
            donut: {
                labels: {
                    show: false,
                },
            },
        },
    },
    theme: {
        monochrome: {
            enabled: true,
            color: '#9ca3af', // Base gray (Tailwind: gray-400)
            shadeTo: 'dark',
            shadeIntensity: 0.7,
        },
    },

    legend: {
        position: 'bottom',
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        labels: {
            colors: '#4b5563',
        },
    },
    dataLabels: {
        enabled: true,
        formatter: (val) => `${Math.round(val)}%`,
        style: {
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            // colors: ['#1f2937'], // Teks kontras
        },
    },
    tooltip: {
        theme: 'light',
        y: {
            formatter: (val) => `${val}%`,
        },
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                height: 300,
            },
            legend: {
                position: 'bottom',
            },
        },
    }],
}));
</script>
