<script setup>
import { onMounted, onUnmounted, ref, watch, shallowRef } from 'vue';
import L from 'leaflet';

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    }
});

// Gunakan shallowRef untuk objek Leaflet agar tidak reaktif secara mendalam
const map = shallowRef(null);
const geojsonLayer = shallowRef(null);
const infoControl = shallowRef(null);
const legendControl = shallowRef(null);

// Data GeoJSON mentah disimpan di sini
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

// Gaya untuk lapisan GeoJSON yang disesuaikan untuk tampilan skeleton
const style = (feature) => {
    const count = feature.properties.count || 0;
    const isChoropleth = props.data.some(v => v.country === feature.properties.shapeName);

    return {
        fillColor: isChoropleth ? getColor(count) : '#ffffff', // Putih untuk negara tanpa data
        weight: 1,
        opacity: 1,
        color: '#666', // Border abu-abu gelap agar terlihat jelas
        dashArray: '',
        fillOpacity: isChoropleth ? 0.8 : 0.5,
    };
};

// Interaksi mouse untuk menyorot fitur
const highlightFeature = (e) => {
    e.target.setStyle({
        weight: 2,
        color: '#333',
        dashArray: '',
        fillOpacity: 0.9,
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        e.target.bringToFront();
    }
    if (infoControl.value) {
        infoControl.value.update(e.target.feature.properties);
    }
};

// Mengembalikan gaya seperti semula saat mouse keluar
const resetHighlight = (e) => {
    if (geojsonLayer.value) {
        geojsonLayer.value.resetStyle(e.target);
    }
    if (infoControl.value) {
        infoControl.value.update();
    }
};

// Zoom ke fitur saat diklik
const zoomToFeature = (e) => {
    if (map.value) {
        map.value.fitBounds(e.target.getBounds());
    }
};

// Menambahkan event listener ke setiap lapisan negara
const onEachFeature = (feature, layer) => {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
    });
};

// Inisialisasi peta dan muat data GeoJSON
const initializeMap = async () => {
    try {
        if (!map.value) {
            map.value = L.map('map', {
                zoomControl: true,
                center: [0, 0],
                zoom: 2
            });

            // Tile layer sudah dihapus untuk mendapatkan tampilan skeleton

            const { default: loadedGeoJsonData } = await import('../../dummydata/geoBoundariesCGAZ_ADM0_2.json');
            rawGeoJsonData = loadedGeoJsonData;

            if (!rawGeoJsonData || !rawGeoJsonData.features) {
                throw new Error('Invalid GeoJSON data: features array is missing or empty.');
            }

            geojsonLayer.value = L.geoJson(rawGeoJsonData, {
                style: style,
                onEachFeature: onEachFeature
            }).addTo(map.value);

            // Logika zoom awal sudah dipindahkan ke updateGeoJsonLayer

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

            // Inisialisasi Legend Control
            legendControl.value = L.control({ position: 'bottomright' });
            legendControl.value.onAdd = function () {
                const div = L.DomUtil.create('div', 'info legend');
                return div;
            };
            legendControl.value.addTo(map.value);
        }

        // Panggil update untuk menerapkan data & zoom awal
        updateGeoJsonLayer();

    } catch (err) {
        console.error('Error initializing map:', err);
    }
};

// Memperbarui lapisan GeoJSON dengan data pengunjung dan mengatur zoom
const updateGeoJsonLayer = () => {
    if (!map.value || !geojsonLayer.value || !rawGeoJsonData) {
        console.warn("Map, GeoJSON layer, or raw data not initialized.");
        return;
    }

    const visitorMap = new Map(props.data.map(v => [v.country, v.count]));
    const activeLayers = []; // Array untuk menampung layer yang memiliki data

    geojsonLayer.value.eachLayer(layer => {
        const countryName = layer.feature.properties.shapeName;
        const count = visitorMap.get(countryName) || 0;
        layer.feature.properties.count = count;
        layer.setStyle(style(layer.feature));

        // Jika negara ada di data, tambahkan ke array untuk penyesuaian zoom
        if (visitorMap.has(countryName)) {
            activeLayers.push(layer);
        }
    });

    // Perbarui legenda
    if (legendControl.value) {
        const div = legendControl.value.getContainer();
        let grades = [0];
        if (props.data.length > 0) {
            const maxCount = Math.max(...props.data.map(v => v.count));
            if (maxCount > 0) {
                grades = [0, 100, 500, 1000, 1500, 3000, 5000].filter(g => g <= maxCount + 1000);
                if (grades[grades.length - 1] < maxCount) {
                    grades.push(Math.ceil(maxCount / 1000) * 1000);
                }
                grades = [...new Set(grades)].sort((a, b) => a - b);
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

    // Perbarui info control
    if (infoControl.value) {
        infoControl.value.update();
    }

    // LOGIKA ZOOM CERDAS (SEBAGAI LANGKAH TERAKHIR)
    if (activeLayers.length > 0) {
        // Jika ada negara dengan data, buat grup dari layer tersebut
        const dataBounds = L.featureGroup(activeLayers).getBounds();
        // Atur zoom agar pas dengan grup negara, beri sedikit padding
        map.value.fitBounds(dataBounds.pad(0.1));
    } else {
        // Jika tidak ada data, atur zoom untuk menampilkan seluruh dunia
        if (geojsonLayer.value.getBounds().isValid()) {
            map.value.fitBounds(geojsonLayer.value.getBounds());
        }
    }
};

// Lifecycle hook saat komponen di-mount
onMounted(initializeMap);

// Watcher untuk memantau perubahan pada props.data
const updateTimer = ref(null);
watch(() => props.data, (newData, oldData) => {
    if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
        if (updateTimer.value) {
            clearTimeout(updateTimer.value);
        }
        updateTimer.value = setTimeout(() => {
            updateGeoJsonLayer();
        }, 300); // Debounce 300ms untuk performa
    }
}, { deep: true });

// Lifecycle hook saat komponen di-unmount
onUnmounted(() => {
    if (map.value) {
        map.value.remove();
        map.value = null;
    }
    geojsonLayer.value = null;
    infoControl.value = null;
    legendControl.value = null;
    rawGeoJsonData = null;
});
</script>

<template>
    <div id="map" class="w-full h-[500px] z-40"></div>
</template>

<style scoped>
/* Menambahkan warna latar belakang untuk peta skeleton */
#map {
    background-color: #ffffff00;
}

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
    opacity: 0.8;
}
</style>