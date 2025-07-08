<template>
    <div class="relative w-full sm:w-auto">
        <i
            class="bi bi-calendar text-gray-600 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></i>
        <flat-pickr v-model="dateRange" :config="config" placeholder="Select Date Range"
            class="w-full min-w-[280px] pl-10 pr-10 py-2 border border-gray-300 text-center rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black truncate" />
        <button v-if="hasValue" @click="clearDate" type="button"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-red-500 hover:underline">
            <i class="bi bi-x-square"></i>
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({ startDate: null, endDate: null }),
    },
});

const emit = defineEmits(['update:modelValue']);

const dateRange = ref([
    props.modelValue.startDate ? new Date(props.modelValue.startDate) : null,
    props.modelValue.endDate ? new Date(props.modelValue.endDate) : null,
]);

const hasValue = computed(() => dateRange.value[0] !== null && dateRange.value[1] !== null);

const config = {
    mode: 'range',
    dateFormat: 'Y-m-d H:i:s',
    enableTime: false,
    time_24hr: true,
    showMonths: 2,
    allowInput: true,
    onChange: (selectedDates) => {
        const newRange = {
            startDate: selectedDates[0] ? new Date(selectedDates[0]) : null,
            endDate: selectedDates[1] ? new Date(selectedDates[1]) : null,
        };
        emit('update:modelValue', newRange);
    },
};

function clearDate() {
    dateRange.value = [null, null];
    emit('update:modelValue', { startDate: null, endDate: null });
}
</script>