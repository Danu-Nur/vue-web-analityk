
<script setup>
import ThemeToggle from '../../components/layouts/ui/ThemeToggle.vue';
import { ref } from 'vue';

// Reactive state for form fields
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
const error = ref('');

// Toggle password visibility
function togglePassword() {
    isPasswordVisible.value = !isPasswordVisible.value;
}

// Toggle confirm password visibility
function toggleConfirmPassword() {
    isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
}

// Handle sign-up
function handleSignUp() {
    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        error.value = 'All fields are required.';
        return;
    }
    if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match.';
        return;
    }
    error.value = '';
    // Add sign-up logic here (e.g., API call)
    console.log('Sign Up:', { name: name.value, email: email.value, password: password.value });
}
</script>

<template>
    <div
        class="flex flex-col items-center justify-center min-h-screen px-6 font-sans transition-colors duration-300 bg-white dark:bg-gray-950">
        <header class="flex items-center justify-between w-full max-w-md mb-6">
            <router-link to="/login"
                class="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                <i class="bi bi-arrow-left"></i> Back to Login
            </router-link>
            <ThemeToggle />
        </header>
        <div class="w-full max-w-md">
            <div class="text-center">
                <i class="text-2xl text-gray-700 bi bi-person-plus dark:text-gray-200"></i>
                <h1 class="mb-1 text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Sign Up for Acme Inc.
                </h1>
                <p class="mb-6 text-sm text-gray-600 dark:text-gray-300">
                    Already have an account?
                    <router-link to="/login" class="underline hover:text-gray-500 dark:hover:text-gray-400">
                        Log in
                    </router-link>
                </p>
            </div>
            <div v-if="error" class="mb-4 text-sm text-center text-red-500 dark:text-red-400">
                {{ error }}
            </div>
            <div class="space-y-4">
                <div>
                    <label for="name" class="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                        Name
                    </label>
                    <input id="name" v-model="name" type="text" placeholder="Enter your name"
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 dark:placeholder-gray-400 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-gray-500 dark:focus:border-gray-400 dark:bg-gray-900 dark:text-gray-100" />
                </div>
                <div>
                    <label for="email" class="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                        Email
                    </label>
                    <input id="email" v-model="email" type="email" placeholder="m@example.com"
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 dark:placeholder-gray-400 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-gray-500 dark:focus:border-gray-400 dark:bg-gray-900 dark:text-gray-100" />
                </div>
                <div class="relative">
                    <label for="password" class="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                        Password
                    </label>
                    <input id="password" v-model="password" :type="isPasswordVisible ? 'text' : 'password'"
                        placeholder="Enter your password"
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 dark:placeholder-gray-400 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-gray-500 dark:focus:border-gray-400 dark:bg-gray-900 dark:text-gray-100" />
                    <button type="button" id="togglePassword"
                        :aria-label="isPasswordVisible ? 'Hide password' : 'Show password'"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 transition-colors duration-200 dark:text-gray-400 focus:outline-none hover:text-gray-600 dark:hover:text-gray-300"
                        @click="togglePassword">
                        <i :class="['text-xl bi', isPasswordVisible ? 'bi-eye-slash' : 'bi-eye']"></i>
                    </button>
                </div>
                <div class="relative mb-6">
                    <label for="confirm-password" class="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                        Confirm Password
                    </label>
                    <input id="confirm-password" v-model="confirmPassword"
                        :type="isConfirmPasswordVisible ? 'text' : 'password'" placeholder="Confirm your password"
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 dark:placeholder-gray-400 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-gray-500 dark:focus:border-gray-400 dark:bg-gray-900 dark:text-gray-100" />
                    <button type="button" id="toggleConfirmPassword"
                        :aria-label="isConfirmPasswordVisible ? 'Hide confirm password' : 'Show confirm password'"
                        class="absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-gray-500 transition-colors duration-200 dark:text-gray-400 focus:outline-none hover:text-gray-600 dark:hover:text-gray-300"
                        @click="toggleConfirmPassword">
                        <i :class="['text-xl bi', isConfirmPasswordVisible ? 'bi-eye-slash' : 'bi-eye']"></i>
                    </button>
                </div>
                <button type="button"
                    class="w-full py-2 font-semibold text-white transition-colors duration-200 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
                    @click="handleSignUp">
                    Sign Up
                </button>
            </div>
            <div class="flex items-center my-6">
                <hr class="flex-grow border-gray-300 dark:border-gray-700" />
                <span class="mx-3 text-sm text-gray-500 dark:text-gray-400">Or</span>
                <hr class="flex-grow border-gray-300 dark:border-gray-700" />
            </div>
            <div class="flex justify-center gap-3">
                <button type="button"
                    class="flex items-center justify-center w-full px-3 py-2 space-x-2 text-gray-900 transition-colors duration-200 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <i class="bi bi-apple"></i>
                    <span>Continue with Apple</span>
                </button>
                <button type="button"
                    class="flex items-center justify-center w-full px-3 py-2 space-x-2 text-gray-900 transition-colors duration-200 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <i class="bi bi-google"></i>
                    <span>Continue with Google</span>
                </button>
            </div>
            <p class="mt-6 text-sm leading-tight text-center text-gray-500 dark:text-gray-400">
                By clicking Sign Up, you agree to our
                <a href="#" class="underline hover:text-gray-500 dark:hover:text-gray-300">Terms of
                    Service</a>
                and
                <a href="#" class="underline hover:text-gray-500 dark:hover:text-gray-300">Privacy Policy</a>.
            </p>
        </div>
    </div>
</template>