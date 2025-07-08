<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import L from 'leaflet';

const props = defineProps({
    datamaps: {
        type: Array,
        default: () => [],
        validator: (items) =>
            items.every(
                (item) =>
                    typeof item.id === 'number' &&
                    typeof item.lat === 'number' &&
                    typeof item.lng === 'number' &&
                    typeof item.city === 'string' &&
                    typeof item.time === 'string'
            ),
    },
});

const map = ref(null);
const markers = ref([]);

// Function to add or update markers and center on the last data point
const updateMarkers = (data) => {
    // Clear existing markers
    markers.value.forEach((marker) => marker.remove());
    markers.value = [];

    if (data && data.length > 0) {
        // Add all markers
        data.forEach((visitor) => {
            try {
                const marker = L.marker([visitor.lat, visitor.lng])
                    .addTo(map.value)
                    .bindPopup(`<b>${visitor.city}</b><br>Terakhir aktif: ${visitor.time}`);
                markers.value.push(marker);
            } catch (error) {
                console.error(`Error adding marker for ${visitor.city}:`, error);
            }
        });

        // Center and zoom on the last data point
        const lastVisitor = data[data.length - 1];
        map.value.setView([lastVisitor.lat, lastVisitor.lng], 10); // Zoom level 10 for focus
    } else {
        console.warn('No valid data to display markers');
        // Fallback to default center (Jakarta)
        map.value.setView([-6.2088, 106.8456], 5);
    }
};

onMounted(() => {
    // Initialize map with default center (overwritten by updateMarkers if data exists)
    map.value = L.map('visitorMaps', {
        center: [-6.2088, 106.8456], // Default center (Jakarta)
        zoom: 5,
        zoomControl: true,
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
    }).addTo(map.value);

    // Initial marker rendering and centering
    // console.log('Initial datamaps:', props.datamaps);
    updateMarkers(props.datamaps);
});

// Watch for changes in datamaps prop
watch(
    () => props.datamaps,
    (newData) => {
        // console.log('Updated datamaps:', newData);
        updateMarkers(newData);
    },
    { deep: true }
);

onUnmounted(() => {
    if (map.value) {
        map.value.remove();
        map.value = null;
    }
});
</script>

<template>
    <div id="visitorMaps" class="w-full h-[500px] z-40"></div>
</template>

<style scoped>
/* Ensure Leaflet styles are applied */
/* @import 'leaflet/dist/leaflet.css'; */
</style>