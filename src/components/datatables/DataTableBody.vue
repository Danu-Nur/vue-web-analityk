<template>
    <div class="overflow-x-auto">
        <table class="w-full border-collapse table-auto text-xs text-gray-800">
            <thead class="border-b border-gray-300 bg-gray-100 text-gray-600 font-semibold select-none">
                <tr>
                    <th v-for="(header, index) in headers" :key="header.value" :class="[
                        index === headers.length - 1 && header.text === '24h Visitors' ? 'text-center' : 'text-left',
                        'text-nowrap px-3 py-2 cursor-pointer'
                    ]" @click="header.sortable !== false && toggleSort(header.value)">
                        {{ header.text }}
                        <span v-if="sortBy === header.value" class="ml-1">
                            <i :class="sortOrder === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                <tr v-for="row in rows" :key="generateRowKey(row)" class="hover:bg-gray-50 border-b border-gray-200">
                    <td v-for="header in headers" :key="header.value" class="text-nowrap py-2 px-3 text-gray-700"
                        :class="header.class">
                        <template v-if="header.value === 'visitorperhours' && row[header.value]">
                            <Suspense>
                                <template #default>
                                    <LineChart
                                        :title="`Page Views per Hour for ${row.plaza || 'Unknown'} (${row.date || 'N/A'})`"
                                        :categories="getChartCategories(row.visitorperhours)"
                                        :seriesData="getChartSeriesData(row.visitorperhours)" />
                                </template>
                                <template #fallback>
                                    <div>Loading chart...</div>
                                </template>
                            </Suspense>
                        </template>
                        <template v-else>
                            {{ header.formatter ? header.formatter(row[header.value]) : row[header.value] }}
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { defineAsyncComponent, computed } from 'vue';

// Importing the LineChart component asynchronously
const LineChart = defineAsyncComponent(() =>
    import('../../components/apexchart/MiniLineChart.vue')
);

const props = defineProps({
    headers: {
        type: Array,
        required: true,
        validator: (headers) => headers.every((h) => 'text' in h && 'value' in h),
    },
    rows: {
        type: Array,
        required: true,
    },
    sortBy: String,
    sortOrder: String,
});

const emit = defineEmits(['sort']);

function toggleSort(key) {
    emit('sort', {
        key,
        order: key === props.sortBy && props.sortOrder === 'asc' ? 'desc' : 'asc',
    });
}

// Generate a unique key for each row
function generateRowKey(row) {
    return `${row.lane || ''}_${row.plaza || ''}_${row.date || ''}_${JSON.stringify(row.visitorperhours || [])}`;
}

// Function to extract chart categories (hours) from visitorperhours
function getChartCategories(visitorperhours) {
    if (!visitorperhours || !Array.isArray(visitorperhours)) return [];

    // Extract hours and sort them
    const hours = visitorperhours
        .map((item) => {
            const date = new Date(item.date);
            return date.getHours(); // Get hour (0-23)
        })
        .filter((hour, index, self) => self.indexOf(hour) === index) // Unique hours
        .sort((a, b) => a - b); // Sort numerically

    // Format hours as 'HH:00' (e.g., '08:00', '09:00')
    return hours.map((hour) => `${hour.toString().padStart(2, '0')}:00`);
}

// Function to extract chart series data (visitor counts per hour)
function getChartSeriesData(visitorperhours) {
    if (!visitorperhours || !Array.isArray(visitorperhours)) return [];

    // Count visitors per hour
    const hourCounts = visitorperhours.reduce((acc, item) => {
        const date = new Date(item.date);
        const hour = date.getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
    }, {});

    // Get sorted hours to match categories
    const hours = Object.keys(hourCounts)
        .map(Number)
        .sort((a, b) => a - b);

    // Create series data aligned with sorted hours
    return hours.map((hour) => hourCounts[hour] || 0);
}
</script>