<template>
    <footer class="mt-3 flex items-center justify-between text-xs text-gray-500 select-none">
        <div>
            Showing {{ startIndex }} to {{ endIndex }} of {{ totalEntries }} row(s) selected.
        </div>
        <div class="flex items-center space-x-4 text-xs">
            <div class="flex items-center space-x-1 text-gray-700">
                <button aria-label="First page" :disabled="currentPage === 1" @click="$emit('update:current-page', 1)"
                    class="border border-gray-300 rounded px-2 py-1 hover:bg-gray-100 focus:outline-none disabled:opacity-50" type="button">
                    <i class="fbi bi-chevron-double-left">
                    </i>
                </button>
                <button aria-label="Previous page" :disabled="currentPage === 1" @click="$emit('update:current-page', currentPage - 1)"
                    class="border border-gray-300 rounded px-2 py-1 hover:bg-gray-100 focus:outline-none disabled:opacity-50" type="button">
                    <i class="bi bi-chevron-left">
                    </i>
                </button>
                <button aria-label="Next page" :disabled="currentPage === totalPages" @click="$emit('update:current-page', currentPage + 1)"
                    class="border border-gray-300 rounded px-2 py-1 hover:bg-gray-100 focus:outline-none disabled:opacity-50" type="button">
                    <i class="bi bi-chevron-right">
                    </i>
                </button>
                <button aria-label="Last page" :disabled="currentPage === totalPages" @click="$emit('update:current-page', totalPages)"
                    class="border border-gray-300 rounded px-2 py-1 hover:bg-gray-100 focus:outline-none disabled:opacity-50" type="button">
                    <i class="bi bi-chevron-double-right">
                    </i>
                </button>
            </div>
        </div>
    </footer>
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