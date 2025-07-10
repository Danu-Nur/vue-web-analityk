<template>
    <VueApexCharts type="bar" class="h-full w-full" :height="props.height" :options="chartOptions"
        :series="chartSeries" />
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
    title: {
        type: String,
        default: 'Bar Chart'
    },
    categories: {
        type: Array,
        default: () => ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'] // Default categories
    },
    seriesData: {
        type: Array,
        default: () => [{ name: 'Series 1', data: [10, 41, 35, 51, 49] }], // Default with example data
        validator: (series) => series.every(s => typeof s === 'object' && s !== null && 'name' in s && Array.isArray(s.data))
    },
    colors: {
        type: Array,
        default: () => ['#F59E0B', '#000000'] // Default colors
    },
    height: {
        type: Number,
        default: 450
    }
})

const chartOptions = computed(() => ({
    chart: {
        id: 'bar-chart',
        height: props.height,
        toolbar: { show: false } // Seringkali toolbar tidak diperlukan untuk bar chart sederhana
    },
    title: {
        text: props.title,
        align: 'left',
        style: { fontSize: '16px', fontWeight: 'bold' }
    },
    xaxis: {
        categories: props.categories, // Langsung gunakan prop categories
        labels: {
            style: {
                fontSize: '12px',
                colors: '#9ca3af', // Menambahkan warna label agar konsisten
                fontFamily: 'Inter, sans-serif' // Menambahkan font family
            }
        },
        axisBorder: { show: true, color: '#e5e7eb' },
        axisTicks: { show: true, color: '#e5e7eb' }
    },
    yaxis: {
        labels: {
            style: {
                fontSize: '12px',
                colors: '#9ca3af', // Menambahkan warna label agar konsisten
                fontFamily: 'Inter, sans-serif' // Menambahkan font family
            }
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadiusApplication: 'end', // Menerapkan border radius hanya di akhir bar
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
        strokeDashArray: 4,
        xaxis: {
            lines: { show: false } // Umumnya garis grid vertikal tidak terlalu penting di bar chart
        },
        yaxis: {
            lines: { show: true }
        }
    }
}))

// Memastikan format series selalu sesuai dengan yang diharapkan ApexCharts
const chartSeries = computed(() => {
    // Jika seriesData memiliki format lama (array angka), konversi ke format baru
    if (props.seriesData.length > 0 && typeof props.seriesData[0] !== 'object') {
        console.warn("Using old seriesData format. Please update to [{ name: '...', data: [...] }] for better clarity.");
        return [{ name: props.title, data: props.seriesData }];
    }
    return props.seriesData;
});
</script>