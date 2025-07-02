<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import L from 'leaflet';

// Pastikan leaflet CSS dimuat
import 'leaflet/dist/leaflet.css';

// Data pengunjung (agregasi)
const rawData = [
    { country: 'Indonesia', region: 'Jakarta', count: 1250 },
    { country: 'Indonesia', region: 'Bali', count: 890 },
    { country: 'Indonesia', region: 'Surabaya', count: 670 },
    { country: 'Singapore', region: 'Central', count: 450 },
    { country: 'Singapore', region: 'North', count: 320 },
    { country: 'Malaysia', region: 'Kuala Lumpur', count: 780 },
    { country: 'Malaysia', region: 'Penang', count: 560 },
    { country: 'Thailand', region: 'Bangkok', count: 920 },
    { country: 'Thailand', region: 'Chiang Mai', count: 410 },
    { country: 'Philippines', region: 'Manila', count: 650 },
];

// Daftar negara yang akan menggunakan choropleth
const choroplethCountries = ['Indonesia', 'Singapore', 'Malaysia', 'Thailand', 'Philippines'];

// Agregasi data berdasarkan country
const aggregatedData = rawData.reduce((acc, curr) => {
    if (!acc[curr.country]) {
        acc[curr.country] = { country: curr.country, count: 0 };
    }
    acc[curr.country].count += curr.count;
    return acc;
}, {});
const visitors = ref(Object.values(aggregatedData));

// Referensi untuk GeoJSON
const geoJsonData = ref(null);

// Referensi peta dan layer
let map = null;
let geojson = null;
let info = null;

// Fungsi untuk menentukan warna berdasarkan jumlah pengunjung
const getColor = (count) => {
    return count > 5000 ? '#800026' :
        count > 3000 ? '#BD0026' :
            count > 1500 ? '#E31A1C' :
                count > 1000 ? '#FC4E2A' :
                    count > 500 ? '#FD8D3C' :
                        count > 100 ? '#FEB24C' :
                            '#FFEDA0';
};

// Fungsi untuk gaya setiap wilayah
const style = (feature) => {
    const isChoropleth = choroplethCountries.includes(feature.properties.shapeName);
    return {
        fillColor: isChoropleth ? getColor(feature.properties.count || 0) : '#3388ff', // Warna default untuk non-choropleth
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: isChoropleth ? '3' : '',
        fillOpacity: isChoropleth ? 0.7 : 0.4, // Opacity lebih rendah untuk peta biasa
    };
};

// Fungsi untuk menyoroti wilayah saat hover
const highlightFeature = (e) => {
    const layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7,
    });
    layer.bringToFront();
    info.update(layer.feature.properties);
};

// Fungsi untuk mereset gaya saat hover selesai
const resetHighlight = (e) => {
    geojson.resetStyle(e.target);
    info.update();
};

// Fungsi untuk zoom ke wilayah saat diklik
const zoomToFeature = (e) => {
    map.fitBounds(e.target.getBounds());
};

// Fungsi untuk menambahkan interaksi ke setiap wilayah
const onEachFeature = (feature, layer) => {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
    });
};

// Inisialisasi peta dan muat GeoJSON secara lazy menggunakan fetch
onMounted(async () => {
    // Lazy load GeoJSON menggunakan fetch
    try {
        const response = await fetch('/geoBoundariesCGAZ_ADM0.json');
        if (!response.ok) {
            throw new Error('Gagal memuat file GeoJSON');
        }
        const geoModule = await response.json();
        geoJsonData.value = {
            ...geoModule,
            features: geoModule.features.map((feature) => {
                const visitor = visitors.value.find((v) => v.country === feature.properties.shapeName);
                return {
                    ...feature,
                    properties: {
                        ...feature.properties,
                        count: visitor ? visitor.count : 0,
                    },
                };
            }),
        };
    } catch (error) {
        console.error('Gagal memuat GeoJSON:', error);
    }

    // Inisialisasi peta
    map = L.map('map').setView([0, 110], 3); // Pusat di Asia Tenggara

    // Tambahkan tile layer dari OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Tambahkan layer GeoJSON jika data tersedia
    if (geoJsonData.value) {
        geojson = L.geoJson(geoJsonData.value, {
            style,
            onEachFeature,
        }).addTo(map);
    }

    // Tambahkan kontrol info
    info = L.control();
    info.onAdd = function () {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };
    info.update = function (props) {
        this._div.innerHTML = '<h4>Info Pengunjung</h4>' + (props ?
            `<b>${props.shapeName}</b><br />${props.count} pengunjung` :
            'Arahkan kursor ke negara');
    };
    info.addTo(map);

    // Tambahkan legenda untuk choropleth
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
        const grades = [0, 100, 500, 1000, 1500, 3000, 5000];
        const labels = ['<strong>Jumlah Pengunjung</strong>'];
        for (let i = 0; i < grades.length; i++) {
            labels.push(
                `<i style="background:${getColor(grades[i] + 1)}"></i> ${grades[i]}${grades[i + 1] ? '–' + grades[i + 1] : '+'}`
            );
        }
        div.innerHTML = labels.join('<br>');
        return div;
    };
    legend.addTo(map);

    // Simulasi pembaruan real-time (update data pengunjung setiap 10 detik)
    const interval = setInterval(() => {
        visitors.value.forEach((visitor) => {
            visitor.count += Math.floor(Math.random() * 50); // Tambah pengunjung acak
        });
        if (geoJsonData.value) {
            geoJsonData.value.features = geoJsonData.value.features.map((feature) => {
                const visitor = visitors.value.find((v) => v.country === feature.properties.shapeName);
                return {
                    ...feature,
                    properties: {
                        ...feature.properties,
                        count: visitor ? visitor.count : 0,
                    },
                };
            });
            // Update gaya tanpa menghapus layer
            if (geojson) {
                geojson.setStyle(style);
            }
        }
    }, 10000);

    // Bersihkan interval saat komponen di-unmount
    onUnmounted(() => clearInterval(interval));
});
</script>

<template>
    <div id="map" style="height: 800px;"></div>
</template>

<style scoped>
#map {
    width: 100%;
}

.info {
    padding: 6px 8px;
    font: 14px/16px Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.info h4 {
    margin: 0 0 5px;
    color: #777;
}

.legend {
    padding: 6px 8px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.legend i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}
</style>