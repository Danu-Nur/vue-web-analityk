<script setup>
import ThemeToggle from '../../components/ui/ThemeToggle.vue';
import { ref } from 'vue';

// Reactive state for form fields
const email = ref('');
const error = ref('');
const success = ref('');

// Handle forgot password submission
function handleForgotPassword() {
    if (!email.value) {
        error.value = 'Email is required.';
        success.value = '';
        return;
    }
    // Basic email format validation (optional, can be enhanced)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        error.value = 'Please enter a valid email address.';
        success.value = '';
        return;
    }
    error.value = '';
    success.value = 'A password reset link has been sent to your email.';
    // Add API call here (e.g., fetch or axios)
    console.log('Forgot Password:', { email: email.value });
}
</script>

<template>
    <header class="absolute flex items-center justify-between w-full top-0 px-2 sm:px-6 lg:px-12 py-3">
        <router-link to="/login"
            class="flex items-center gap-2 font-semibold p-2.5 ms-2 text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg focus:outline-none">
            <i class="bi bi-chevron-left"></i>
            Login
        </router-link>
        <ThemeToggle />
    </header>
    <div
        class="flex flex-col items-center justify-center min-h-screen px-6 font-sans transition-colors duration-300 bg-white dark:bg-gray-950">

        <div class="w-full max-w-md">
            <div class="text-center">
                <i class="text-2xl text-gray-700 bi bi-lock dark:text-gray-200"></i>
                <h1 class="mb-1 text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Forgot Password
                </h1>
                <p class="mb-6 text-sm text-gray-600 dark:text-gray-300">
                    Enter your email address to receive a password reset link.
                </p>
            </div>
            <div v-if="error" class="mb-4 text-sm text-center text-red-500 dark:text-red-400">
                {{ error }}
            </div>
            <div v-if="success" class="mb-4 text-sm text-center text-green-500 dark:text-green-400">
                {{ success }}
            </div>
            <div class="space-y-4">
                <div>
                    <label for="email" class="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                        Email
                    </label>
                    <input id="email" v-model="email" type="email" placeholder="m@example.com"
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 dark:placeholder-gray-400 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-gray-500 dark:focus:border-gray-400 dark:bg-gray-900 dark:text-gray-100" />
                </div>
                <button type="button"
                    class="w-full py-2 font-semibold text-white transition-colors duration-200 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
                    @click="handleForgotPassword">
                    Send Reset Link
                </button>
            </div>
            <p class="mt-6 text-sm leading-tight text-center text-gray-500 dark:text-gray-400">
                Remember your password?
                <router-link to="/login" class="underline hover:text-gray-500 dark:hover:text-gray-400">
                    Log in
                </router-link>
            </p>
        </div>
    </div>
</template>