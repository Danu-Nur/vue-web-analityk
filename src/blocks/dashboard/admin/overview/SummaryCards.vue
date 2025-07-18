<script setup>
import { computed } from 'vue';

// Define props to receive metrics from parent
const props = defineProps({
    metrics: {
        type: Object,
        default: () => ({
            page_views: 0,
            visitors: 0,
            bounce_rate: 0,
            avg_duration: '00:00'
        })
    }
});

// Transform metrics into card format
const summaryCards = computed(() => [
    {
        title: 'Page Views',
        value: props.metrics.page_views.toLocaleString(),
        change: 'Total pageviews recorded in the selected period',
        rekap: '+0%', // Placeholder; update if API provides change data
        icon: 'bi-eye'
    },
    {
        title: 'Unique Visitors',
        value: props.metrics.visitors.toLocaleString(),
        change: 'Number of unique visitors tracked',
        rekap: '+0%',
        icon: 'bi-people'
    },
    {
        title: 'Bounce Rate',
        value: `${props.metrics.bounce_rate}%`,
        change: 'Percentage of visitors who left quickly',
        rekap: '+0%',
        icon: 'bi-box-arrow-right'
    },
    {
        title: 'Avg. Duration',
        value: props.metrics.avg_duration,
        change: 'Average session duration',
        rekap: '+0%',
        icon: 'bi-clock'
    }
]);
</script>

<template>
    <section aria-label="Summary cards" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <article v-for="card in summaryCards" :key="card.title" :aria-label="card.title"
            class="card-new rounded-lg p-4 sm:p-6 flex flex-col justify-between">
            <div class="flex justify-between items-start mb-2">
                <p class="text-gray-700 font-semibold">{{ card.title }}</p>
                <i :class="card.icon" class="text-gray-400 text-xl"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">{{ card.value }}</p>
            <div class="flex justify-between">
                <p class="text-sm text-gray-500">{{ card.change }}</p>
                <span
                    class="flex items-center card-new h-max rounded px-1 py-0.5 text-[10px] font-semibold text-gray-600">
                    <i class="fas fa-chart-line text-[10px]"></i>
                    <span>{{ card.rekap }}</span>
                </span>
            </div>
        </article>
    </section>
</template>