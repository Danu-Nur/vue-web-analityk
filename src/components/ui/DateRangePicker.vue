<template>
    <div class="relative w-full sm:w-auto">
        <!-- Calendar Icon -->
        <i
            class="bi bi-calendar text-gray-600 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></i>

        <!-- Flatpickr Input -->
        <flat-pickr v-model="modelValueLocal" :config="config" placeholder="Select Date Range"
            class="w-full min-w-[280px] pl-10 pr-10 py-2 border border-gray-300 text-center rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black truncate" />

        <!-- Clear Button -->
        <button v-if="hasValue" @click="clearDate" type="button"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-red-500 hover:underline">
            <i class="bi bi-x-square"></i>
        </button>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

// Props
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Local reactive copy
const modelValueLocal = ref([...props.modelValue])

// Check if a value is selected
const hasValue = computed(() => {
    return modelValueLocal.value?.length > 0
})

// Watch for parent prop changes and sync to local
watch(
    () => props.modelValue,
    (newVal) => {
        if (JSON.stringify(newVal) !== JSON.stringify(modelValueLocal.value)) {
            modelValueLocal.value = [...newVal]
        }
    },
    { deep: true }
)

// Emit back to parent when local changes
watch(
    modelValueLocal,
    (newVal) => {
        if (JSON.stringify(newVal) !== JSON.stringify(props.modelValue)) {
            emit('update:modelValue', [...newVal])
        }
    },
    { deep: true }
)

// Flatpickr config
const config = {
    mode: 'range',
    dateFormat: 'Y-m-d',
    showMonths: 2,
    allowInput: true,
}

// Clear date selection
function clearDate() {
    modelValueLocal.value = []
}
</script>
