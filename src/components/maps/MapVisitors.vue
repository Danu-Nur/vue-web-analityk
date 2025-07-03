<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import L from 'leaflet';

const visitors = ref([
    { id: 1, lat: -6.2088, lng: 106.8456, city: 'Jakarta', time: '2025-07-02 13:30' },
    { id: 2, lat: -7.7956, lng: 110.3695, city: 'Yogyakarta', time: '2025-07-02 13:31' },
    { id: 3, lat: -8.6705, lng: 115.2126, city: 'Denpasar', time: '2025-07-02 13:32' },
]);

let map = null;
let interval = null;

onMounted(async () => {
    // Pastikan DOM sudah dirender
    await nextTick();

    // Inisialisasi peta
    map = L.map('visitorMaps', {
        center: [-6.2088, 106.8456],
        zoom: 5,
        zoomControl: true,
    });

    // Tambahkan tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Tambahkan marker awal
    visitors.value.forEach(visitor => {
        L.marker([visitor.lat, visitor.lng])
            .addTo(map)
            .bindPopup(`<b>${visitor.city}</b><br>Terakhir aktif: ${visitor.time}`);
    });

    // Simulasi pengunjung baru
    interval = setInterval(() => {
        const newVisitor = {
            id: visitors.value.length + 1,
            lat: -6.2088 + (Math.random() - 0.5) * 2,
            lng: 106.8456 + (Math.random() - 0.5) * 2,
            city: 'Pengunjung Baru',
            time: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };
        visitors.value.push(newVisitor);

        L.marker([newVisitor.lat, newVisitor.lng])
            .addTo(map)
            .bindPopup(`<b>${newVisitor.city}</b><br>Terakhir aktif: ${newVisitor.time}`)
            .openPopup();

        map.flyTo([newVisitor.lat, newVisitor.lng], 6);
    }, 5000);
});

onUnmounted(() => {
    clearInterval(interval);
    if (map) map.remove();
});
</script>

<template>
    <div id="visitorMaps" class="w-full h-[500px] z-40"></div>
</template>

<style scoped>
</style>