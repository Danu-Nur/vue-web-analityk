<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import HeaderAdmin from './dashboardadmin/HeaderAdmin.vue';
import DateRangePicker from '../components/ui/DateRangePicker.vue';

const route = useRoute();
const pageTitle = ref(route.meta.title || 'Map');

const dateRanges = [
    { label: '1 Hour', value: '1hour', hours: 1 },
    { label: 'TodAy', value: '1day', days: 1 },
    { label: 'This Month', value: '1month', months: 1 },
    { label: '3 Months', value: '3months', months: 3 },
    { label: 'Custom', value: 'custom' }
];
const selectedRange = ref('1month');
const customRange = ref({
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: new Date(new Date().setHours(23, 59, 59, 999))
});

const isCustomRange = computed(() => selectedRange.value === 'custom');
const emit = defineEmits(['update:dateRange']);

const formatDate = (date) => {
    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) throw new Error('Invalid date');
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } catch (e) {
        console.error('Date formatting error:', e, date);
        return null;
    }
};

const calculateDateRange = () => {
    const now = new Date();
    let date_from, date_to;

    switch (selectedRange.value) {
        case '1hour':
            date_to = formatDate(now);
            date_from = formatDate(new Date(now.getTime() - 1 * 60 * 60 * 1000));
            break;
        case '1day':
            date_to = formatDate(new Date(now.setHours(23, 59, 59, 999)));
            date_from = formatDate(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000));
            break;
        case '1month':
            date_from = formatDate(new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), 0, 0, 0));
            date_to = formatDate(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59));
            break;
        case '3months':
            date_from = formatDate(new Date(now.getFullYear(), now.getMonth() - 3, now.getDate(), 0, 0, 0));
            date_to = formatDate(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59));
            break;
        case 'custom':
            date_from = customRange.value.startDate ? formatDate(customRange.value.startDate) : null;
            date_to = customRange.value.endDate ? formatDate(customRange.value.endDate) : null;
            break;
    }

    if (date_from && date_to) {
        emit('update:dateRange', { date_from, date_to });
    }
};

watch(selectedRange, calculateDateRange);
watch(() => customRange.value, () => {
    if (selectedRange.value === 'custom') calculateDateRange();
}, { deep: true });

calculateDateRange();
</script>

<template>
    <div class="bg-white text-gray-900 h-full min-h-screen">
        <HeaderAdmin />
        <main class="mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h1 class="text-2xl sm:text-3xl font-extrabold leading-tight text-gray-900 mb-4 md:mb-0">
                    {{ pageTitle }}
                </h1>
                <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <select v-model="selectedRange"
                        class="border border-gray-300 rounded-md py-2 px-4 w-full sm:w-auto bg-white focus:outline-none focus:ring-1 focus:ring-black">
                        <option v-for="range in dateRanges" :key="range.value" :value="range.value">
                            {{ range.label }}
                        </option>
                    </select>

                    <Suspense v-if="isCustomRange">
                        <template #default>
                            <DateRangePicker v-model="customRange" :modelValue="customRange" />
                        </template>
                        <template #fallback>
                            <div
                                class="flex items-center border border-gray-300 rounded-md py-2 px-4 w-full sm:w-auto bg-white animate-pulse">
                                <i class="bi bi-calendar mr-2 text-gray-400"></i>
                                <div class="h-4 w-40 bg-gray-200 rounded"></div>
                            </div>
                        </template>
                    </Suspense>

                    <button
                        class="bg-black text-white font-semibold rounded-md py-2 px-4 hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-black w-full sm:w-auto"
                        type="button">
                        Download
                    </button>
                </div>
            </div>
            <slot />
        </main>
    </div>
</template>

<style scoped>
select,
.date-range-picker {
    min-width: 150px;
}
</style>