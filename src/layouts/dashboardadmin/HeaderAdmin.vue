<script setup>
import { ref, computed } from 'vue';
import { TransitionRoot, TransitionChild } from '@headlessui/vue';
import { useRoute } from 'vue-router'; // Penting: Import useRoute

// Asumsikan `menu` dari '../../dummydata/menu' adalah data menu navigasi kamu
import { menu } from '../../dummydata/menu';
import DropdownSearch from '../../components/ui/DropdownSearch.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// Mengambil data menu dari dummydata
const menus = ref(menu.data);

const route = useRoute(); // Inisialisasi useRoute untuk mengakses query parameters

const pageTitle = computed(() => route.meta.title);

// --- Fungsi Baru: Membuat objek rute dengan query parameters yang ada ---
const getDashboardLink = (targetRoute) => {
    // Salin semua query parameters dari rute saat ini
    const currentQueryParams = { ...route.query };

    // Jika targetRoute adalah string dan dimulai dengan '/', asumsikan itu path
    if (typeof targetRoute === 'string' && targetRoute.startsWith('/')) {
        return {
            path: targetRoute,
            query: currentQueryParams,
        };
    } else {
        // Jika tidak, asumsikan itu adalah nama rute
        return {
            name: targetRoute,
            query: currentQueryParams,
        };
    }
};

</script>

<template>
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav aria-label="Primary Navigation"
            class="mx-auto flex items-center xl:justify-between px-4 sm:px-6 xl:px-12 py-3">
            <div class="flex items-center justify-between w-full xl:w-auto space-x-3">
                <DropdownSearch />

                <div class="hidden xl:flex items-center text-nowrap bg-gray-100 gap-2 p-1 rounded-md w-max">
                    <router-link v-for="item in menus" :key="item.to" :to="getDashboardLink(item.to)" :class="[ // <<< PERUBAHAN UTAMA DI SINI
                        'rounded-md py-1 px-2 text-nowrap text-sm',
                        item.name === pageTitle
                            ? 'bg-gradient-to-r from-primary-600 to-indigo-500 text-white'
                            : 'text-gray-400 hover:text-gray-600'
                    ]">
                        {{ item.name }}
                    </router-link>
                </div>

                <button class="xl:hidden flex items-center justify-end ms-auto text-gray-600 focus:outline-none"
                    aria-label="Toggle navigation menu" @click="toggleMenu">
                    <svg class="w-6 h-6 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            <div class="hidden xl:flex items-center space-x-4">
                <input aria-label="Search"
                    class="border border-gray-300 rounded-md py-1.5 px-3 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Search..." type="search" />
                <img alt="User avatar silhouette of a woman with black hair" class="w-8 h-8 rounded-full object-cover"
                    :height="32" :width="32" loading="lazy"
                    src="https://storage.googleapis.com/a1aa/image/8e84123b-eb5a-4c72-28d9-c9ca4c15f5f1.jpg" />
            </div>
        </nav>

        <TransitionRoot as="template" :show="isMenuOpen">
            <div class="relative xl:hidden z-50">
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
                                <li v-for="item in menus" :key="item.to">
                                    <router-link class="block px-3 py-2 rounded dark:text-gray-200"
                                        :to="getDashboardLink(item.to)"
                                        :class="[
                                            item.name === pageTitle
                                                ? 'bg-gradient-to-r from-primary-600 to-indigo-500 text-white hover:text-white'
                                                : 'text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
                                        ]" @click="isMenuOpen = false">
                                        {{ item.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </TransitionRoot>
    </header>
</template>

<style></style>