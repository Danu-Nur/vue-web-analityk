<script setup>
import { onMounted, onUnmounted, ref, watch, shallowRef } from 'vue'; // Tambahkan shallowRef
import L from 'leaflet';

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    }
});

// Gunakan shallowRef untuk objek Leaflet agar Vue tidak mencoba membuatnya reaktif secara mendalam,
// yang bisa memakan banyak sumber daya dan tidak perlu.
const map = shallowRef(null);
const geojsonLayer = shallowRef(null); // Ganti 'geojson' dengan nama yang lebih jelas
const infoControl = shallowRef(null); // Ganti 'info'
const legendControl = shallowRef(null); // Ganti 'legend'

// Raw GeoJSON data hanya perlu dimuat sekali dan tidak perlu reaktif secara mendalam
let rawGeoJsonData = null;

// Fungsi untuk menentukan warna berdasarkan jumlah pengunjung
const getColor = (count) =>
    count > 5000 ? '#800026' :
        count > 3000 ? '#BD0026' :
            count > 1500 ? '#E31A1C' :
                count > 1000 ? '#FC4E2A' :
                    count > 500 ? '#FD8D3C' :
                        count > 100 ? '#FEB24C' :
                            '#FFEDA0';

// Styling dasar untuk GeoJSON (akan diperbarui nanti)
const style = (feature) => {
    // Properti 'count' akan ditambahkan ke feature.properties saat data pengunjung diolah
    const count = feature.properties.count || 0;
    // Cek apakah negara ini ada di data props.data
    // Gunakan 'name' atau properti yang sesuai dari geojson untuk identifikasi negara
    const isChoropleth = props.data.some(v => v.country === feature.properties.shapeName);

    return {
        fillColor: isChoropleth ? getColor(count) : '#ccc',
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: isChoropleth ? 0.7 : 0.3,
    };
};

// Mouse interactions (fungsi-fungsi ini tidak perlu diubah banyak)
const highlightFeature = (e) => {
    e.target.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7,
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        e.target.bringToFront();
    }
    // Pastikan infoControl sudah ada sebelum memanggil update
    if (infoControl.value) {
        infoControl.value.update(e.target.feature.properties);
    }
};

const resetHighlight = (e) => {
    // Pastikan geojsonLayer sudah ada sebelum memanggil resetStyle
    if (geojsonLayer.value) {
        geojsonLayer.value.resetStyle(e.target);
    }
    // Pastikan infoControl sudah ada sebelum memanggil update
    if (infoControl.value) {
        infoControl.value.update();
    }
};

const zoomToFeature = (e) => {
    // Pastikan map sudah ada
    if (map.value) {
        map.value.fitBounds(e.target.getBounds());
    }
};

const onEachFeature = (feature, layer) => {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
    });
};

// Inisialisasi peta dan muat data GeoJSON awal
const initializeMap = async () => {
    try {
        // Inisialisasi peta hanya jika belum ada
        if (!map.value) {
            map.value = L.map('map', {
                zoomControl: true,
                center: [0, 0], // Atur center awal
                zoom: 2 // Atur zoom awal
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18,
                zoomSnap: 0.25
            }).addTo(map.value);

            // Muat data GeoJSON hanya sekali saat inisialisasi
            // Asumsi path ini benar dan file tidak terlalu besar
            const { default: loadedGeoJsonData } = await import('../../dummydata/geoBoundariesCGAZ_ADM0_2.json');
            rawGeoJsonData = loadedGeoJsonData; // Simpan di variabel non-reaktif karena hanya perlu dibaca

            if (!rawGeoJsonData || !rawGeoJsonData.features) {
                throw new Error('Invalid GeoJSON data: features array is missing or empty.');
            }

            // Tambahkan GeoJSON layer awal ke peta
            geojsonLayer.value = L.geoJson(rawGeoJsonData, {
                style: style, // Gunakan fungsi style
                onEachFeature: onEachFeature
            }).addTo(map.value);

            // Zoom ke batas GeoJSON setelah ditambahkan pertama kali
            if (geojsonLayer.value.getBounds().isValid()) {
                map.value.fitBounds(geojsonLayer.value.getBounds());
            } else {
                // Fallback jika bounds tidak valid (misal, data kosong)
                map.value.setView([0, 0], 2);
            }

            // Inisialisasi Info Control
            infoControl.value = L.control();
            infoControl.value.onAdd = function () {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            };
            infoControl.value.update = function (properties) {
                this._div.innerHTML = '<h4>Info Pengunjung</h4>' +
                    (properties ? `<b>${properties.shapeName || 'Unknown'}</b><br />${properties.count || 0} pengunjung` : 'Arahkan kursor ke negara');
            };
            infoControl.value.addTo(map.value);

            // Inisialisasi Legend Control (akan diperbarui di updateGeoJsonLayer)
            legendControl.value = L.control({ position: 'bottomright' });
            legendControl.value.onAdd = function () {
                const div = L.DomUtil.create('div', 'info legend');
                // Legend akan diperbarui di updateGeoJsonLayer
                return div;
            };
            legendControl.value.addTo(map.value);
        }

        // Panggil updateGeoJsonLayer untuk menerapkan data props.data awal
        updateGeoJsonLayer();

    } catch (err) {
        console.error('Error initializing map:', err);
        // Tampilkan pesan error kepada pengguna jika perlu
    }
};

// Update GeoJSON layer dengan data pengunjung baru
const updateGeoJsonLayer = () => {
    if (!map.value || !geojsonLayer.value || !rawGeoJsonData) {
        console.warn("Map, GeoJSON layer, or raw data not initialized.");
        return;
    }

    // Buat objek mapping dari data props untuk pencarian cepat
    const visitorMap = new Map();
    props.data.forEach(v => {
        // Asumsi v.country adalah nama negara yang cocok dengan f.properties.name
        visitorMap.set(v.country, v.count);
    });

    // Iterasi melalui setiap layer di geojsonLayer (setiap fitur negara)
    // dan perbarui properti serta stylenya
    geojsonLayer.value.eachLayer(layer => {
        const countryName = layer.feature.properties.shapeName; // Ganti 'name' jika properti negara berbeda
        const count = visitorMap.get(countryName) || 0;

        // Perbarui properti 'count' di fitur
        layer.feature.properties.count = count;

        // Perbarui style layer
        layer.setStyle(style(layer.feature));
    });

    // Perbarui legenda
    if (legendControl.value) {
        const div = legendControl.value.getContainer();
        let grades = [0];
        if (props.data.length > 0) {
            const maxCount = Math.max(...props.data.map(v => v.count));
            if (maxCount > 0) {
                // Menghasilkan rentang grade yang lebih dinamis berdasarkan maxCount
                grades = [0, 100, 500, 1000, 1500, 3000, 5000].filter(g => g <= maxCount + 1000); // Filter out grades higher than max
                if (grades[grades.length - 1] < maxCount) {
                    grades.push(Math.ceil(maxCount / 1000) * 1000); // Add a final grade if maxCount is higher than existing highest grade
                }
                grades = [...new Set(grades)].sort((a, b) => a - b); // Remove duplicates and sort
            }
        }

        let legendHtml = '<h4>Jumlah Pengunjung</h4>';
        for (let i = 0; i < grades.length; i++) {
            const nextGrade = grades[i + 1];
            legendHtml +=
                `<i style="background:${getColor(grades[i] + (i === 0 ? 0 : 1))}"></i> ${grades[i]}${nextGrade ? '&ndash;' + nextGrade : '+'}<br>`;
        }
        div.innerHTML = legendHtml;
    }

    // Pastikan info control diperbarui setelah data di-render ulang
    if (infoControl.value) {
        infoControl.value.update();
    }
};

onMounted(initializeMap);

// Gunakan deep watch untuk props.data, tapi tambahkan debounce untuk performa
// Jika data props.data sering berubah dalam waktu singkat
const updateTimer = ref(null);
watch(() => props.data, (newData, oldData) => {
    // Hanya perbarui jika data benar-benar berubah
    if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
        if (updateTimer.value) {
            clearTimeout(updateTimer.value);
        }
        updateTimer.value = setTimeout(() => {
            updateGeoJsonLayer();
        }, 300); // Debounce 300ms
    }
}, { deep: true });


onUnmounted(() => {
    // Hancurkan peta saat komponen tidak lagi digunakan
    if (map.value) {
        map.value.remove();
        map.value = null; // Setel ke null untuk melepaskan referensi
    }
    // Hapus referensi kontrol juga
    geojsonLayer.value = null;
    infoControl.value = null;
    legendControl.value = null;
    rawGeoJsonData = null; // Hapus referensi data mentah
});
</script>

<template>
    <div id="map" class="w-full h-[500px] z-40"></div>
</template>

<style scoped>
/* Styling yang sudah ada */
.info {
    padding: 6px 8px;
    font: 14px/16px Arial, Helvetica, sans-serif;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.info h4 {
    margin: 0 0 5px;
    color: #333;
}

.legend {
    background: rgba(255, 255, 255, 0.9);
    padding: 6px 8px;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    line-height: 18px;
    color: #555;
}

.legend i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}
</style>