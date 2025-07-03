export const indonesiaGeoJSON = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: { name: 'DKI Jakarta', visitors: 1000 },
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [106.7741, -6.2088],
                        [106.8741, -6.2088],
                        [106.8741, -6.3088],
                        [106.7741, -6.3088],
                        [106.7741, -6.2088],
                    ],
                ],
            },
        },
        {
            type: 'Feature',
            properties: { name: 'Jawa Barat', visitors: 800 },
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [107.5, -6.9],
                        [108.5, -6.9],
                        [108.5, -7.9],
                        [107.5, -7.9],
                        [107.5, -6.9],
                    ],
                ],
            },
        },
        {
            type: 'Feature',
            properties: { name: 'Bali', visitors: 500 },
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [115.1, -8.6],
                        [115.3, -8.6],
                        [115.3, -8.8],
                        [115.1, -8.8],
                        [115.1, -8.6],
                    ],
                ],
            },
        },
    ],
};

export const mapsVisitor = {
    data: [
        { id: 1, lat: -6.2088, lng: 106.8456, city: 'Jakarta', time: '2025-07-02 13:30' },
        { id: 2, lat: -7.7956, lng: 110.3695, city: 'Yogyakarta', time: '2025-07-02 13:31' },
        { id: 3, lat: -8.6705, lng: 115.2126, city: 'Denpasar', time: '2025-07-02 13:32' },
    ]
}