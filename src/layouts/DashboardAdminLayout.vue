<script setup>
import HeaderAdmin from './dashboardadmin/HeaderAdmin.vue';
</script>
<template>
    <div class="bg-white text-gray-900">
        <HeaderAdmin />
        <main class="mx-auto px-4 sm:px-6 lg:px-12 py-6">

            <slot />
        </main>
    </div>
</template>