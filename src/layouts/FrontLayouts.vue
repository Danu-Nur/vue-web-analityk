<script setup>
import Header from './frontlayout/Header.vue';
import Footer from './frontlayout/Footer.vue';

</script>
<template>
    <Header />
    <main class="transition-colors duration-200 bg-white dark:bg-gray-900">
        <slot />
    </main>
    <Footer />
</template>
