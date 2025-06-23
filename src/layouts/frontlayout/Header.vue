<script setup>
import { ref, watch } from 'vue';
import ApplicationLogo from '../ui/ApplicationLogo.vue';
import ThemeToggle from '../ui/ThemeToggle.vue';
import Dropdown from '../ui/DropdownComponent.vue';
import { TransitionRoot, TransitionChild } from '@headlessui/vue';

const isMenuOpen = ref(false);

const isBarBanner = ref(false);

const bartoggle = () => {
    isBarBanner.value = !isBarBanner.value;
};

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// Prevent body scrolling when sidemenu is open
watch(isMenuOpen, (newValue) => {
    if (newValue) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }
});
</script>

<template>
    <div v-show="!isBarBanner" class="relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        <div class="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform blur-2xl"
            aria-hidden="true">
            <div class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)">
            </div>
        </div>

        <div class="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform blur-2xl"
            aria-hidden="true">
            <div class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)">
            </div>
        </div>

        <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p class="text-sm leading-6 text-gray-900 dark:text-gray-100">
                <strong class="font-semibold">GeneriCon 2023</strong>
                <svg viewBox="0 0 2 2" class="mx-2 inline w-0.5 h-0.5 fill-current" aria-hidden="true">
                    <circle cx="1" cy="1" r="1" />
                </svg>
                Join us in Denver from June 7 – 9 to see what’s coming next.
            </p>
            <a href="#"
                class="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus-visible:outline-gray-100">Register
                now <span aria-hidden="true">→</span></a>
        </div>

        <div class="flex justify-end flex-1">
            <button type="button" @click="bartoggle"
                class="p-3 -m-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:focus-visible:outline-gray-100">
                <span class="sr-only">Dismiss</span>
                <svg class="w-5 h-5 text-gray-900 dark:text-gray-100" viewBox="0 0 20 20" fill="currentColor"
                    aria-hidden="true" data-slot="icon">
                    <path
                        d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
            </button>
        </div>
    </div>

    <header class="sticky top-0 z-50">
        <nav class="bg-white border-gray-200 py-2.5 dark:bg-gray-800 dark:bg-opacity-50 dark:backdrop-blur-lg transition-colors duration-200">
            <div class="container flex flex-wrap items-center justify-between px-4 mx-auto">
                <a href="#" class="flex items-center">
                    <ApplicationLogo />
                </a>
                <div class="hidden w-full lg:flex md:w-1/4">
                    <form class="flex items-center">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search"
                                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                placeholder="Search" required="" />
                        </div>
                    </form>
                </div>
                <div class="flex items-center lg:order-2">
                    <ThemeToggle />
                        <router-link to="/login" class="text-gray-800 dark:text-white hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 border border-gray-500 dark:border-gray-400 whitespace-nowrap">Log in</router-link>
                        <router-link to="/signup" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 lg:px-5 py-2 lg:py-2.5">Sign in</router-link>
                    
                    <button @click="toggleMenu" type="button"
                        class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu" :aria-expanded="isMenuOpen">
                        <span class="sr-only">Open main menu</span>
                        <svg v-show="!isMenuOpen" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <svg v-show="isMenuOpen" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <!-- Desktop Menu -->
                <div class="items-center justify-between hidden w-full xl:flex lg:w-auto lg:order-1" id="desktop-menu">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <Dropdown />
                        </li>
                        <li>
                            <a href="#"
                                class="block py-2 pl-3 pr-4 text-gray-700 hover:text-red-700 lg:p-0 dark:text-gray-200 dark:hover:text-white">Course</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block py-2 pl-3 pr-4 text-gray-700 hover:text-red-700 lg:p-0 dark:text-gray-200 dark:hover:text-white">Blog
                                & News</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block py-2 pl-3 pr-4 text-gray-700 hover:text-red-700 lg:p-0 dark:text-gray-200 dark:hover:text-white">Cart</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block py-2 pl-3 pr-4 text-gray-700 hover:text-red-700 lg:p-0 dark:text-gray-200 dark:hover:text-white">Forum</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Mobile Sidemenu -->
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
                                    <Dropdown />
                                </li>
                                <li>
                                    <a href="#"
                                        class="block px-3 py-2 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">Course</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block px-3 py-2 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">Blog
                                        & News</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block px-3 py-2 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">Cart</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block px-3 py-2 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">Forum</a>
                                </li>
                            </ul>
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </TransitionRoot>
    </header>
</template>
