<script setup>
import LandingLayout from '../../layouts/LandingLayout.vue';
import HeroNew from '../../blocks/landing/HeroNew.vue';
import Stats from '../../blocks/landing/Stats.vue';
import Features from '../../blocks/landing/Features.vue';
import DemoPreview from '../../blocks/landing/DemoPreview.vue';
import TestimonialsV2 from '../../blocks/landing/TestimonialsV2.vue';
import Pricing from '../../blocks/landing/Pricing.vue';
import Faq from '../../blocks/landing/Faq.vue';
import FinalCTA from '../../blocks/landing/FinalCTA.vue';

import { onMounted, onUnmounted } from 'vue';

// Setup Intersection Observer for fade-in effect
onMounted(() => {
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeUps = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    fadeElements.forEach((element) => {
        observer.observe(element);
    });

    fadeUps.forEach((element) => {
        observer.observe(element);
    });

    // Cleanup observer on component unmount
    onUnmounted(() => {
        observer.disconnect();
    });
});
</script>
<template>
    <LandingLayout>
        <HeroNew />
        <Stats />
        <Features />
        <DemoPreview />
        <TestimonialsV2 />
        <Pricing />
        <Faq />
        <FinalCTA />
    </LandingLayout>
</template>