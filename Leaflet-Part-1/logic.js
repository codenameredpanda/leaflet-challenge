// Store our API endpoint as queryUrl.
let queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

// Create features function
function createFeatures(earthquakeData) {

  // Empty list to add to layer
  let markers = [];

  // Loop through data to add features to markers list
  for (var i = 0; i < earthquakeData.length; i++) {

    // create a variable for magnitude
    let magnitude = earthquakeData[i].properties.mag

    // Create a variable for latitude
    let lat = earthquakeData[i].geometry.coordinates[1]

    // Create a variable for longitude
    let lng = earthquakeData[i].geometry.coordinates[0]

    //Combine the two lat and lng into one variable
    let coordinates = [lat,lng]

    // Create a variable for depth
    let depth = earthquakeData[i].geometry.coordinates[2]

    // Conditionals for depth color using depth variable
    let color = "";
    if (depth > 300) {
      color = "red";
    }
    else if (depth > 70) {
      color = "deeppink";
    }
    else if (depth > 45) {
      color = "orange";
    }
    else if (depth > 20) {
      color = "yellow";
    }
    else if (depth > 10) {
      color = "blue";
    }
    else {
      color = "lightgreen";
    }
 
    // Add all of the gatherd data to the markers list along with the popup info
    markers.push(
      L.circle(coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: color,
        fillColor: color,
        radius: magnitude * 15000
      }).bindPopup(`<h3>Location: ${(earthquakeData[i].properties.place)}</h3><hr><p>Date: ${new Date(earthquakeData[i].properties.time)}</p></h3><hr><p>Magnitude: ${(earthquakeData[i].properties.mag)}</p><hr><p>Depth: ${(earthquakeData[i].geometry.coordinates[2])}</p>`)
    )
  }

  // define a new layer using the data in the markers list
  let earthquakes = L.layerGroup(markers)

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

// Create map function
function createMap(earthquakes) {

  // Add a street layer
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // Add a topography layer
  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [street, earthquakes]
  });


  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


 // Set up the legend.
 let legend = L.control({position: "bottomright"});
  legend.onAdd = function() {

    let div = L.DomUtil.create("div", "info legend");
    let depth = ["300+", "299.9-70", "69.9-45", "44.9-20", "19.9-10.1", "<10"];
    let colors = ["red", "deeppink", "orange", "yellow", "blue", "lightgreen"];

    // Loop through the depth list described above to assign the correct color to each depth       
    for (let i = 0; i < depth.length; i++) {
        div.innerHTML +=
            "<li style=\"background-color: " + colors[i] + "\">" + depth[i] + "</li>"; 
    }/* Dear Grader, 
        Here is where I would add some HTML styling, except I couldn't figure it out. 
        When I asked my teacher for help, he told me that I need to know HTML.I told him 
        I was stuck on HTML, and he refused to help me understand what I was stuck on, 
        saying again that I need to know HTML. Well of course I need to know HTML, that's 
        literally why I am asking for help with HTML. How is telling me I need to just 
        magically know HTML supposed to help me learn? I went to office hours because I 
        needed extra help, and instead I was ridiculed for not understanding. I am very
        upset about this dear grader. And still I don't know how I can style this correctly 
        or why it is not appearing as it supposed to.
      */
    return div;
 };
 legend.addTo(myMap);
} 


