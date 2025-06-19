<!-- resources/js/Components/AnimateOnScroll.vue -->
<template>
    <div ref="element" :class="[
        'transition-opacity duration-1000',
        isVisible ? 'animate-fade-in-left' : 'opacity-0'
    ]">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'AnimateLeftOnScroll',
    data() {
        return {
            isVisible: false,
        }
    },
    mounted() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.isVisible = true
                        observer.unobserve(entry.target)
                    }
                })
            },
            {
                threshold: 0.1,
            }
        )
        observer.observe(this.$refs.element)
    },
}
</script>
