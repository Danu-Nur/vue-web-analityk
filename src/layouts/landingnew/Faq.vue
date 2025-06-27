<script setup>
import { ref } from 'vue';

// Reactive state to track the currently open accordion item
const activeIndex = ref(null);

// FAQ data array to make content manageable and reusable
const faqs = [
    {
        question: 'How does TrafficVerse differ from Google Analytics?',
        answer: 'TrafficVerse focuses on privacy-friendly analytics without cookies or personal data collection. Unlike Google Analytics which requires cookie banners and tracks users across sites, we provide essential metrics while respecting visitor privacy. Our interface is simpler and more focused on actionable insights rather than overwhelming data.'
    },
    {
        question: 'Is there a limit to how many websites I can track?',
        answer: 'Our Free plan allows tracking for 1 website. The Pro plan includes up to 5 websites, while the Business plan offers unlimited websites. If you need to track more websites than your current plan allows, you can either upgrade your plan or purchase additional website slots.'
    },
    {
        question: 'How do you handle visitor privacy and GDPR compliance?',
        answer: 'We don’t use cookies or collect personally identifiable information (PII). Our analytics are collected in a privacy-focused manner that doesn’t require cookie banners or GDPR consent popups. We don’t track users across websites or devices, and we don’t sell or share data with third parties. Our data processing agreements (DPA) are available for customers who need them.'
    },
    {
        question: 'What happens if I exceed my monthly pageview limit?',
        answer: 'If you exceed your monthly pageview limit, we’ll continue tracking your data but you’ll receive a notification to upgrade your plan. On the Free plan, analytics will pause until the next month begins or until you upgrade. For paid plans, we’ll automatically charge a small overage fee for each additional 10,000 pageviews ($2 for Pro, $1 for Business). You can monitor your usage in real-time from your dashboard.'
    },
    {
        question: 'Can I export my data if I decide to cancel?',
        answer: 'Yes, you can export all your analytics data at any time in CSV or JSON format. We believe you should always have access to your data. Even after cancellation, we’ll keep your data available for export for 30 days before permanently deleting it from our systems (unless you request earlier deletion for privacy reasons).'
    },
    {
        question: 'How do I install TrafficVerse on my website?',
        answer: 'Installation is simple - just add our lightweight (less than 2KB) JavaScript snippet to the <head> of your website. We provide detailed setup guides for popular platforms like WordPress, Shopify, Squarespace, and others. For more advanced users, we offer a JavaScript API for custom event tracking and integrations. The whole setup typically takes less than 5 minutes.'
    }
];

// Toggle function to open/close accordion items
const toggleAccordion = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
    <!-- FAQ Section -->
    <section id="faq" class="faq-gradient px-8 py-10">
        <div class="container bg-white rounded-2xl mx-auto pt-20 px-6 shadow-xl fade-up">
            <div class="text-center mb-16 drop-shadow-lg">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p class="text-gray-600">
                    Can't find what you're looking for?
                    <a href="#" class="text-indigo-500 hover:underline">Contact our support team</a>
                </p>
            </div>

            <div class="max-w-3xl mx-auto">
                <!-- FAQ Items -->
                <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200 py-6 drop-shadow-lg">
                    <button class="faq-toggle flex justify-between items-center w-full text-left"
                        @click="toggleAccordion(index)">
                        <h3 class="text-lg font-medium text-gray-900">{{ faq.question }}</h3>
                        <svg class="h-6 w-6 text-gray-500 transform transition-transform duration-300"
                            :class="{ 'rotate-180': activeIndex === index }" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div class="accordion-content mt-4 overflow-hidden transition-all duration-300"
                        :class="{ 'max-h-0': activeIndex !== index, 'max-h-screen active': activeIndex === index }">
                        <p class="text-gray-600">{{ faq.answer }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>