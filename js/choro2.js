mapboxgl.accessToken = 
            'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
        const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/light-v10', // style URL
        projection: 'albers',
        zoom: 4, // starting zoom
        center: [-100, 40] // starting center
    });  
    
async function geojsonFetch() { 
    let response = await fetch('assets/LALOW.geojson');
    let lowacin = await response.json();

map.on('load', function loadingData() {
    map.addSource('lowacin', {
        type: 'geojson',
        data: lowacin
    });

    map.addLayer({
        'id': 'lowacin-layer',
        'type': 'fill',
    'source': 'lowacin',
    'paint': {
        'fill-color': [
        'step',
            ['get', 'MFA_LALOW'],
            '#FFEDA0',   // stop_output_0
            50000,          // stop_input_0
            '#FED976',   // stop_output_1
            100000,          // stop_input_1
            '#FEB24C',   // stop_output_2
            150000,          // stop_input_2
            '#FD8D3C',   // stop_output_3
            200000,         // stop_input_3
            '#FC4E2A',   // stop_output_4
            250000,         // stop_input_4
            '#E31A1C',   // stop_output_5
        ],
        'fill-outline-color': '#BBBBBB',
        'fill-opacity': 0.7,    
    }
});

const layers = [
    'less than 50000',
    'less than 100000',
    'less than 150000',
    'less than 200000',
    'less than 300000'
];
const colors = [
    '#FFEDA070',
    '#FED97670',
    '#FEB24C70',
    '#FD8D3C70',
    '#FC4E2A70',
];

const legend = document.getElementById('legend');
    legend.innerHTML = "<b>Food Desert in US<br></b><br><br>";
    const source =
         '<p style="text-align: right; font-size:10pt">Source: <a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/download-the-data/">U.S. DEPARTMENT OF AGRICULTURE</a></p>';
    layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
    });
legend.innerHTML += source;
});
map.on('mousemove', ({point}) => {
    const state = map.queryRenderedFeatures(point, {
        layers: ['lowacin-layer']
    });
    document.getElementById('text-description').innerHTML = state.length ?
        `<h3>${state[0].properties.USA_Counties_NAME}</h3><p><strong><em>${"population in food desert:  " + state[0].properties.MFA_LALOW}</strong> </em></p>` :
        `<p>Hover over a county to see the how many people are living in food desert with low income!</p>`;
    });
}
    geojsonFetch();