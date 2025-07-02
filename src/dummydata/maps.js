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

