<template>
    <div class="relative w-full sm:w-auto">
        <!-- Kalender Icon kiri -->
        <i
            class="bi bi-calendar text-gray-600 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></i>

        <!-- Flatpickr input -->
        <flat-pickr v-model="modelValueLocal" :config="config" placeholder="Select Date Range"
            class="w-full min-w-[280px] pl-10 pr-10 py-2 border border-gray-300 text-center rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black truncate" />

        <!-- Tombol Clear di dalam area input (kanan) -->
        <button v-if="modelValueLocal.length" @click="clearDate" type="button"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-red-500 hover:underline">
            <i class="bi bi-x-square"></i>
        </button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

// Props
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
})

// Emit
const emit = defineEmits(['update:modelValue'])

// Local state
const modelValueLocal = ref([...props.modelValue])

// Sync with parent
watch(modelValueLocal, (val) => {
    emit('update:modelValue', val)
})

// Flatpickr config
const config = {
    mode: 'range',
    dateFormat: 'Y-m-d',
    showMonths: 2,
}

// Clear function
function clearDate() {
    modelValueLocal.value = []
}
</script>
