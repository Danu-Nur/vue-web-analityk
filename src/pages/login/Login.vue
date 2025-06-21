```vue
<script setup>
import FrontLayouts from '../../components/layouts/FrontLayouts.vue';
import ThemeToggle from '../../components/layouts/ui/ThemeToggle.vue';
import { ref } from 'vue'
// Reactive state to track password visibility
const isPasswordVisible = ref(false);

// Toggle password visibility
function togglePassword() {
    isPasswordVisible.value = !isPasswordVisible.value;
}
</script>

<template>
    <!-- <FrontLayouts> -->
    <div
        class="flex flex-col items-center justify-center min-h-screen px-6 font-sans transition-colors duration-300 bg-white dark:bg-gray-950">
        <header class="flex items-center justify-between w-full max-w-md mb-6">
            <router-link to="/"
                class="flex items-center gap-2 font-semibold text-black dark:text-white hover:underline focus:outline-none"><i
                    class="bi bi-arrow-left"></i> Back</router-link>
            <ThemeToggle />
        </header>
        <div class="w-full max-w-md">
            <div class="text-center">
                <!-- <i class="bi bi-collection"></i> -->
                <i class="bi bi-activity"></i>
                <h1 class="mb-1 text-xl font-bold text-gray-800 dark:text-gray-100">
                    Welcome to Acme Inc.
                </h1>
                <p class="mb-6 text-sm text-gray-600 dark:text-gray-300">
                    Don’t have an account?
                    <router-link to="/signup" class="underline hover:text-gray-500 dark:hover:text-gray-400">
                        Sign up
                    </router-link>
                </p>
            </div>
            <div class="space-y-4">
                <label for="email" class="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                    Email
                </label>
                <input id="email" type="email" placeholder="m@example.com"
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 dark:placeholder-gray-400 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-gray-500 dark:focus:border-gray-400 dark:bg-gray-900 dark:text-gray-100" />
                <label for="password" class="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                    Password
                </label>

                <div class="relative mb-6">
                    <input id="password" :type="isPasswordVisible ? 'text' : 'password'"
                        placeholder="Enter your password"
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 dark:placeholder-gray-400 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-gray-500 dark:focus:border-gray-400 dark:bg-gray-900 dark:text-gray-100" />
                    <button type="button" @click="togglePassword()" id="togglePassword" :aria-label="isPasswordVisible ? 'Hide password' : 'Show password'"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 focus:outline-none">
                        <!-- <i class="text-xl bi bi-eye" id="eyeIcon"></i>
                        <i class="text-xl bi bi-eye-slash" id="eyeSlashIcon"></i> -->
                        <i :class="['text-xl bi', isPasswordVisible ? 'bi-eye-slash' : 'bi-eye']"></i>
                    </button>
                </div>
                <button type="button"
                    class="w-full py-2 text-sm font-semibold text-white transition-colors duration-200 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
                    @click="handleLogin">
                    Login
                </button>
                <div class="flex justify-between w-full">
                    <div class="flex">
                        <input type="checkbox" id="remember-me"><label for="remember-me" class="ms-2">Remember
                            me</label>
                    </div>
                    <a href="#" class="underline">Forgot password?</a>
                </div>
            </div>
            <div class="flex items-center my-6">
                <hr class="flex-grow border-gray-300 dark:border-gray-700" />
                <span class="mx-3 text-gray-500 text-md dark:text-gray-400">Or</span>
                <hr class="flex-grow border-gray-300 dark:border-gray-700" />
            </div>
            <div class="flex justify-center gap-3">
                <button type="button"
                    class="flex items-center justify-center w-full px-3 py-2 space-x-2 text-sm text-gray-900 transition-colors duration-200 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <i class="bi bi-apple"></i>
                    <span>Continue with Apple</span>
                </button>
                <button type="button"
                    class="flex items-center justify-center w-full px-3 py-2 space-x-2 text-sm text-gray-900 transition-colors duration-200 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <i class="bi bi-google"></i>
                    <span>Continue with Google</span>
                </button>
            </div>
            <p class="mt-6 text-sm leading-tight text-center text-gray-500 dark:text-gray-400">
                By clicking continue, you agree to our
                <br>
                <a href="#" class="underline hover:text-gray-500 dark:hover:text-gray-300">Terms of
                    Service</a>
                and
                <a href="#" class="underline hover:text-gray-500 dark:hover:text-gray-300">Privacy Policy</a>.
            </p>
        </div>
    </div>
    <!-- </FrontLayouts> -->
</template>

<script>
export default {
    methods: {
        handleLogin() {
            // Add login logic here (e.g., validate email, make API call)
            console.log('Login button clicked');
        },
    },
};
</script>
```