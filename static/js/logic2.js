async function main() {

    const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

    // Perform a GET request to the query URL/
    const response =  await fetch(url);
    const data = await response.json();

    console.log(data);

    let features = data.features;
    console.log(features);
    

    // }).addTo(myMap);
    
    // L.geoJson(data).addTo(myMap);


    // function createFeatures(features) {

    //     // Define a function that we want to run once for each feature in the features array.
    //     // Give each feature a popup that describes the place and time of the earthquake.
    //     function onEachFeature(feature, layer) {
    //       layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    //     }
      
    //     // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    //     // Run the onEachFeature function once for each piece of data in the array.
    //     var earthquakes = L.geoJSON(features, {
    //       onEachFeature: onEachFeature
    //     });
      
    //     // Send our earthquakes layer to the createMap function/
    //     createMap(earthquakes);
    // }
      

    // // Define a function that we want to run once for each feature in the features array.
    // // Give each feature a popup that describes the place and time of the earthquake.
    
    // var geojson = {
    //     "type": "FeatureCollection",                                                                          
    //     "features": [
    //     { "type": "Feature", "id": 0, "properties": { "NAME": "Duluth Entertainment Convention Center (DECC)" }, "geometry": { "type": "Point", "coordinates": [ –92.097675, 46.781194 ] } }
    //     ]
    //     };
        

    // geojsonLayer = L.geoJson(data, {
    //     style: function(features) {
    //         return {
    //         color: "green"
    //         };
    //     },
           
        
    //     pointToLayer: function(feature, latlng) {
    //         return new L.circle([features.geometry.coordinates[1], features.geometry.coordinates[2]], {
    //                 fillOpacity: 0.75,
    //                 color: getColor(depth),
    //                 fillColor: getColor(depth),
    //                 // Adjust the radius.
    //                 radius: magnitude * 7000
    //             });
    //         },
    //         // Binding a popup to each layer
    //         onEachFeature: function (feature, layer) {
    //             layer.bindPopup("<h3>" + 'Area Hit: ' + features.properties.place[i] + + '<br>' +'<hr>'+'Magnitude: ' + magnitude  + '<br>'+ '<hr>'+ 'Time: ' + new Date(features.properties.time[i]) + "</h1>");
    //             }
    // });
    // map.addLayer(geojsonLayer);
  