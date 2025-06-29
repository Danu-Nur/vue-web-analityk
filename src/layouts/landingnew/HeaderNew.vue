<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Reactive state to track the active section
const activeSection = ref('hero');

// Toggle mobile menu
const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// IntersectionObserver to detect which section is in view
const sections = ref([]);
const observer = ref(null);

onMounted(() => {
    // Define sections to observe
    sections.value = ['hero', 'features', 'demo', 'testimonials', 'pricing', 'faq'].map(id => document.getElementById(id));

    // Set up IntersectionObserver
    observer.value = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeSection.value = entry.target.id;
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    // Observe each section
    sections.value.forEach((section) => {
        if (section) observer.value.observe(section);
    });

    // Mobile menu button event listener
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
});

onUnmounted(() => {
    // Clean up observer
    if (observer.value) {
        sections.value.forEach((section) => {
            if (section) observer.value.unobserve(section);
        });
    }

    // Clean up event listener
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.removeEventListener('click', toggleMobileMenu);
    }
});
</script>

<template>
    <!-- Navigation -->
    <header class="sticky top-4 z-50 px-4 bg-transparent">
        <nav class="container mx-auto max-w-7xl bg-white px-4 sm:px-6 md:px-8 rounded-lg shadow-md py-3">
            <div class="flex justify-between items-center">
                <div class="text-2xl font-bold text-gray-900 drop-shadow-lg">
                    <a href="#hero">Traffic Verse</a>
                </div>
                <div class="hidden md:flex space-x-8 drop-shadow-lg">
                    <a href="#features" :class="[
                        'text-gray-500 hover:text-gray-900',
                        { 'text-gray-700 font-semibold': activeSection === 'features' }
                    ]">Features</a>
                    <a href="#demo" :class="[
                        'text-gray-500 hover:text-gray-900',
                        { 'text-gray-700 font-semibold': activeSection === 'demo' }
                    ]">Demo</a>
                    <!-- <a href="#testimonials" :class="[
                        'text-gray-500 hover:text-gray-900].">Testimonials</a> -->
                    <a href="#testimonials" :class="[
                        'text-gray-500 hover:text-gray-900',
                        { 'text-gray-700 font-semibold': activeSection === 'testimonials' }
                    ]">Testimonials</a>
                    <a href="#pricing" :class="[
                        'text-gray-500 hover:text-gray-900',
                        { 'text-gray-700 font-semibold': activeSection === 'pricing' }
                    ]">Pricing</a>
                    <a href="#faq" :class="[
                        'text-gray-500 hover:text-gray-900',
                        { 'text-gray-700 font-semibold': activeSection === 'faq' }
                    ]">FAQ</a>
                </div>
                <div class="flex items-center space-x-4">
                    <router-link to="/login" class="hidden md:block text-gray-700 hover:text-gray-900 drop-shadow-lg">Log in</router-link>
                    <router-link to="/login"
                        class="px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all drop-shadow-lg">
                        Get Started
                    </router-link>
                    <button id="mobile-menu-button" class="md:hidden">
                        <i class="bi bi-list text-xl text-gray-900"></i>
                    </button>
                </div>
            </div>
            <div id="mobile-menu" :class="['md:hidden', { 'hidden': !isMobileMenuOpen, 'block': isMobileMenuOpen }]">
                <div class="pt-2 pb-3 space-y-1">
                    <a href="#features" :class="[
                        'block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                        { 'text-gray-700 bg-gray-50': activeSection === 'features' }
                    ]">Features</a>
                    <a href="#demo" :class="[
                        'block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                        { 'text-gray-700 bg-gray-50': activeSection === 'demo' }
                    ]">Demo</a>
                    <a href="#testimonials" :class="[
                        'block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                        { 'text-gray-700 bg-gray-50': activeSection === 'testimonials' }
                    ]">Testimonials</a>
                    <a href="#pricing" :class="[
                        'block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                        { 'text-gray-700 bg-gray-50': activeSection === 'pricing' }
                    ]">Pricing</a>
                    <a href="#faq" :class="[
                        'block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                        { 'text-gray-700 bg-gray-50': activeSection === 'faq' }
                    ]">FAQ</a>
                    <a href="#"
                        class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Log
                        in</a>
                    <a href="#pricing"
                        class="block px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50">Start Free
                        Trial</a>
                </div>
            </div>
        </nav>
    </header>
</template>