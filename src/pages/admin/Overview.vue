<script setup>
// Tidak ada script yang dibutuhkan untuk template ini
</script>

<template>
    <div class="px-4">
        <nav class="flex border-b border-gray-300 overflow-x-auto">
            <router-link
                class="py-3 px-4 font-medium text-gray-500 no-underline border-b-[3px] border-transparent transition-colors duration-200 hover:text-gray-800"
                active-class="!text-blue-600 !border-blue-600" :to="{ name: 'admin.history' }">
                History
            </router-link>

            <router-link
                class="py-3 px-4 font-medium text-gray-500 no-underline border-b-[3px] border-transparent transition-colors duration-200 hover:text-gray-800"
                active-class="!text-blue-600 !border-blue-600" :to="{ name: 'admin.behavior' }">
                Behavior
            </router-link>

            <router-link
                class="py-3 px-4 font-medium text-gray-500 no-underline border-b-[3px] border-transparent transition-colors duration-200 hover:text-gray-800"
                active-class="!text-blue-600 !border-blue-600" :to="{ name: 'admin.conversion' }">
                Conversions
            </router-link>

            <router-link
                class="py-3 px-4 font-medium text-gray-500 no-underline border-b-[3px] border-transparent transition-colors duration-200 hover:text-gray-800"
                active-class="!text-blue-600 !border-blue-600" :to="{ name: 'admin.diagnostics' }">
                Diagnostics
            </router-link>
        </nav>

        <main class="py-8">
            <router-view />
        </main>
    </div>
</template>