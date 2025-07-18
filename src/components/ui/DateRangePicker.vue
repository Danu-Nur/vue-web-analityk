<template>
    <div class="relative w-full sm:w-auto">
        <i
            class="bi bi-calendar text-gray-600 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></i>
        <flat-pickr v-model="internalDateRange" :config="config" placeholder="Pilih Rentang Tanggal"
            class="w-full min-w-[280px] pl-10 pr-10 py-2 card-new text-center rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black truncate" />
        <button v-if="hasValue" @click="clearDate" type="button"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-red-500 hover:underline">
            <i class="bi bi-x-square"></i>
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'; // Hapus watch, onMounted
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

const props = defineProps({
    // Kita akan menggunakan properti langsung untuk startDate dan endDate
    startDate: {
        type: [Date, String, null],
        default: null,
    },
    endDate: {
        type: [Date, String, null],
        default: null,
    },
});

// Emit event untuk memperbarui startDate dan endDate
const emit = defineEmits(['update:startDate', 'update:endDate']);

// internalDateRange akan menjadi ref lokal untuk Flatpickr
// Inisialisasi dari props.startDate dan props.endDate
const internalDateRange = ref([
    props.startDate ? new Date(props.startDate) : null,
    props.endDate ? new Date(props.endDate) : null,
]);

const hasValue = computed(() => internalDateRange.value[0] !== null && internalDateRange.value[1] !== null);

const config = {
    mode: 'range',
    dateFormat: 'Y-m-d', // Tetap gunakan format ini agar konsisten dengan API dan store
    enableTime: false,
    time_24hr: true,
    showMonths: 2,
    allowInput: true,
    onChange: (selectedDates) => {
        // Ketika tanggal dipilih, update internalDateRange dan emit event
        // Pastikan selectedDates ada 2 elemen sebelum mencoba mengaksesnya
        if (selectedDates.length === 2) {
            const newStartDate = selectedDates[0] ? selectedDates[0] : null;
            const newEndDate = selectedDates[1] ? selectedDates[1] : null;

            // Update ref lokal untuk Flatpickr
            internalDateRange.value = [newStartDate, newEndDate];

            // Emit event untuk memperbarui props di komponen induk
            emit('update:startDate', newStartDate);
            emit('update:endDate', newEndDate);
        } else {
            // Jika pilihan dihapus atau tidak lengkap
            emit('update:startDate', null);
            emit('update:endDate', null);
        }
    },
};

function clearDate() {
    internalDateRange.value = [null, null];
    emit('update:startDate', null);
    emit('update:endDate', null);
}
</script>