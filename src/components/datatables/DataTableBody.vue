<template>
    <div class="overflow-x-auto">
        <table class="min-w-full text-sm border border-gray-200">
            <thead class="text-gray-400 shadow uppercase border-b border-gray-200">
                <tr>
                    <th v-for="header in headers" :key="header.value"
                        class="text-nowrap py-2 px-2 text-left cursor-pointer"
                        @click="header.sortable && toggleSort(header.value)">
                        {{ header.text }}
                        <span v-if="sortBy === header.value">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr v-for="(row, index) in rows" :key="index" :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
                    class="hover:bg-gray-50">
                    <td class="text-nowrap py-2 px-2">{{ row.lane }}</td>
                    <td class="text-nowrap py-2 px-2">{{ row.plaza }}</td>
                    <td class="text-nowrap py-2 px-2">{{ row.url }}</td>
                    <td class="text-nowrap py-2 px-2">{{ row.date }}</td>
                    <td class="text-nowrap py-2 px-2 text-red-500">- ${{ row.amount.toFixed(2) }}</td>
                    <td class="text-nowrap py-2 px-2 text-green-600">${{ row.balance.toLocaleString(undefined, {
                        minimumFractionDigits: 2
                    }) }}</td>
                </tr> -->
                <tr v-for="(row, index) in rows" :key="index" :class="index % 2 === 0 ? 'bg-gray-50' : ''"
                    class="hover:bg-gray-100 border-t border-gray-200">
                    <td v-for="header in headers" :key="header.value" class="text-nowrap py-2 px-2"
                        :class="header.class">
                        {{ header.formatter ? header.formatter(row[header.value]) : row[header.value] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
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
</script>