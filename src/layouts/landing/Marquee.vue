<script setup>
import { ref } from 'vue';

const items = ref([
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
        alt: 'C',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
        alt: 'C#',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
        alt: 'C++',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
        alt: 'CSS',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        alt: 'HTML',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        alt: 'JavaScript',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
        alt: 'PHP',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
        alt: 'Java',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg',
        alt: 'Dart',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
        alt: 'MySQL',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',
        alt: 'Firebase',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg',
        alt: 'MariaDB',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
        alt: 'PostgreSQL',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
        alt: 'SQLite',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg',
        alt: 'SQL Server',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg',
        alt: 'jQuery',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
        alt: 'Bootstrap',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/codeigniter/codeigniter-plain.svg',
        alt: 'CodeIgniter',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
        alt: 'Laravel',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
        alt: 'Kotlin',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
        alt: 'Vue.js',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg',
        alt: 'Node.js',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
        alt: 'Express.js',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
        alt: 'Sass',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
        alt: 'Flutter',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
        alt: 'Docker',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/livewire/livewire-original-wordmark.svg',
        alt: 'Livewire',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
        alt: 'Git',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg',
        alt: 'Arduino',
    },
]);

const handleImageError = (alt) => {
    console.error(`Failed to load image: ${alt}`);
};

</script>

<template>
    <section>
        <div class="container px-4 py-8 mx-auto overflow-x-hidden lg:px-8">
            <div class="relative">
                <div x-data="{}" x-init="$nextTick(() => {
                        let ul = $refs.logos;
                        ul.insertAdjacentHTML('afterend', ul.outerHTML);
                        ul.nextSibling.setAttribute('aria-hidden', 'true');
                    })" class="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                    <ul x-ref="logos" class="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-marquee">
                        <li v-for="(item, index) in items" :key="index">
                            <img class="p-2 rounded-md dark:bg-white max-h-20" :src="item.src" :alt="item.alt" width="100" height="auto"
                                @error="handleImageError(item.alt)" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>
