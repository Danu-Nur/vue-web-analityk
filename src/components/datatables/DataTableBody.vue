<template>
    <div class="overflow-x-auto">
        <table class="min-w-full text-sm border border-gray-200 rounded-md">
            <thead class="text-gray-400 shadow uppercase border-b border-gray-200">
                <tr>
                    <th v-for="(header, index) in headers" :key="index"
                        :class="index === headers.length - 1 && header.text === '24h Visitors' ? 'text-center' : 'text-left'"
                        class="text-nowrap py-2 px-2 cursor-pointer"
                        @click="header.sortable && toggleSort(header.value)">
                        {{ header.text }}
                        <span v-if="sortBy === header.value">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in rows" :key="index" :class="index % 2 === 0 ? 'bg-gray-50' : ''"
                    class="hover:bg-gray-100 border-t border-gray-200">
                    <td v-for="header in headers" :key="header.value" class="text-nowrap py-1 px-2"
                        :class="header.class">
                        <template v-if="header.value === 'visitorperhours'">
                            <Suspense>
                                <template #default>
                                    <LineChart :title="`Page Views per Hour for ${row.plaza} (${row.date})`"
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

// Function to extract chart categories (hours) from visitorperhours
function getChartCategories(visitorperhours) {
    if (!visitorperhours || !Array.isArray(visitorperhours)) return [];

    // Extract hours and sort them
    const hours = visitorperhours
        .map(item => {
            const date = new Date(item.date);
            return date.getHours(); // Get hour (0-23)
        })
        .filter((hour, index, self) => self.indexOf(hour) === index) // Unique hours
        .sort((a, b) => a - b); // Sort numerically

    // Format hours as 'HH:00' (e.g., '08:00', '09:00')
    return hours.map(hour => `${hour.toString().padStart(2, '0')}:00`);
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
    return hours.map(hour => hourCounts[hour] || 0);
}
</script>