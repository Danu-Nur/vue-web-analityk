<script setup>
import Header from './Header.vue';
import Footer from './Footer.vue';

</script>
<template>
    <Header />
    <main class="transition-colors duration-200 bg-white dark:bg-gray-900">
        <slot />
    </main>
    <Footer />
</template>
