<script setup></script>
<template>
    <!-- Navigation -->
    <header class="sticky top-4 z-50 px-4 bg-transparent">
        <nav class="container mx-auto max-w-7xl bg-white px-4 sm:px-6 md:px-8 rounded-lg shadow-md py-3">
            <div class="flex justify-between items-center">
                <div class="text-2xl font-bold text-gray-900 drop-shadow-lg"> <a href="#hero">Traffic Verse</a></div>
                <div class="hidden md:flex space-x-8 drop-shadow-lg">
                    <a href="#features" class="text-gray-500 hover:text-gray-900">Features</a>
                    <a href="#demo" class="text-gray-500 hover:text-gray-900">Demo</a>
                    <a href="#testimonials" class="text-gray-500 hover:text-gray-900">Testimonials</a>
                    <a href="#pricing" class="text-gray-500 hover:text-gray-900">Pricing</a>
                    <a href="#faq" class="text-gray-500 hover:text-gray-900">Faq</a>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="#" class="hidden md:block text-gray-700 hover:text-gray-900 drop-shadow-lg">Log in</a>
                    <button
                        class="px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all  drop-shadow-lg">
                        Get Started
                    </button>
                    <button id="mobile-menu-button" class="md:hidden">
                        <i class="fas fa-bars text-gray-700"></i>
                    </button>
                </div>
            </div>
            <div class="hidden md:hidden" id="mobile-menu">
                <div class="pt-2 pb-3 space-y-1">
                    <a href="#features"
                        class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Features</a>
                    <a href="#demo"
                        class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Demo</a>
                    <a href="#testimonials"
                        class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Testimonials</a>
                    <a href="#pricing"
                        class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Pricing</a>
                    <a href="#faq"
                        class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">FAQ</a>
                    <a href="#"
                        class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Log
                        in</a>
                    <a href="#pricing"
                        class="block px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50">Start
                        Free Trial</a>
                </div>
            </div>
        </nav>
    </header>
</template>