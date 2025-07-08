```vue
<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import L from 'leaflet';

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    }
});

// Reference to raw GeoJSON data (cached)
const rawGeoJsonData = ref(null);
const geoJsonDataProcessed = ref(null);

// Leaflet map instance
let map, geojson, info, legend;

// Normalize country names (e.g., 'US' to 'United States')
const normalizeCountryName = (country) => {
    const countryMap = {
        'US': 'United States',
        'UK': 'United Kingdom',
        // Add more mappings as needed
    };
    return countryMap[country] || country;
};

// Function to determine color based on visitor count
const getColor = (count) =>
    count > 5000 ? '#800026' :
        count > 3000 ? '#BD0026' :
            count > 1500 ? '#E31A1C' :
                count > 1000 ? '#FC4E2A' :
                    count > 500 ? '#FD8D3C' :
                        count > 100 ? '#FEB24C' :
                            '#FFEDA0';

// Styling for GeoJSON
const style = (feature) => {
    const count = feature.properties.count || 0;
    const isChoropleth = props.data.some(v => normalizeCountryName(v.country) === feature.properties.shapeName);
    return {
        fillColor: isChoropleth ? getColor(count) : '#ccc',
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: isChoropleth ? 0.7 : 0.3,
    };
};

// Mouse interactions
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

// Initialize map and load GeoJSON
const initializeMap = async () => {
    try {
        // Initialize map
        map = L.map('map', {
            zoomControl: true,
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
            zoomSnap: 0.25
        }).addTo(map);

        // Load GeoJSON data
        const { default: geoJsonData } = await import(/* webpackChunkName: "geoJsonData" */ '../../dummydata/geoBoundariesCGAZ_ADM0.json');
        rawGeoJsonData.value = geoJsonData;

        // Validate GeoJSON data
        if (!rawGeoJsonData.value || !rawGeoJsonData.value.features) {
            throw new Error('Invalid GeoJSON data');
        }

        // Process and update GeoJSON layer
        await updateGeoJsonLayer();
        map.setView([0, 0], 2);
    } catch (err) {
        console.error('Error initializing map:', err);
        alert('Failed to load map.');
    }
};

// Update GeoJSON layer with new data
const updateGeoJsonLayer = async () => {
    try {
        if (!rawGeoJsonData.value) return;

        // Process GeoJSON with visitor counts
        geoJsonDataProcessed.value = {
            ...rawGeoJsonData.value,
            features: rawGeoJsonData.value.features.map(f => {
                const visitor = props.data.find(v => normalizeCountryName(v.country) === f.properties.shapeName);
                f.properties.count = visitor ? visitor.count : 0;
                return f;
            }),
        };

        // Remove existing GeoJSON layer
        if (geojson) {
            map.removeLayer(geojson);
        }

        // Add new GeoJSON layer
        geojson = L.geoJson(geoJsonDataProcessed.value, { style, onEachFeature }).addTo(map);

        // Zoom to GeoJSON bounds
        if (geojson.getBounds().isValid()) {
            map.fitBounds(geojson.getBounds());
        }

        // Update or add info control
        if (!info) {
            info = L.control();
            info.onAdd = function () {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            };
            info.update = function (props) {
                this._div.innerHTML = '<h4>Visitor Info</h4>' +
                    (props ? `<b>${props.shapeName}</b><br />${props.count} visitors` : 'Hover over a country');
            };
            info.addTo(map);
        } else {
            info.update();
        }

        // Update or add legend control
        if (legend) {
            map.removeControl(legend);
        }
        legend = L.control({ position: 'bottomright' });
        legend.onAdd = function () {
            const div = L.DomUtil.create('div', 'info legend');
            const maxCount = Math.max(...props.data.map(v => v.count), 5000);
            const grades = [0, ...Array.from({ length: 5 }, (_, i) => Math.ceil(maxCount / 5 * (i + 1)))];
            for (let i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    `<i style="background:${getColor(grades[i] + 1)}"></i> ${grades[i]}${grades[i + 1] ? '–' + grades[i + 1] : '+'}<br>`;
            }
            return div;
        };
        legend.addTo(map);
        map.setView([0, 0], 2);
    } catch (err) {
        console.error('Error updating choropleth:', err);
        alert('Failed to update choropleth data.');
    }
};

onMounted(initializeMap);

watch(() => props.data, async () => {
    await updateGeoJsonLayer();
    
}, { deep: true });

onUnmounted(() => {
    if (map) map.remove();
});
</script>

<template>
    <div id="map" class="w-full h-[500px] z-40"></div>
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