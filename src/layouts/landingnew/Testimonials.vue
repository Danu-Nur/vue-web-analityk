<script setup>
import SectionIcon from '../../components/icon/SectionIcon.vue';
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

// Original testimonials
const testimonials = [
    {
        name: 'Sachin Chhabra',
        role: 'Marketing Director, TechCorp',
        img: 'https://storage.googleapis.com/a1aa/image/c899415a-11eb-42e6-5ff4-fc253cb5defe.jpg',
        content:
            '"Insightlytics has transformed how we understand our website visitors. The real-time data is invaluable for our marketing team, and the privacy-focused approach aligns perfectly with our company values."',
    },
    {
        name: 'Mohammad Farhan Kalim',
        role: 'Founder & CEO at Sorise EdTech',
        img: 'https://storage.googleapis.com/a1aa/image/943d5f72-fc6e-43d6-49fb-b8216765aef7.jpg',
        content:
            '"As a developer, I appreciate how lightweight Insightlytics is compared to other analytics tools. The API is well-documented, and the dashboard gives me exactly the data I need without any bloat."',
    },
    {
        name: 'Boney George',
        role: 'Co-Founder, Aureon Solutions',
        img: 'https://storage.googleapis.com/a1aa/image/4885d203-d50f-4f29-f1ac-9bb565a129a4.jpg',
        content:
            `"He's a wonderful individual... The transformation from the old to new was amazing and I would really highly recommend everyone to take the services of Webyansh."`,
    },
]

// Extended list: clone head and tail for infinite scroll
const extendedTestimonials = computed(() => [
    testimonials[testimonials.length - 1], // Last (for prev loop)
    ...testimonials,
    testimonials[0], // First (for next loop)
])

const currentIndex = ref(1) // Start at actual first testimonial (index 1)
const sliderRef = ref(null)

const updateSlider = () => {
    if (sliderRef.value) {
        sliderRef.value.style.transform = `translateX(-${(100 / 3) * currentIndex.value}%)`
    }
}

// Handle next
const next = () => {
    if (sliderRef.value) {
        currentIndex.value++
        sliderRef.value.style.transition = 'transform 0.7s ease-in-out'
        updateSlider()

        if (currentIndex.value === extendedTestimonials.value.length - 1) {
            setTimeout(() => {
                sliderRef.value.style.transition = 'none'
                currentIndex.value = 1
                updateSlider()
            }, 700)
        }
    }
}

// Handle prev
const prev = () => {
    if (sliderRef.value) {
        currentIndex.value--
        sliderRef.value.style.transition = 'transform 0.7s ease-in-out'
        updateSlider()

        if (currentIndex.value === 0) {
            setTimeout(() => {
                sliderRef.value.style.transition = 'none'
                currentIndex.value = extendedTestimonials.value.length - 1
                updateSlider()
            }, 700)
        }
    }
}

// Autoplay
let intervalId = null
onMounted(() => {
    intervalId = setInterval(next, 6000)
})
onBeforeUnmount(() => {
    clearInterval(intervalId)
})

// Swipe support
let startX = 0
const onTouchStart = (e) => {
    startX = e.touches[0].clientX
}
const onTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX
    const diff = startX - endX
    if (diff > 50) next()
    else if (diff < -50) prev()
}
</script>


<template>
    <section id="testimonials" class="testimonials-gradient px-8 py-10">
        <div class="container bg-white rounded-2xl mx-auto py-20 px-6 shadow-xl fade-up">
            <div class="text-center max-w-3xl mx-auto drop-shadow-lg">
                <span
                    class="inline-flex items-center rounded-full border border-gray-300 px-3 py-1 shadow-sm font-medium text-gray-800 mb-3 select-none drop-shadow-lg">
                    <SectionIcon />
                    Testimonials
                </span>
                <h2 class="text-4xl font-extrabold leading-tight mb-3">
                    Our happy clients
                </h2>
                <p class="text-base text-gray-700 mb-8">
                    Join thousands of businesses who trust TrafficVerse
                    for their web analytics needs.
                </p>
            </div>
            <div class="flex justify-center space-x-3 flex-wrap mx-auto mb-12 drop-shadow-lg">
                <img alt="Portrait of a man in a suit with a light brown background"
                    class="w-10 h-10 rounded-full object-cover" height="40"
                    src="https://storage.googleapis.com/a1aa/image/f84d2e81-cca3-42f8-1b71-46b6857c6098.jpg"
                    width="40" />
                <img alt="Portrait of a woman with long brown hair smiling with a light beige background"
                    class="w-10 h-10 rounded-full object-cover" height="40"
                    src="https://storage.googleapis.com/a1aa/image/ed88cc23-cf38-43c4-cb27-6728e6a0ed18.jpg"
                    width="40" />
                <img alt="Portrait of a man with short hair and glasses with a muted brown background"
                    class="w-10 h-10 rounded-full object-cover" height="40"
                    src="https://storage.googleapis.com/a1aa/image/06c5a70f-aef3-40fc-d936-39a5afefb229.jpg"
                    width="40" />
                <img alt="Portrait of a woman with long hair outdoors with green foliage background"
                    class="w-10 h-10 rounded-full object-cover" height="40"
                    src="https://storage.googleapis.com/a1aa/image/4a0858bb-6cb4-4deb-7860-f53cb783a1ef.jpg"
                    width="40" />
                <img alt="Portrait of a man with a mustache and blue shirt smiling with a blue background"
                    class="w-10 h-10 rounded-full object-cover" height="40"
                    src="https://storage.googleapis.com/a1aa/image/f13f01a4-73ba-445a-5003-9670af623ac7.jpg"
                    width="40" />
                <img alt="Portrait of a man with glasses and beard with a dark gray background"
                    class="w-10 h-10 rounded-full object-cover" height="40"
                    src="https://storage.googleapis.com/a1aa/image/c884d7a5-a6a2-483b-0eba-a4e187ce31d3.jpg"
                    width="40" />
                <img alt="Portrait of a woman with long dark hair with a dark gray background"
                    class="w-10 h-10 rounded-full object-cover" height="40"
                    src="https://storage.googleapis.com/a1aa/image/06b96a5e-4e21-4e6a-cc28-c85437137bd8.jpg"
                    width="40" />
                <img alt="Portrait of a man with dark skin and shaved head with a brown background"
                    class="w-10 h-10 rounded-full object-cover" height="40"
                    src="https://storage.googleapis.com/a1aa/image/2757ba1d-2016-4130-803f-541446f1b6bd.jpg"
                    width="40" />
                <img alt="Portrait of a man with glasses and gray hair with a beige background"
                    class="w-10 h-10 rounded-full object-cover" height="40"
                    src="https://storage.googleapis.com/a1aa/image/6b12928e-a44a-4408-9b6f-944f1a24b5af.jpg"
                    width="40" />
                <img alt="Portrait of a man with beard and dark hair with a gray background"
                    class="w-10 h-10 rounded-full object-cover" height="40"
                    src="https://storage.googleapis.com/a1aa/image/4176b071-89e3-496f-a44a-4d887629d738.jpg"
                    width="40" />
                <img alt="Portrait of a man with beard and checkered shirt with a gray background"
                    class="w-10 h-10 rounded-full object-cover" height="40"
                    src="https://storage.googleapis.com/a1aa/image/8c7eaba7-3765-47be-a32a-fe76f47b2952.jpg"
                    width="40" />
            </div>

            <div class="relative overflow-hidden max-w-6xl mx-auto" @touchstart="onTouchStart" @touchend="onTouchEnd">
                <ul ref="sliderRef" class="flex transition-transform duration-700 ease-in-out"
                    :style="`transform: translateX(-${(100 / 3) * (currentIndex)}%)`">
                    <li v-for="(t, i) in extendedTestimonials" :key="i"
                        class="flex-shrink-0 w-1/3 p-3 rounded-lg bg-white text-gray-700 relative" :class="{
                            'opacity-100 scale-100 z-10': i === currentIndex + 1,
                            'opacity-50 scale-90 blur-sm z-0': i !== currentIndex + 1,
                            'corner-angles': i === currentIndex + 1
                        }">
                        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                            <p class="text-gray-700 mb-4 leading-relaxed">{{ t.content }}</p>
                            <div class="flex items-center mt-6 space-x-3">
                                <img :src="t.img" alt="Photo" class="w-12 h-12 rounded-full object-cover" />
                                <div class="text-sm text-gray-900">
                                    <p class="font-semibold">{{ t.name }}</p>
                                    <p>{{ t.role }}</p>
                                </div>
                            </div>
                        </div>
                        <div :class="i === currentIndex + 1 ? '' : 'hidden'" class="corner-bottom-left"
                            aria-hidden="true"></div>
                        <div :class="i === currentIndex + 1 ? '' : 'hidden'" class="corner-bottom-right"
                            aria-hidden="true"></div>
                    </li>
                </ul>
            </div>

            <div class="flex justify-center mt-8 space-x-6">
                <button @click="prev"
                    class="w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 hover:text-gray-900 flex items-center justify-center">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <button @click="next"
                    class="w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 hover:text-gray-900 flex items-center justify-center">
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.corner-angles::before,
.corner-angles::after,
.corner-angles .corner-bottom-left::before,
.corner-angles .corner-bottom-right::after {
    content: '';
    position: absolute;
    pointer-events: none;
}

.corner-angles::before {
    top: -1px;
    left: -1px;
    border-top: 2px solid rgb(252, 165, 165);
    border-left: 2px solid rgb(252, 165, 165);
    width: 12px;
    height: 12px;
}

.corner-angles::after {
    top: -1px;
    right: -1px;
    border-top: 2px solid rgb(252, 165, 165);
    border-right: 2px solid rgb(252, 165, 165);
    width: 12px;
    height: 12px;
}

.corner-angles .corner-bottom-left::before {
    bottom: -1px;
    left: -1px;
    border-bottom: 2px solid rgb(252, 165, 165);
    border-left: 2px solid rgb(252, 165, 165);
    width: 12px;
    height: 12px;
}

.corner-angles .corner-bottom-right::after {
    bottom: -1px;
    right: -1px;
    border-bottom: 2px solid rgb(252, 165, 165);
    border-right: 2px solid rgb(252, 165, 165);
    width: 12px;
    height: 12px;
}

.fade-slide {
    animation: fadeInSlide 0.5s ease-out forwards;
}

@keyframes fadeInSlide {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>