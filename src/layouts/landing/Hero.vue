<script setup>
import AnimateRightOnScroll from '../../components/ui/AnimateRightOnScroll.vue';
import AnimateLeftOnScroll from '../../components/ui/AnimateLeftOnScroll.vue';
</script>
<template>
    <section>
        <div class="relative px-4 py-8 overflow-hidden isolate sm:py-16 lg:overflow-visible lg:px-0 ">
            <div class="absolute inset-0 overflow-hidden -z-10">
                <svg class="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200 dark:stroke-gray-700"
                    aria-hidden="true">
                    <defs>
                        <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1"
                            patternUnits="userSpaceOnUse">
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y="-1" class="overflow-visible fill-gray-50 dark:fill-gray-800">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            stroke-width="0" />
                    </svg>
                    <rect width="100%" height="100%" stroke-width="0"
                        fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                </svg>
            </div>
            <div
                class="container grid grid-cols-1 mx-auto gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div
                    class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:container lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div class="lg:pr-4">
                        <div class="lg:max-w-lg">
                            <h1
                                class="mb-4 text-3xl font-semibold leading-none tracking-tight text-pretty sm:text-4xl xl:text-5xl dark:text-white">
                                MULTIVERSE <span
                                    class="inline-flex items-center justify-center rounded-md bg-red-600 px-2.5 py-0.5 text-white">CODE</span>
                            </h1>
                            <p class="mt-6 text-gray-700 dark:text-gray-300 text-xl/8">
                                Learn Programming from Basic to Advanced! 🚀
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    class="p-12 -mt-12 -ml-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <animate-right-on-scroll>
                        <!-- <img class="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
                            alt="" /> -->
                        <img class="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                            src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                            alt="" />
                    </animate-right-on-scroll>
                </div>
                <div
                    class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:container lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div class="lg:pr-4">
                        <div class="max-w-xl text-gray-700 dark:text-gray-300 text-base/7 lg:max-w-lg">
                            <ul role="list" class="mt-2 space-y-8 text-gray-600 dark:text-gray-400">
                                <li class="flex gap-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        class="flex-none mt-1 text-indigo-600 size-5" viewBox="0 0 16 16">
                                        <path
                                            d="M9.752 6.193c.599.6 1.73.437 2.528-.362s.96-1.932.362-2.531c-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532" />
                                        <path
                                            d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9 9 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a10 10 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093q.1.026.16.045c.184.06.279.13.351.295l.029.073a3.5 3.5 0 0 1 .157.721c.055.485.051 1.178-.159 2.065m-4.828 7.475.04-.04-.107 1.081a1.54 1.54 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a9 9 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006M5.205 5c-.625.626-.94 1.351-1.004 2.09a9 9 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a3 3 0 0 0-.045-.283 3 3 0 0 0-.3-.041Z" />
                                        <path
                                            d="M7.009 12.139a7.6 7.6 0 0 1-1.804-1.352A7.6 7.6 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z" />
                                    </svg>
                                    <span>
                                        <strong class="font-semibold text-gray-900 dark:text-gray-100">
                                            Master. </strong>Frontend, Backend, Mobile Development, and Database in
                                        one place.
                                    </span>
                                </li>
                                <li class="flex gap-x-3">
                                    <svg class="flex-none mt-1 text-indigo-600 size-5" viewBox="0 0 20 20"
                                        fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fill-rule="evenodd"
                                            d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span>
                                        <strong class="font-semibold text-gray-900 dark:text-gray-100">
                                            Learn popular technologies. </strong> like Laravel, Vue.js, Node.js,
                                        Flutter.
                                    </span>
                                </li>
                                <li class="flex gap-x-3">
                                    <svg class="flex-none mt-1 text-indigo-600 size-5" viewBox="0 0 20 20"
                                        fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path
                                            d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                                        <path fill-rule="evenodd"
                                            d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span>
                                        <strong class="font-semibold text-gray-900 dark:text-gray-100">
                                            Get familiar with databases. </strong> like MySQL & Firebase databases.
                                    </span>
                                </li>
                                <li class="flex gap-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true"
                                        data-slot="icon" class="flex-none mt-1 text-indigo-600 bi bi-laptop-fill size-5"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M2.5 2A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5" />
                                    </svg>
                                    <span>
                                        <strong class="font-semibold text-gray-900 dark:text-gray-100">
                                            Learn tools & platforms. </strong>Linux, Docker, Git, and Android
                                        Studio.
                                    </span>
                                </li>
                            </ul>
                            <p class="mt-8">
                                Discover your true potential in the world of technology with Multiverse Code! Are
                                you ready to take your programming journey to the next level? Whether you're a
                                beginner or an expert, you'll find a comprehensive guide to help you explore it all.
                                From the basics to the most advanced concepts, you'll find a wealth of information
                                in one convenient place. You'll master frontend, backend, mobile, and database
                                development by working on hands-on projects and using real-world tools.
                            </p>
                            <h2 class="mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                                No server? No problem.
                            </h2>
                            <p class="mt-6 mb-8">
                                Discover the incredible power of modern platforms like
                                Docker, Git, and Android Studio as you learn how to create, deploy, and scale your
                                apps to new heights. Get ready to dive into the world of essential technologies like
                                Laravel, Vue.js, Node.js, and Flutter, as well as powerful databases like MySQL and
                                Firebase. Your amazing journey into the world of technology starts here! 🚀
                            </p>
                            <a href="#"
                                class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                Learn now
                                <!-- <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg> -->
                            </a>
                            <a href="#"
                                class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-500 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                Log in
                            </a>
                        </div>
                        <div class="flex items-center pt-8 space-x-4">
                            <div class="flex -space-x-2">
                                <img class="w-10 h-10 border-2 border-white rounded-full"
                                    src="https://randomuser.me/api/portraits/women/12.jpg" alt="User">
                                <img class="w-10 h-10 border-2 border-white rounded-full"
                                    src="https://randomuser.me/api/portraits/men/32.jpg" alt="User">
                                <img class="w-10 h-10 border-2 border-white rounded-full"
                                    src="https://randomuser.me/api/portraits/women/45.jpg" alt="User">
                                <img class="w-10 h-10 border-2 border-white rounded-full"
                                    src="https://randomuser.me/api/portraits/men/76.jpg" alt="User">
                            </div>
                            <div class="text-sm text-gray-500">
                                <span class="font-medium text-gray-700">10,000+</span> trust us worldwide
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
