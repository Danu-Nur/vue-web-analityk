<script setup>
import Product from './Product.vue';
defineProps({
    products: {
        type: Array,
        required: true,
    },
})
</script>
<template>
    <section>
        <div class="relative isolate">
            <div class="absolute inset-x-0 hidden overflow-hidden dark:flex -top-3 -z-10 px-36 blur-3xl transform-gpu"
                aria-hidden="true">
                <div class="mx-auto aspect-[1155/600] w-[72.1875rem] bg-gradient-to-b from-[#ff80b5] to-[#9089fc] opacity-30 dark:opacity-20"
                    style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
            </div>
            <div class="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
                <!-- <h2 class="sr-only">Products</h2> -->
                <div class="flex justify-between">
                    <h2
                        class="mb-4 text-3xl leading-none tracking-tight text-gray-500 md:text-4xl xl:text-5xl dark:text-white">
                        E-BOOK</h2>
                    <a href="#"
                        class="inline-flex items-center justify-center text-2xl font-extrabold text-gray-500 hover:text-gray-700 dark:hover:text-gray-500 dark:text-white">
                        More
                        <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                </div>

                <div class="relative">
                    <div id="carousel-container"
                        class="overflow-x-auto overflow-y-hidden carousel-wrapper snap-x snap-mandatory scroll-smooth whitespace-nowrap xl:grid xl:grid-cols-4 xl:snap-none xl:overflow-x-visible xl:whitespace-normal xl:gap-x-12">
                        <Product :products="products"/>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
