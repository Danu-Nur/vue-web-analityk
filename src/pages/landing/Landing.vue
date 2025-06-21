<script setup>
import FrontLayouts from '../../components/layouts/FrontLayouts.vue';
import HeroVue from '../../components/layouts/front/Hero.vue';
import Marquee from '../../components/layouts/front/Marquee.vue';
import ProductList from '../../components/layouts/front/ProductList.vue';

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
