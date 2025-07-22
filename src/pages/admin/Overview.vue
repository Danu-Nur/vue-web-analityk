<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Definisikan link navigasi dalam sebuah array
const navLinks = ref([
    { label: 'History', route: { name: 'admin.history' } },
    { label: 'Behavior', route: { name: 'admin.behavior' } },
    { label: 'Conversions', route: { name: 'admin.conversion' } },
    { label: 'Diagnostics', route: { name: 'admin.diagnostics' } },
]);

// Fungsi yang sudah diperbaiki untuk mempertahankan query parameter
const getDashboardLink = (targetRoute) => {
    return {
        ...targetRoute,
        query: { ...route.query, ...targetRoute.query }
    };
};
</script>

<template>
    <div class="px-4">
        <nav class="flex border-b border-gray-300 overflow-x-auto">
            <router-link v-for="link in navLinks" :key="link.label" :to="getDashboardLink(link.route)"
                class="py-3 px-4 font-medium text-gray-500 no-underline border-b-[3px] border-transparent transition-colors duration-200 hover:text-gray-800"
                active-class="!text-blue-600 !border-blue-600">
                {{ link.label }}
            </router-link>
        </nav>

        <main class="py-8">
            <router-view />
        </main>
    </div>
</template>