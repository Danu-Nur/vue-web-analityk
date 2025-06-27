<script setup>
import Header from '../../layouts/landingnew/HeaderNew.vue';
import HeroNew from '../../layouts/landingnew/HeroNew.vue';
import Stats from '../../layouts/landingnew/Stats.vue';
import Features from '../../layouts/landingnew/Features.vue';
import DemoPreview from '../../layouts/landingnew/DemoPreview.vue';
import Testimonials from '../../layouts/landingnew/Testimonials.vue';
import Pricing from '../../layouts/landingnew/Pricing.vue';
import Faq from '../../layouts/landingnew/Faq.vue';
import FinalCTA from '../../layouts/landingnew/FinalCTA.vue';
import FooterNew from '../../layouts/landingnew/FooterNew.vue';
// import Footer from '../../layouts/frontlayout/Footer.vue';
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
    <div class="antialiased first-color text-gray-900">
        <Header />
        <HeroNew />
        <Stats />
        <Features />
        <DemoPreview />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCTA />
        <FooterNew />
        <!-- <Footer/> -->
    </div>
</template>