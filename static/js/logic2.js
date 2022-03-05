async function main() {
    // Perform a GET request to the query URL/
    const response =  await fetch("static/data/plates.json");
    const data = await response.json();
    console.log(data)
    
   

      // Creating the map object
    const myMap = L.map("map", {
        center: [40.09, -10.71],
        zoom: 4
    });

    // Adding the tile layer

    L.geoJson(data, {
        // Styling each feature (in this case, a neighborhood)
        style: function(feature) {
          return {
            color: "white",
            // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
            fillColor: chooseColor(feature.properties.borough),
            fillOpacity: 0.5,
            weight: 1.5
          };
        },
        // This is called on each feature.
        onEachFeature: function(feature, layer) {
          // Set the mouse events to change the map styling.
          layer.on({
            // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.9
              });
            },
            // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
            mouseout: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.5
              });
            },
            // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
            click: function(event) {
              myMap.fitBounds(event.target.getBounds());
            }
          });
          // Giving each feature a popup with information that's relevant to it
          layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");
    
        }
      }).addTo(myMap);
    
    
    


    // Our style object
    const mapStyle = {
        color: "white",
        fillColor: "pink",
        fillOpacity: 0.5,
        weight: 1.5
    };



};
main()
