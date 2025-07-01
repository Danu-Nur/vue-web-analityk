<script setup>
import Header from './landingnew/HeaderNew.vue';
import FooterNew from './landingnew/FooterNew.vue';
</script>
<template>
    <div class="antialiased first-color text-gray-900">
        <Header />
        <slot />
        <FooterNew />
    </div>
</template>