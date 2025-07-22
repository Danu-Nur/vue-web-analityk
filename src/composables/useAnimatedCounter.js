import { ref, computed, watch, onUnmounted } from 'vue';

/**
 * Composable untuk membuat angka yang beranimasi (count-up).
 * @param {Ref<number>} target - Ref yang berisi angka tujuan.
 * @param {number} duration - Durasi animasi dalam milidetik.
 */
export function useAnimatedCounter(target, duration = 800) {
    const animatedValue = ref(0);
    let frameId = null;

    const runAnimation = (startValue, endValue) => {
        const startTime = Date.now();
        const range = endValue - startValue;

        const frame = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const currentValue = startValue + range * progress;

            animatedValue.value = currentValue;

            if (progress < 1) {
                frameId = requestAnimationFrame(frame);
            }
        };

        frameId = requestAnimationFrame(frame);
    };

    watch(target, (newValue, oldValue) => {
        // Batalkan animasi yang sedang berjalan jika ada
        if (frameId) {
            cancelAnimationFrame(frameId);
        }
        runAnimation(oldValue || 0, newValue || 0);
    });

    onUnmounted(() => {
        if (frameId) {
            cancelAnimationFrame(frameId);
        }
    });

    // Kembalikan nilai yang sudah dibulatkan
    return computed(() => Math.round(animatedValue.value));
}