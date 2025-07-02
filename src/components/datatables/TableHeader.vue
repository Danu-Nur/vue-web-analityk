<template>
    <div class="flex flex-wrap justify-end gap-4 mb-4">
        <!-- <div class="flex items-center text-xs space-x-2">
            <select aria-label="Rows per page" :value="pageSize"
                @change="$emit('update:page-size', parseInt($event.target.value))"
                class="border border-gray-300 rounded-md text-gray-700 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                name="rows-per-page">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
            <span class="text-gray-900">Rows per page</span>
        </div> -->

        <div class="flex items-center w-full justify-between space-x-2">
            <input v-model="search" type="text" placeholder="Search..."
                class="border border-gray-300 rounded-md py-1.5 px-3 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs" />
            <div class="relative">
                <button ref="buttonRef" @click="toggleDropdown" title="Export File"
                    class="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <i class="bi bi-file-earmark-arrow-down text-xl"></i>
                </button>
                <div v-if="isOpen" ref="dropdownRef"
                    class="absolute z-20 w-32 bg-white border right-0 py-2 border-gray-200 rounded-md shadow-lg overflow-hidden">
                    <ul class="space-y-1">
                        <li v-for="button in buttonList" :key="button.action">
                            <button @click="$emit(button.action)"
                                class="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 flex items-center gap-2">
                                <i class="bi" :class="button.icon"></i>
                                {{ button.label }}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    search: String,
    pageSize: {
        type: Number,
        required: true,
    },
});

const isOpen = ref(false);

const emit = defineEmits(['update:search', 'update:page-size', 'export-csv', 'export-excel', 'export-pdf', 'print']);

const search = computed({
    get() {
        return props.search;
    },
    set(value) {
        emit('update:search', value);
    },
});

function toggleDropdown() {
    isOpen.value = !isOpen.value;
}

const buttonList = [
    { label: 'CSV', action: 'export-csv', icon: 'bi-filetype-csv' },
    { label: 'Excel', action: 'export-excel', icon: 'bi-filetype-xlsx' },
    { label: 'PDF', action: 'export-pdf', icon: 'bi-filetype-pdf' },
    { label: 'Print', action: 'print', icon: 'bi-printer' },
];
</script>