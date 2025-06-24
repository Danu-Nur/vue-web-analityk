<template>
    <div class="flex flex-wrap justify-between gap-2 mb-4">
        <input v-model="search" type="text" placeholder="Search..."
            class="border border-gray-300 rounded-md py-1.5 px-3 placeholder-gray-400 focus:outline-none" />
        <div class="relative">
            <button ref="buttonRef" @click="toggleDropdown"
                class="px-2 text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <i class="bi bi-list text-xl"></i>
            </button>
            <div v-if="isOpen" ref="dropdownRef"
                class="absolute z-20 w-max bg-white border right-0 py-2 border-gray-200 rounded-md shadow-lg overflow-hidden">
                <ul class="space-y-1">
                    <li v-for="button in buttonList" :key="button.action">
                        <button @click="$emit(button.action)" class="w-full text-left px-3 hover:bg-gray-100">
                            {{ button.label }}
                        </button>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    search: String,
});

const isOpen = ref(false);

const emit = defineEmits(['update:search', 'export-csv', 'export-excel', 'export-pdf', 'print']);

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
    { label: 'CSV', action: 'export-csv' },
    { label: 'Excel', action: 'export-excel' },
    { label: 'PDF', action: 'export-pdf' },
    { label: 'Print', action: 'print' },
];
</script>