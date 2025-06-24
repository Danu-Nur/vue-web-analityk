<template>
    <div class="flex flex-wrap justify-between items-center mt-4 text-sm text-gray-600">
        <div>
            Show
            <select :value="pageSize" @change="$emit('update:page-size', parseInt($event.target.value))"
                class="mx-1 border rounded px-2 py-1">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
            entries
            <div class="mx-auto">Showing {{ startIndex }} to {{ endIndex }} of {{ totalEntries }} entries</div>

        </div>
        <div class="flex items-center gap-2">
            <button :disabled="currentPage === 1" @click="$emit('update:current-page', currentPage - 1)"
                class="px-3 py-1 border rounded-md disabled:opacity-50">
                Previous
            </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button :disabled="currentPage === totalPages" @click="$emit('update:current-page', currentPage + 1)"
                class="px-3 py-1 border rounded-md disabled:opacity-50">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    totalEntries: {
        type: Number,
        required: true,
    },
    pageSize: {
        type: Number,
        required: true,
    },
    currentPage: {
        type: Number,
        required: true,
    },
});

const totalPages = computed(() => Math.ceil(props.totalEntries / props.pageSize));
const startIndex = computed(() => (props.currentPage - 1) * props.pageSize + 1);
const endIndex = computed(() => Math.min(props.currentPage * props.pageSize, props.totalEntries));
</script>