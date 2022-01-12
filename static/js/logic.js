async function main() {

    const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

    // Perform a GET request to the query URL/
    const response =  await fetch(url);
    const data = await response.json();

    console.log(data);

    let features = data.features;
    console.log(features);
    // console.log(features.geometry.coordinates)

  // Create function to change color based on depth
  function getColor(depth) {
    return depth > 90 ? '#d73027' :
        depth > 70   ? '#fc8d59' :
        depth > 50   ? '#fee08b' :
        depth > 20   ? '#d9ef8b' :
        depth > 10   ? '#91cf60':
                       '#1a9850';
}

    
    // An array that will store the created earthquakeMarkers
    let earthquakeMarkers = [];

    // // Loop through the json info, create a new marker, and push it to the earthquakeMarkers array
    for (let index = 0; index < features.length; index++){ 
    //Define variables used to get different colored markers
        let earthquake = features[index];
        let magnitude = earthquake.properties.mag;
        let depth = earthquake.geometry.coordinates[2];
        //Add marker info
        // let earthquakeMarkers = L.marker([earthquake.geometry])

        if(earthquake){
            earthquakeMarkers.push(
            L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
                fillOpacity: 0.75,
                color: getColor(depth),
                fillColor: getColor(depth),
                stroke:true,
                // Adjust the radius.
                radius: magnitude * 10000
            // Add pop up info over markers
            }).bindPopup("<h3>" + 'Area Hit: ' + earthquake.properties.place + + '<br>' +'<hr>'+'Magnitude: ' + magnitude  + '<br>'+ '<hr>'+ 'Time: ' + new Date(earthquake.properties.time) + "</h1>")
            )};
        };
    // Add all the earthquakeMarkers to a new layer group.
    // Now, we can handle them as one group instead of referencing each one individually.
    let earthquakeLayer = L.layerGroup(earthquakeMarkers)


    // Defining and adding the tile layers
    let street =L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
        // }).addTo(myMap);

    // Topography Layer     
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

        //Only one base layer can be shown at a time.
    let baseMap = {
        "Street Map": street,
        "Topographic Map": topo
    };

        // Overlays that can be toggled on or off.
    let mapsOverlay = {
        Earthquakes: earthquakeLayer, 
    };

        // Creating the map object
    let myMap = L.map('map', {
        center: [40.09, -10.71],
        zoom: 4, 
        layers: [street, earthquakeLayer]
    });
            
        // Create a layer control.
        // Pass it our baseMaps and overlayMaps.
        // Add the layer control to the map.
    L.control.layers(baseMap, mapsOverlay).addTo(myMap);  

    // Set up the legend.
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function(myMap) {
        const div = L.DomUtil.create("div", "info legend");
        const title = ['<h1>Depth of Earthquake</h1>'];
        const labels = depths[-10, 10, 20, 50, 70, 90, +90];
   
    // Loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < depth.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(depth[i] + 1) + '"></i> ' +
            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }
        return div;
    };

    //   Adding the legend to the map
     legend.addTo(myMap);

                
};

main();