<script setup>
import FrontLayouts from '../../components/layouts/FrontLayouts.vue';
import HeroVue from '../../components/layouts/front/Hero.vue';
import Marquee from '../../components/layouts/front/Marquee.vue';
defineProps({
    products: Array,
});
</script>

<template>
    <FrontLayouts>
        <HeroVue />

        <Marquee />
    </FrontLayouts>

</template>
<style></style>
