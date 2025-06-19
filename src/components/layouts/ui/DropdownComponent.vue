<template>
    <nav class="relative w-full">
        <!-- Tombol collapse untuk mobile -->
        <div class="lg:hidden">
            <button @click="toggleDropdown"
                class="flex items-center justify-between w-full px-4 py-2 text-white rounded focus:outline-none">
                <span>{{ selectedOption ? selectedOption.name : 'Menu' }}</span>
                <svg class="w-4 h-4 ml-2 text-white" :class="{ 'rotate-180': isOpen }"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <!-- Dropdown untuk mobile -->
        <div v-if="isOpen"
            class="w-full mt-2 bg-white rounded-md shadow-lg lg:hidden dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
            <div class="py-1">
                <a v-for="option in options" :key="option.id" :href="`/${option.value}`"
                    @click.prevent="selectOption(option)"
                    class="block py-2 pl-8 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white dark:hover:bg-red-600">
                    {{ option.name }}
                </a>
            </div>
        </div>

        <!-- Tampilan desktop -->
        <div class="relative hidden text-left lg:inline-block">
            <a @click="toggleDropdown" class="flex items-center py-2 pl-3 pr-4 text-white bg-red-500 rounded cursor-pointer lg:bg-transparent lg:text-red-700 lg:p-0 dark:text-white">
                <span>{{ selectedOption ? selectedOption.name : 'Menu' }}</span>
                <svg class="w-4 h-4 ml-2 text-red-700 dark:text-white" :class="{ 'rotate-180': isOpen }"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </a>

            <div v-if="isOpen"
                class="absolute left-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div class="py-1">
                    <a v-for="option in options" :key="option.id" :href="`/${option.value}`"
                        @click.prevent="selectOption(option)"
                        class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white dark:hover:bg-red-600">
                        {{ option.name }}
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const selectedOption = ref(null);
const options = ref([
    { id: 1, name: 'Page 1', value: 'page1' },
    { id: 2, name: 'Page 2', value: 'page2' },
    { id: 3, name: 'Page 3', value: 'page3' },
]);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
    selectedOption.value = option;
    isOpen.value = false;
    if (option.value) {
        window.location.href = `/${option.value}`;
    }
};
</script>

