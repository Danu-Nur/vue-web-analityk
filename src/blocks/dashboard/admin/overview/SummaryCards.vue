<script setup>
import { ref } from 'vue';
// Summary cards data
const summaryCards = ref([
    { title: 'Page Views', value: '12,345', change: 'Total pageviews recorded today', rekap: '+20.1%', icon: 'bi-eye' },
    { title: 'Unique Visitors', value: '4,567', change: 'Number of unique visitors tracked', rekap: '+180.1%', icon: 'bi-people' },
    { title: 'Bounce Rate', value: '37.5%', change: 'Percentage of visitors who left quickly', rekap: '+19%', icon: 'bi-box-arrow-right' },
    { title: 'Avg. Duration', value: '3m 45s', change: 'Average session duration', rekap: '+10%', icon: 'bi-clock' },
]);
</script>
<template>
    <section aria-label="Summary cards" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <article v-for="card in summaryCards" :key="card.title" :aria-label="card.title"
            class="border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col justify-between">
            <div class="flex justify-between items-start mb-2">
                <p class="text-gray-700 font-semibold">{{ card.title }}</p>
                <i :class="card.icon" class="text-gray-400 text-xl"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">{{ card.value }}</p>
            <div class="flex justify-between">
                <p class="text-sm text-gray-500">{{ card.change }}</p>
                <span
                    class="flex items-center border border-gray-300 h-max rounded px-1 py-0.5 text-[10px] font-semibold text-gray-600">
                    <i class="fas fa-chart-line text-[10px]">
                    </i>
                    <span>
                        {{ card.rekap }}
                    </span>
                </span>
            </div>

        </article>
    </section>
</template>