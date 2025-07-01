<script setup>
import { computed } from 'vue'

const props = defineProps({
    chartType: {
        type: String,
        default: 'line',
        validator: (value) => ['line', 'bar', 'pie'].includes(value),
    },
})

const isLineChart = computed(() => props.chartType === 'line')
const isBarChart = computed(() => props.chartType === 'bar')
const isPieChart = computed(() => props.chartType === 'pie')
</script>

<template>
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 animate-pulse">
        <!-- Skeleton Title -->
        <div class="h-6 bg-gray-200 rounded w-1/2 mb-4 mx-auto"></div>

        <!-- Line Chart Skeleton (dengan titik dan garis penghubung) -->
        <div v-if="isLineChart" class="h-64 bg-gray-100 rounded relative px-6">
            <!-- Axes -->
            <div class="absolute bottom-0 left-0 w-full h-4 bg-gray-200"></div>
            <div class="absolute top-0 left-0 h-full w-4 bg-gray-200"></div>

            <!-- Simulated line chart -->
            <div class="absolute inset-0 flex items-center justify-between px-6">
                <div class="relative">
                    <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <div class="relative top-[-30px]">
                    <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div class="absolute w-[70px] h-px bg-gray-300 left-[-70px] top-[9px]"></div>
                </div>
                <div class="relative top-[-10px]">
                    <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div class="absolute w-[70px] h-px bg-gray-300 left-[-70px] top-[9px]"></div>
                </div>
                <div class="relative top-[-40px]">
                    <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div class="absolute w-[70px] h-px bg-gray-300 left-[-70px] top-[9px]"></div>
                </div>
                <div class="relative top-[-20px]">
                    <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div class="absolute w-[70px] h-px bg-gray-300 left-[-70px] top-[9px]"></div>
                </div>
                <div class="relative top-[-60px]">
                    <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div class="absolute w-[70px] h-px bg-gray-300 left-[-70px] top-[9px]"></div>
                </div>
            </div>
        </div>

        <!-- Bar Chart -->
        <div v-else-if="isBarChart" class="h-64 bg-gray-100 rounded relative overflow-hidden">
            <div class="absolute bottom-0 left-0 w-full h-4 bg-gray-200"></div>
            <div class="absolute left-0 top-0 h-full w-4 bg-gray-200"></div>
            <div class="absolute inset-0 flex items-end justify-between px-4 pb-4">
                <div class="w-[12.5%] bg-gray-200 rounded h-24 opacity-50"></div>
                <div class="w-[12.5%] bg-gray-200 rounded h-36 opacity-50"></div>
                <div class="w-[12.5%] bg-gray-200 rounded h-28 opacity-50"></div>
                <div class="w-[12.5%] bg-gray-200 rounded h-40 opacity-50"></div>
                <div class="w-[12.5%] bg-gray-200 rounded h-32 opacity-50"></div>
                <div class="w-[12.5%] bg-gray-200 rounded h-20 opacity-50"></div>
            </div>
        </div>

        <!-- Pie Chart -->
        <div v-else-if="isPieChart" class="h-64 bg-gray-100 rounded flex items-center justify-center">
            <div class="relative w-48 h-48">
                <div class="absolute inset-0 bg-gray-200 rounded-full opacity-50"></div>
                <div class="absolute inset-0 bg-gray-300 rounded-full opacity-30 clip-pie-slice-1"></div>
                <div class="absolute inset-0 bg-gray-200 rounded-full opacity-40 clip-pie-slice-2"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.clip-pie-slice-1 {
    clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%);
}

.clip-pie-slice-2 {
    clip-path: polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%);
}
</style>
