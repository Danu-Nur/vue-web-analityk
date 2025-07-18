<template>
    <VueApexCharts v-if="isMounted" type="area" class="w-full h-full" :options="chartOptions" :series="chartSeries" />
</template>

<script setup>
// 1. Impor 'ref' dan 'onMounted' dari Vue
import { computed, ref, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
    title: {
        type: String,
        default: 'Area Chart'
    },
    categories: {
        type: Array,
        default: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    seriesData: {
        type: Array,
        default: () => [{ name: 'Series 1', data: [0, 0, 0, 0, 0, 0, 0] }],
        // validator: (series) => series.every(s => typeof s === 'object' && s !== null && 'name' in s && Array.isArray(s.data))
    },
    colors: {
        type: Array,
        default: () => ['#F59E0B', '#000000']
    }
})

// 2. Buat sebuah reactive reference untuk melacak status 'mounted'
const isMounted = ref(false)

// 3. Gunakan lifecycle hook 'onMounted'
onMounted(() => {
    // Kode di dalam sini akan berjalan SETELAH komponen ini terpasang di DOM.
    // Ini adalah waktu yang tepat untuk memberitahu bahwa grafik siap untuk ditampilkan.
    isMounted.value = true;
})


// Opsi grafik yang dihitung berdasarkan props (Tidak ada perubahan di sini)
const chartOptions = computed(() => ({
    chart: {
        id: 'area-chart',
        type: 'area',
        zoom: { enabled: false },
    },
    title: {
        text: props.title,
        align: 'left',
        style: { fontSize: '14px', fontWeight: 'bold' }
    },
    colors: props.colors,
    dataLabels: { enabled: false },
    stroke: {
        curve: 'smooth',
        width: 2,
        colors: props.colors
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
        categories: props.categories,
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

// Memastikan format series selalu sesuai (Tidak ada perubahan di sini)
const chartSeries = computed(() => {
    if (props.seriesData.length > 0 && typeof props.seriesData[0] !== 'object') {
        // console.warn("Menggunakan format seriesData lama. Mohon perbarui ke [{ name: '...', data: [...] }] untuk kejelasan yang lebih baik.");
        return [{ name: props.title, data: props.seriesData }];
    }
    return props.seriesData;
});
</script>