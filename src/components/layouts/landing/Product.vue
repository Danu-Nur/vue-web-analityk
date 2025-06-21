<script setup>
defineProps({
    products: {
        type: Object,
        required: true,
    },
});
</script>
<template>
    <a v-for="product in products" :key="product.id" href="#"
        class="inline-block px-4 py-2 xl:ml-4 carousel-item snap-start shrink-0 w-72 xl:w-auto xl:px-0 xl:py-0">
        <img :src="product.image" :alt="product.name"
            class="object-cover w-2/3 rounded-lg aspect-square group-hover:opacity-75 xl:aspect-square">
        <div class="flex flex-col justify-start w-full">

            <h3 class="mt-4 text-sm text-gray-700 dark:text-gray-300">Earthen Bottle</h3>
            <p class="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">$48</p>
        </div>
    </a>
</template>
