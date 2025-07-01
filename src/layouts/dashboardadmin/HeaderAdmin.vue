<script setup>
import { ref } from 'vue';
import { TransitionRoot, TransitionChild } from '@headlessui/vue';
import DropdownSearch from '../../components/ui/DropdownSearch.vue';
const isMenuOpen = ref(false);
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
</script>
<template>
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav aria-label="Primary Navigation"
            class="mx-auto flex items-center md:justify-between px-4 sm:px-6 lg:px-12 py-3">
            <div class="flex items-center justify-between w-full md:w-auto space-x-3">
                <!-- Logo or DropdownSearch -->
                <DropdownSearch />
                <!-- Hamburger Menu for Mobile -->
                <button class="md:hidden flex items-center justify-end me-0 text-gray-600 focus:outline-none"
                    aria-label="Toggle navigation menu" @click="toggleMenu">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <div class="hidden md:flex items-center space-x-5">
                    <a aria-current="page" class="font-semibold text-gray-900" href="#">Overview</a>
                    <a class="text-gray-500 hover:text-gray-900" href="#">Customers</a>
                    <a class="text-gray-500 hover:text-gray-900" href="#">Products</a>
                    <a class="text-gray-500 hover:text-gray-900" href="#">Settings</a>
                </div>
            </div>

            <!-- Desktop Navigation -->

            <!-- Desktop Search and Avatar -->
            <div class="hidden md:flex items-center space-x-4">
                <input aria-label="Search"
                    class="border border-gray-300 rounded-md py-1.5 px-3 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Search..." type="search" />
                <img alt="User avatar silhouette of a woman with black hair" class="w-8 h-8 rounded-full object-cover"
                    :height="32" :width="32" loading="lazy"
                    src="https://storage.googleapis.com/a1aa/image/8e84123b-eb5a-4c72-28d9-c9ca4c15f5f1.jpg" />
            </div>
        </nav>

        <!-- Mobile Navigation Menu -->
        <TransitionRoot as="template" :show="isMenuOpen">
            <div class="relative z-50 xl:hidden">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black/50 dark:bg-black/70" @click="toggleMenu" />
                </TransitionChild>

                <div class="fixed inset-0 z-50 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="translate-x-full">
                        <div
                            class="relative flex flex-col w-64 py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-lg dark:bg-gray-800">
                            <div class="flex items-center justify-between px-4">
                                <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">Menu</span>
                                <button @click="toggleMenu"
                                    class="flex items-center justify-center p-2 -mr-2 text-gray-400 bg-white rounded-md dark:text-gray-300 dark:bg-gray-800 size-10">
                                    <span class="sr-only">Close menu</span>
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                            <ul class="flex flex-col p-4 space-y-2 font-medium">
                                <li>
                                    <input aria-label="Search"
                                        class="border border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full"
                                        placeholder="Search..." type="search" />
                                </li>
                                <li>
                                    <a href="#"
                                        class="block px-3 py-2 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">Overview</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block px-3 py-2 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">Customers</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block px-3 py-2 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">Products</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block px-3 py-2 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">Settings</a>
                                </li>
                            </ul>
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </TransitionRoot>
    </header>
</template>