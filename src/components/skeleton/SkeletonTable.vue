<template>
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 animate-pulse">
        <!-- Table Title and Info -->
        <div class="mb-4">
            <div class="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>

        <!-- Search Bar -->
        <div class="mb-4">
            <div class="h-10 bg-gray-200 rounded w-full mb-2"></div>
        </div>

        <!-- Table Header -->
        <div class="overflow-hidden rounded-lg">
            <div class="grid grid-cols-6 gap-2 bg-gray-100 p-2 mb-2">
                <div class="h-6 bg-gray-200 rounded w-full"></div>
                <div class="h-6 bg-gray-200 rounded w-full"></div>
                <div class="h-6 bg-gray-200 rounded w-full"></div>
                <div class="h-6 bg-gray-200 rounded w-full"></div>
                <div class="h-6 bg-gray-200 rounded w-full"></div>
                <div class="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>

            <!-- Table Rows (5 rows as in the image) -->
            <div class="space-y-2">
                <div v-for="i in 5" :key="i" class="grid grid-cols-6 gap-2 p-2 border-b border-gray-200">
                    <div class="h-6 bg-gray-200 rounded w-full"></div>
                    <div class="h-6 bg-gray-200 rounded w-full"></div>
                    <div class="h-6 bg-gray-200 rounded w-full"></div>
                    <div class="h-6 bg-gray-200 rounded w-full"></div>
                    <div class="h-6 bg-gray-200 rounded w-full"></div>
                    <!-- Mini Line Chart Placeholder -->
                    <div class="h-6 bg-gray-200 rounded w-full flex items-center">
                        <div class="w-full h-4 bg-gray-300 rounded opacity-50"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="mt-4 flex justify-between items-center">
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            <div class="flex space-x-2">
                <div class="h-8 bg-gray-200 rounded w-16"></div>
                <div class="h-8 bg-gray-200 rounded w-16"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>