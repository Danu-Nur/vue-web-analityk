<script setup>
import { ref, onMounted } from 'vue';
import DropdownSearch from '../../layouts/ui/DropdownSearch.vue';
import { TransitionRoot, TransitionChild } from '@headlessui/vue';
import BarChart from '../../components/apexchart/BarChart.vue';
// import { Chart } from 'chart.js/auto';
const isMenuOpen = ref(false);

// Summary cards data
const summaryCards = ref([
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1% from last month', icon: 'bi-currency-dollar' },
    { title: 'Subscriptions', value: '+2350', change: '+180.1% from last month', icon: 'bi-people' },
    { title: 'Sales', value: '+12,234', change: '+19% from last month', icon: 'bi-credit-card' },
    { title: 'Active Now', value: '+573', change: '+201 since last hour', icon: 'bi-graph-up' },
]);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// Recent sales data
const recentSales = ref([
    {
        name: 'Olivia Martin',
        email: 'olivia.martin@email.com',
        amount: '+$1,999.00',
        avatar: 'https://storage.googleapis.com/a1aa/image/8e84123b-eb5a-4c72-28d9-c9ca4c15f5f1.jpg',
        avatarAlt: 'User avatar silhouette of a woman with black hair',
    },
    {
        name: 'Jackson Lee',
        email: 'jackson.lee@email.com',
        amount: '+$39.00',
        avatar: 'https://storage.googleapis.com/a1aa/image/b2aec910-2d30-4116-722a-0d773a27bff9.jpg',
        avatarAlt: 'User avatar silhouette of a man with short hair and glasses',
    },
    {
        name: 'Isabella Nguyen',
        email: 'isabella.nguyen@email.com',
        amount: '+$299.00',
        avatar: 'https://storage.googleapis.com/a1aa/image/8e84123b-eb5a-4c72-28d9-c9ca4c15f5f1.jpg',
        avatarAlt: 'User avatar silhouette of a woman with black hair',
    },
    {
        name: 'William Kim',
        email: 'will@email.com',
        amount: '+$99.00',
        avatar: 'https://storage.googleapis.com/a1aa/image/b2aec910-2d30-4116-722a-0d773a27bff9.jpg',
        avatarAlt: 'User avatar silhouette of a man with short hair and glasses',
    },
    {
        name: 'Sofia Davis',
        email: 'sofia.davis@email.com',
        amount: '+$39.00',
        avatar: 'https://storage.googleapis.com/a1aa/image/8e84123b-eb5a-4c72-28d9-c9ca4c15f5f1.jpg',
        avatarAlt: 'User avatar silhouette of a woman with black hair',
    },
    {
        name: 'Jackson Lee',
        email: 'jackson.lee@email.com',
        amount: '+$39.00',
        avatar: 'https://storage.googleapis.com/a1aa/image/b2aec910-2d30-4116-722a-0d773a27bff9.jpg',
        avatarAlt: 'User avatar silhouette of a man with short hair and glasses',
    },
    {
        name: 'Isabella Nguyen',
        email: 'isabella.nguyen@email.com',
        amount: '+$299.00',
        avatar: 'https://storage.googleapis.com/a1aa/image/8e84123b-eb5a-4c72-28d9-c9ca4c15f5f1.jpg',
        avatarAlt: 'User avatar silhouette of a woman with black hair',
    },
    {
        name: 'William Kim',
        email: 'will@email.com',
        amount: '+$99.00',
        avatar: 'https://storage.googleapis.com/a1aa/image/b2aec910-2d30-4116-722a-0d773a27bff9.jpg',
        avatarAlt: 'User avatar silhouette of a man with short hair and glasses',
    },
    {
        name: 'Sofia Davis',
        email: 'sofia.davis@email.com',
        amount: '+$39.00',
        avatar: 'https://storage.googleapis.com/a1aa/image/8e84123b-eb5a-4c72-28d9-c9ca4c15f5f1.jpg',
        avatarAlt: 'User avatar silhouette of a woman with black hair',
    },
]);
</script>
<template>
    <div class="bg-white text-gray-900">
        <!-- Header -->
        <header class="border-b border-gray-200">
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
                    <img alt="User avatar silhouette of a woman with black hair"
                        class="w-8 h-8 rounded-full object-cover" :height="32" :width="32" loading="lazy"
                        src="https://storage.googleapis.com/a1aa/image/8e84123b-eb5a-4c72-28d9-c9ca4c15f5f1.jpg" />
                </div>
            </nav>

            <!-- Mobile Navigation Menu -->
            <TransitionRoot as="template" :show="isMenuOpen">
                <div class="relative z-50 xl:hidden">
                    <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                        enter-from="opacity-0" enter-to="opacity-100"
                        leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                        leave-to="opacity-0">
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

        <!-- Main Content -->
        <main class="mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h1 class="text-2xl sm:text-3xl font-extrabold leading-tight text-gray-900 mb-4 md:mb-0">Dashboard</h1>
                <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <button
                        class="flex items-center border border-gray-300 rounded-md py-2 px-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black w-full sm:w-auto"
                        type="button">
                        <!-- <i class="far fa-calendar-alt mr-2 "></i> -->
                        <i class="bi bi-calendar mr-2 text-gray-600"></i>
                        <span>Jan 20, 2023 - Feb 9, 2023</span>
                    </button>
                    <button
                        class="bg-black text-white font-semibold rounded-md py-2 px-4 hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-black w-full sm:w-auto"
                        type="button">
                        Download
                    </button>
                </div>
            </div>

            <!-- Tabs -->
            <div class="flex items-center mb-6 overflow-x-auto">
                <div
                    class="flex items-start bg-gray-100 gap-2 p-1 rounded-md justify-between min-w-full md:min-w-0 w-max">
                    <button class="bg-white text-gray-900 font-semibold rounded-md py-1 px-2 md:py-2 md:px-4"
                        type="button">Overview</button>
                    <button class="text-gray-400 rounded-md py-1 px-2 md:py-2 md:px-4" disabled
                        type="button">Analytics</button>
                    <button class="text-gray-400 rounded-md py-1 px-2 md:py-2 md:px-4" disabled
                        type="button">Reports</button>
                    <button class="text-gray-400 rounded-md py-1 px-2 md:py-2 md:px-4" disabled
                        type="button">Notifications</button>
                </div>
            </div>

            <!-- Summary Cards -->
            <section aria-label="Summary cards"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                <article v-for="card in summaryCards" :key="card.title" :aria-label="card.title"
                    class="border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col justify-between">
                    <div class="flex justify-between items-start mb-2">
                        <p class="text-gray-600 font-semibold">{{ card.title }}</p>
                        <i :class="card.icon" class="text-gray-400 text-xl"></i>
                    </div>
                    <p class="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">{{ card.value }}</p>
                    <p class="text-sm text-gray-400">{{ card.change }}</p>
                </article>
            </section>

            <!-- Main Content Grid -->
            <section aria-label="Main content" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <article aria-label="Overview chart"
                    class="border border-gray-200 rounded-lg p-4 lg:col-span-3 flex flex-col">
                    <h2 class="font-semibold text-gray-900 mb-4">Overview</h2>
                    <BarChart 
                        :title="'Page Views per Month'" 
                        :categories="['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                        :seriesData="[220, 330, 290, 500, 310, 400, 450, 380, 600, 520, 610, 700]" />
                    <div class="flex justify-end items-center text-xs text-gray-600 mt-2 space-x-1">
                        <span class="w-3 h-3 rounded-full bg-black inline-block"></span>
                        <span>total</span>
                    </div>
                </article>
                <article aria-label="Recent Sales" class="border border-gray-200 rounded-lg p-4">
                    <h2 class="font-semibold text-gray-900 mb-1">Recent Sales</h2>
                    <p class="text-xs text-gray-500 mb-4">You made 265 sales this month.</p>
                    <ul class="space-y-4">
                        <li v-for="sale in recentSales" :key="sale.email" class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <img :alt="sale.avatarAlt" class="w-8 h-8 rounded-full object-cover" :height="32"
                                    :width="32" loading="lazy" :src="sale.avatar" />
                                <div>
                                    <p class="font-semibold text-gray-900 leading-tight">{{ sale.name }}</p>
                                    <p class="text-xs text-gray-400 leading-tight">{{ sale.email }}</p>
                                </div>
                            </div>
                            <p class="font-semibold text-gray-900">{{ sale.amount }}</p>
                        </li>
                    </ul>
                </article>
            </section>
        </main>
    </div>
</template>
<style>
</style>