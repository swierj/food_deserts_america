mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

        const map = new mapboxgl.Map({
                container: 'map', // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                zoom: 4.5, // starting zoom
                center: [-98.5795, 39.8283] // starting center
            }
        );

        async function geojsonFetch() { 
            let response = await fetch('assets/map2.geojson');
            let stateData = await response.json();
            map.on('load', function loadingData() {
                map.addSource('map2', {
                type: 'geojson',
                data: 'assets/map2.geojson'
                });
                map.addLayer({
                    'id': 'LAPOP1_10_Num_layer',
                    'type': 'fill',
                    'source': 'map2',
                    'paint': { 
                        'fill-color':[
                            'step',
                            ['get', 'LAPOP1_10_Num'],
                            '#FFEDA0',   // stop_output_0
                            500,          // stop_input_0
                            '#FED976',   // stop_output_1
                            1000,          // stop_input_1
                            '#FEB24C',   // stop_output_2
                            2000,          // stop_input_2
                            '#FD8D3C',   // stop_output_3
                            3000,         // stop_input_3
                            '#FC4E2A',   // stop_output_4
                            4000,         // stop_input_4
                            '#E31A1C',   // stop_output_5
                            6000,         // stop_input_5
                            '#BD0026',   // stop_output_6
                            10000,        // stop_input_6
                            "#800026"    // stop_output_7
                        ],
                        'fill-outline-color': '#000000',
                        'fill-opacity': 0.5,
                    }
                });
            });
            

            const layers = [
                'Null (No Data)',
                '<500',
                '501-1000',
                '1001-2000',
                '2001-3000',
                '3001-4000',
                '4001-6000',
                '6000+'
            ];
            const colors = [
                '#000000',
                '#FFEDA0',
                '#FED976',
                '#FEB24C',
                '#FD8D3C',
                '#FC4E2A',
                '#E31A1C',
                '#BD0026',
                '#800026'
            ];

            const legend = document.getElementById('legend');
            legend.innerHTML = "<b>Number of People in a Food Desert<br></b><br><br>";

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

            map.on('mousemove', ({point}) => {
                const state = map.queryRenderedFeatures(point, {
                    layers: ['LAPOP1_10_Num_layer']
                });
                document.getElementById('text-description').innerHTML = state.length ?
                    `<h3>${state[0].properties.Cleaned_County}</h3><p><strong><em>${state[0].properties.LAPOP1_10_Num}</strong> People in a Food Desert</em></p>` :
                    `<p>Hover over a County!</p>`;
            });
        };

        geojsonFetch();