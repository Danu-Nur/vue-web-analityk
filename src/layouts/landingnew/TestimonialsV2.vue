<script setup>
import SectionIcon from "../../components/icon/SectionIcon.vue";
import { ref } from "vue";

// List data testimonial
const testimonials = ref([
  {
    name: "Sachin Chhabra",
    role: "Marketing Director, TechCorp",
    img: "https://storage.googleapis.com/a1aa/image/c899415a-11eb-42e6-5ff4-fc253cb5defe.jpg",
    content:
      '"TrafficVerse has transformed how we understand our website visitors. The real-time data is invaluable for our marketing team, and the privacy-focused approach aligns perfectly with our company values."',
  },
  {
    name: "Mohammad Farhan Kalim",
    role: "Founder & CEO at Sorise EdTech",
    img: "https://storage.googleapis.com/a1aa/image/943d5f72-fc6e-43d6-49fb-b8216765aef7.jpg",
    content:
      '"As a developer, I appreciate how lightweight TrafficVerse is. The API is clean, well-documented, and gives me exactly the data I need without the clutter."',
  },
  {
    name: "Boney George",
    role: "Co-Founder, Aureon Solutions",
    img: "https://storage.googleapis.com/a1aa/image/4885d203-d50f-4f29-f1ac-9bb565a129a4.jpg",
    content:
      '"The transformation from our old analytics to TrafficVerse was seamless. It’s a must-have tool for any serious business."',
  },
  {
    name: "Jessica Tran",
    role: "Head of Growth, Nexa Digital",
    img: "https://storage.googleapis.com/a1aa/image/06b96a5e-4e21-4e6a-cc28-c85437137bd8.jpg",
    content:
      '"I love how easy it is to use TrafficVerse. The real-time dashboard is clean, insightful, and lightning fast!"',
  },
  {
    name: "Daniel Cho",
    role: "CTO, Finely Labs",
    img: "https://storage.googleapis.com/a1aa/image/06c5a70f-aef3-40fc-d936-39a5afefb229.jpg",
    content:
      '"Finally, an analytics tool that respects privacy and still delivers powerful insights. Well done TrafficVerse team!"',
  },
  {
    name: "Amira Yusuf",
    role: "Product Manager, Loopia",
    img: "https://storage.googleapis.com/a1aa/image/ed88cc23-cf38-43c4-cb27-6728e6a0ed18.jpg",
    content:
      '"We switched from a mainstream analytics provider to TrafficVerse and never looked back. Better insights, zero cookies."',
  },
  {
    name: "Lucas Meyer",
    role: "UX Designer, Orbit Apps",
    img: "https://storage.googleapis.com/a1aa/image/f13f01a4-73ba-445a-5003-9670af623ac7.jpg",
    content:
      '"The heatmaps and scroll tracking helped us redesign our landing pages for better conversion. Highly recommended!"',
  },
  {
    name: "Carla Mendez",
    role: "Founder, StudioMoss",
    img: "https://storage.googleapis.com/a1aa/image/4a0858bb-6cb4-4deb-7860-f53cb783a1ef.jpg",
    content:
      '"The onboarding experience was smooth, and the customer support is top-notch. TrafficVerse is now our daily tool."',
  },
  {
    name: "Felix Tan",
    role: "Digital Strategist, MarketWise",
    img: "https://storage.googleapis.com/a1aa/image/f84d2e81-cca3-42f8-1b71-46b6857c6098.jpg",
    content:
      '"We care deeply about privacy, and TrafficVerse helps us stay compliant without sacrificing data quality."',
  },
  {
    name: "Lina Park",
    role: "Senior Analyst, Beacon Metrics",
    img: "https://storage.googleapis.com/a1aa/image/ed88cc23-cf38-43c4-cb27-6728e6a0ed18.jpg",
    content:
      '"The ability to see live visitor behavior and filter bots automatically is a huge win for our analytics team."',
  },
]);

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
        <h2 class="text-4xl font-extrabold leading-tight mb-3">Our happy clients</h2>
        <p class="text-base text-gray-700 mb-8">
          Join thousands of businesses who trust TrafficVerse for their web analytics
          needs.
        </p>
      </div>
      <div class="flex justify-center space-x-3 flex-wrap mx-auto mb-12 drop-shadow-lg">
        <img alt="Portrait of a man in a suit with a light brown background" class="w-10 h-10 rounded-full object-cover"
          height="40" src="https://storage.googleapis.com/a1aa/image/f84d2e81-cca3-42f8-1b71-46b6857c6098.jpg"
          width="40" />
        <img alt="Portrait of a woman with long brown hair smiling with a light beige background"
          class="w-10 h-10 rounded-full object-cover" height="40"
          src="https://storage.googleapis.com/a1aa/image/ed88cc23-cf38-43c4-cb27-6728e6a0ed18.jpg" width="40" />
        <img alt="Portrait of a man with short hair and glasses with a muted brown background"
          class="w-10 h-10 rounded-full object-cover" height="40"
          src="https://storage.googleapis.com/a1aa/image/06c5a70f-aef3-40fc-d936-39a5afefb229.jpg" width="40" />
        <img alt="Portrait of a woman with long hair outdoors with green foliage background"
          class="w-10 h-10 rounded-full object-cover" height="40"
          src="https://storage.googleapis.com/a1aa/image/4a0858bb-6cb4-4deb-7860-f53cb783a1ef.jpg" width="40" />
        <img alt="Portrait of a man with a mustache and blue shirt smiling with a blue background"
          class="w-10 h-10 rounded-full object-cover" height="40"
          src="https://storage.googleapis.com/a1aa/image/f13f01a4-73ba-445a-5003-9670af623ac7.jpg" width="40" />
        <img alt="Portrait of a man with glasses and beard with a dark gray background"
          class="w-10 h-10 rounded-full object-cover" height="40"
          src="https://storage.googleapis.com/a1aa/image/c884d7a5-a6a2-483b-0eba-a4e187ce31d3.jpg" width="40" />
        <img alt="Portrait of a woman with long dark hair with a dark gray background"
          class="w-10 h-10 rounded-full object-cover" height="40"
          src="https://storage.googleapis.com/a1aa/image/06b96a5e-4e21-4e6a-cc28-c85437137bd8.jpg" width="40" />
        <img alt="Portrait of a man with dark skin and shaved head with a brown background"
          class="w-10 h-10 rounded-full object-cover" height="40"
          src="https://storage.googleapis.com/a1aa/image/2757ba1d-2016-4130-803f-541446f1b6bd.jpg" width="40" />
        <img alt="Portrait of a man with glasses and gray hair with a beige background"
          class="w-10 h-10 rounded-full object-cover" height="40"
          src="https://storage.googleapis.com/a1aa/image/6b12928e-a44a-4408-9b6f-944f1a24b5af.jpg" width="40" />
        <img alt="Portrait of a man with beard and dark hair with a gray background"
          class="w-10 h-10 rounded-full object-cover" height="40"
          src="https://storage.googleapis.com/a1aa/image/4176b071-89e3-496f-a44a-4d887629d738.jpg" width="40" />
        <img alt="Portrait of a man with beard and checkered shirt with a gray background"
          class="w-10 h-10 rounded-full object-cover" height="40"
          src="https://storage.googleapis.com/a1aa/image/8c7eaba7-3765-47be-a32a-fe76f47b2952.jpg" width="40" />
      </div>
      <div class="relative py-8">
        <div x-data="{}" x-init="$nextTick(() => {
                        let ul = $refs.logos;
                        ul.insertAdjacentHTML('afterend', ul.outerHTML);
                        ul.nextSibling.setAttribute('aria-hidden', 'true');
                    })"
          class="w-full inline-flex flex-nowrap overflow-hidden md:[mask-image:_linear-gradient(to_right,transparent_0,_black_400px,_black_calc(100%-400px),transparent_100%)]">
          <ul x-ref="logos" class="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-marquee
          transition-transform duration-700 ease-in-out">
            <li v-for="(t, i) in testimonials" :key="i"
              class="flex-shrink-0 w-72 p-3 rounded-lg bg-white text-gray-700 relative corner-angles">
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
              <div class="corner-bottom-left" aria-hidden="true"></div>
              <div class="corner-bottom-right" aria-hidden="true"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.corner-angles::before,
.corner-angles::after,
.corner-angles .corner-bottom-left::before,
.corner-angles .corner-bottom-right::after {
  content: "";
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
