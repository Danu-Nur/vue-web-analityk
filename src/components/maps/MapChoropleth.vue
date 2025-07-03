```vue
<script setup>
import { onMounted, onUnmounted, ref, reactive } from 'vue';
import L from 'leaflet';

// Data pengunjung menggunakan reactive untuk responsivitas
const visitors = reactive([
    { country: 'Indonesia', count: 2810 },
    { country: 'Singapore', count: 770 },
    { country: 'Malaysia', count: 80 },
    { country: 'Thailand', count: 1330 },
    { country: 'Philippines', count: 650 },
    { country: 'China', count: 2650 },
]);

const choroplethCountries = visitors.map(v => v.country);
let map, geojson, info;
const geoJsonDataProcessed = ref(null);

// Fungsi untuk menentukan warna berdasarkan jumlah pengunjung
const getColor = (count) =>
    count > 5000 ? '#800026' :
        count > 3000 ? '#BD0026' :
            count > 1500 ? '#E31A1C' :
                count > 1000 ? '#FC4E2A' :
                    count > 500 ? '#FD8D3C' :
                        count > 100 ? '#FEB24C' :
                            '#FFEDA0';

// Styling untuk GeoJSON
const style = (feature) => {
    const count = feature.properties.count || 0;
    const isChoropleth = choroplethCountries.includes(feature.properties.shapeName);
    return {
        fillColor: isChoropleth ? getColor(count) : '#ccc',
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: isChoropleth ? 0.7 : 0.3,
    };
};

// Interaksi mouse
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
    info.update(e.target.feature.properties);
};

const resetHighlight = (e) => {
    geojson.resetStyle(e.target);
    info.update();
};

const zoomToFeature = (e) => {
    map.fitBounds(e.target.getBounds());
};

const onEachFeature = (feature, layer) => {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
    });
};

// Fungsi untuk inisialisasi choropleth
const initializeChoropleth = async () => {
    try {
        // Lazy load data GeoJSON dengan chunking
        const { default: geoJsonData } = await import(/* webpackChunkName: "geoJsonData" */ '../../dummydata/geoBoundariesCGAZ_ADM0.json');

        // Validasi data GeoJSON
        if (!geoJsonData || !geoJsonData.features) {
            throw new Error('Data GeoJSON tidak valid');
        }

        // Proses data GeoJSON
        geoJsonDataProcessed.value = {
            ...geoJsonData,
            features: geoJsonData.features.map(f => {
                const v = visitors.find(v => v.country === f.properties.shapeName);
                f.properties.count = v ? v.count : 0;
                return f;
            }),
        };

        // Tambahkan GeoJSON ke peta
        geojson = L.geoJson(geoJsonDataProcessed.value, { style, onEachFeature }).addTo(map);

        // Zoom ke batas choropleth setelah GeoJSON ditambahkan
        map.fitBounds(geojson.getBounds());

        // Kontrol info
        info = L.control();
        info.onAdd = function () {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };
        info.update = function (props) {
            this._div.innerHTML = '<h4>Info Pengunjung</h4>' +
                (props ? `<b>${props.shapeName}</b><br />${props.count} pengunjung` : 'Arahkan kursor ke negara');
        };
        info.addTo(map);

        // Kontrol legenda
        // const legend = L.control({ position: 'bottomright' });
        // legend.onAdd = function () {
        //     const div = L.DomUtil.create('div', 'info legend');
        //     const grades = [0, 100, 500, 1000, 1500, 3000, 5000];
        //     for (let i = 0; i < grades.length; i++) {
        //         div.innerHTML +=
        //             `<i style="background:${getColor(grades[i] + 1)}"></i> ${grades[i]}${grades[i + 1] ? '–' + grades[i + 1] : '+'}<br>`;
        //     }
        //     return div;
        // };
        // legend.addTo(map);
    } catch (err) {
        console.error('Error:', err);
        alert('Gagal memuat data choropleth. Silakan cek file GeoJSON.');
    }
};

onMounted(async () => {
    try {
        // Inisialisasi peta terlebih dahulu
        map = L.map('map', {
            zoomControl: true,
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
            zoomSnap: 0.25
        }).addTo(map);

        // Panggil fungsi untuk memproses choropleth dan zoom
        await initializeChoropleth();
        map.setView([0, 0], 2);
    } catch (err) {
        console.error('Error:', err);
        alert('Gagal memuat peta.');
    }
});

onUnmounted(() => {
    if (map) map.remove();
});
</script>

<template>
    <div id="map" class="w-full h-[500px]"></div>
</template>

<style scoped>
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
```