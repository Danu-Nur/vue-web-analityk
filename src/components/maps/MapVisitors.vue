<script setup>
import { onMounted, onUnmounted, ref, watch, shallowRef } from 'vue'; // Tambahkan shallowRef
import L from 'leaflet';
// Import CSS untuk Leaflet dan MarkerCluster
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster'; // Import JavaScript untuk MarkerCluster

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

// Gunakan shallowRef untuk instansi Leaflet untuk performa
const map = shallowRef(null);
// Gunakan shallowRef untuk marker cluster group
const markerClusterGroup = shallowRef(null);
const currentMarkers = new Map(); // Menggunakan Map untuk manajemen marker berdasarkan ID

// Fungsi untuk menambahkan/memperbarui/menghapus marker
const updateMarkers = (data) => {
    if (!map.value || !markerClusterGroup.value) {
        console.warn('Peta atau MarkerClusterGroup belum diinisialisasi.');
        return;
    }

    const newDataIds = new Set(data.map(item => item.id));
    const markersToAdd = [];
    const markersToKeep = new Set();

    // 1. Perbarui atau kumpulkan marker yang sudah ada
    data.forEach((visitor) => {
        if (currentMarkers.has(visitor.id)) {
            // Jika marker sudah ada, kita bisa memperbarui pop-up-nya jika perlu
            // Untuk Leaflet, pembaruan posisi marker langsung agak rumit
            // Jika posisi bisa berubah, lebih baik hapus dan buat ulang atau gunakan library khusus
            // Untuk kasus ini, kita asumsikan posisi marker tidak berubah untuk ID yang sama,
            // hanya pop-up atau informasinya yang mungkin diperbarui.
            const existingMarker = currentMarkers.get(visitor.id);
            existingMarker.setPopupContent(`<b>${visitor.city}</b><br>Terakhir aktif: ${visitor.time}`);
            markersToKeep.add(visitor.id);
        } else {
            // Marker baru, tambahkan ke daftar untuk dibuat
            markersToAdd.push(visitor);
        }
    });

    // 2. Hapus marker yang tidak lagi ada di data baru
    const markersToRemove = [];
    currentMarkers.forEach((marker, id) => {
        if (!newDataIds.has(id)) {
            markersToRemove.push({ id, marker });
        } else if (!markersToKeep.has(id)) {
            // Ini adalah kasus di mana marker ada di currentMarkers tetapi tidak di newDataIds
            // (misalnya, data lama yang tidak dimasukkan ke newDataIds karena ID-nya tidak cocok)
            markersToRemove.push({ id, marker });
        }
    });

    markersToRemove.forEach(({ id, marker }) => {
        markerClusterGroup.value.removeLayer(marker);
        currentMarkers.delete(id);
    });


    // 3. Tambahkan marker baru
    markersToAdd.forEach((visitor) => {
        try {
            const marker = L.marker([visitor.lat, visitor.lng], {
                // Memberikan ID ke marker untuk manajemen yang lebih mudah (opsional tapi bagus)
                visitorId: visitor.id
            }).bindPopup(`<b>${visitor.city}</b><br>Terakhir aktif: ${visitor.time}`);
            markerClusterGroup.value.addLayer(marker);
            currentMarkers.set(visitor.id, marker);
        } catch (error) {
            console.error(`Error adding marker for ${visitor.city} (ID: ${visitor.id}):`, error);
        }
    });

    // Posisikan peta ke titik terakhir jika ada data
    if (data.length > 0) {
        const lastVisitor = data[data.length - 1];
        map.value.flyTo([lastVisitor.lat, lastVisitor.lng], 3, { duration: 0.5 }); // Gunakan flyTo untuk animasi halus
    } else {
        // Fallback ke pusat default jika tidak ada data
        map.value.setView([-6.2088, 106.8456], 3);
    }
};

// Debounce timer untuk watcher
let updateTimer = null;

onMounted(() => {
    // Inisialisasi peta hanya sekali
    if (!map.value) {
        map.value = L.map('visitorMaps', {
            center: [-6.2088, 106.8456], // Default center (Jakarta)
            zoom: 5,
            zoomControl: true,
        });

        // Tambahkan OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map.value);

        // Inisialisasi MarkerClusterGroup dan tambahkan ke peta
        markerClusterGroup.value = L.markerClusterGroup({
            chunkedLoading: true, // Memungkinkan pemuatan cluster yang besar secara bertahap
            maxClusterRadius: 80, // Mengatur radius cluster
        });
        map.value.addLayer(markerClusterGroup.value);
    }

    // Panggil updateMarkers pertama kali dengan data awal
    updateMarkers(props.datamaps);
});

// Watch for changes in datamaps prop with debouncing
watch(
    () => props.datamaps,
    (newData) => {
        // Clear previous debounce timer
        if (updateTimer) {
            clearTimeout(updateTimer);
        }
        // Set new debounce timer
        updateTimer = setTimeout(() => {
            updateMarkers(newData);
        }, 100); // Debounce selama 100ms
    },
    { deep: true } // Gunakan deep watch karena kita membandingkan array objek
);

onUnmounted(() => {
    // Hancurkan peta dan hapus semua marker saat komponen tidak lagi digunakan
    if (map.value) {
        map.value.remove();
        map.value = null;
    }
    // Hapus referensi ke markerClusterGroup
    markerClusterGroup.value = null;
    currentMarkers.clear(); // Bersihkan Map marker
});
</script>

<template>
    <div id="visitorMaps" class="w-full h-[500px] z-40"></div>
</template>

<style scoped>
/* @import 'leaflet/dist/leaflet.css'; - Sudah diimport di <script setup> */
/* @import 'leaflet.markercluster/dist/MarkerCluster.css'; - Sudah diimport di <script setup> */
/* @import 'leaflet.markercluster/dist/MarkerCluster.Default.css'; - Sudah diimport di <script setup> */
</style>