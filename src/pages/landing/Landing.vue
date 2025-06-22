<script setup>
import FrontLayouts from '../../layouts/FrontLayouts.vue';
import HeroVue from '../../layouts/landing/Hero.vue';
import Marquee from '../../layouts/landing/Marquee.vue';
import ProductList from '../../layouts/landing/ProductList.vue';

defineProps({
    products: Array,
});
</script>

<template>
    <FrontLayouts>
        <HeroVue />

        <ProductList :products="products"/>
        <ProductList :products="products"/>
        <Marquee />
    </FrontLayouts>

</template>
<style></style>
