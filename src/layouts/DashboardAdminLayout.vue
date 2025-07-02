<script setup>
import { ref, defineAsyncComponent } from 'vue';
import HeaderAdmin from './dashboardadmin/HeaderAdmin.vue';

const dateRangePicker = defineAsyncComponent(() =>
    import('../components/ui/DateRangePicker.vue')
);

// Variabel reaktif untuk menyimpan teks judul
const pageTitle = ref('');

// Fungsi untuk menangani event dari HeaderAdmin
const handleUpdateTitle = (newTitle) => {
    pageTitle.value = newTitle; // Memperbarui teks judul
};
</script>
<template>
    <div class="bg-white text-gray-900">
        <HeaderAdmin @update-title="handleUpdateTitle" />
        <main class="mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h1 class="text-2xl sm:text-3xl font-extrabold leading-tight text-gray-900 mb-4 md:mb-0">{{ pageTitle }}
                </h1>
                <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <Suspense>
                        <template #default>
                            <!-- Date Range Picker -->
                            <dateRangePicker />
                        </template>

                        <template #fallback>
                            <!-- Skeleton Placeholder -->
                            <div
                                class="flex items-center border border-gray-300 rounded-md py-2 px-4 w-full sm:w-auto bg-white animate-pulse">
                                <i class="bi bi-calendar mr-2 text-gray-400"></i>
                                <div class="h-4 w-40 bg-gray-200 rounded"></div>
                            </div>
                        </template>
                    </Suspense>

                    <button
                        class="bg-black text-white font-semibold rounded-md py-2 px-4 hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-black w-full sm:w-auto"
                        type="button">
                        Download
                    </button>
                </div>
            </div>
            <slot />
        </main>
    </div>
</template>