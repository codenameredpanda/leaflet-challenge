# leaflet-challenge

This assignment is displays skills learned in javascript, d3, and HTML. d3 was used to extract earthquake data from USGS.gov. Leaflet and GeoJSON were used to map the earthquake data. The size of the bubble represents the magnitude and the color represents the depth. A legend was added to indicate which color represents which depth.
</br>
</br>
</br>
Files in this Repository
Leaflet part 1 -- logic </br>css -- style

</br>
</br>
</br>

Dependencies
JavaScript </br> d3 </br> Leaflet </br> GeoJSON </br> HTML
</br>
</br>
</br>

References
https://earthquake.usgs.gov/earthquakes/feed/
</br>
</br>
</br>

Code
</br>
a. follow the link to the USGS.gov website and navigate to the API page of earthquakes. There are options for hourly, weekly, or monthly APIs. This project utilized the monthly API.</br>
b. Call the data using the correct URL path for desired API. Use d.3 to get the data. Examine the data in order to be able to complete the next part.</br> 
c. Create an earthquake data function to gather all the desired features to show on the map. The data for this project is under "features". The features used here are features.mag, features.geometry.coordinates[0],[1] and [2]. [0] and [1] are the longitude and latitude. [2] is the depth. Using the depth variable, create an if statement to assign a variable color to each depth range (earthquakes can occur up to 700 km underground).</br>
d. Push these variables into a circlemarker. Use the color variable for color and magnitude * 1500 variable for the radius of the bubble.</br>
e. At this point also add the bindpopup function so each bubble can have some extra information.</br>
f. Create an earthquake layer using the earthquakedata function. 
g. In the earthquakemap function, add a street layer and topographical layer using openstreetmap and .tilelayer. Create a basemap using the street and topography layers. Add the earthquake layer as an overlay. Define a new map (myMap) and add the layers to the map. Add layer controls to be able to toggle which layer is visible.</br>
h. Set up the legend. Use Leaflet's L.DomUtil.create("div", "info legend") to add the egend to the HTML code. Create a list of depths and colors. Loop through the two lists to assign each color to the correct depth in the legend. Add the legend to the map.
</br>
</br>
</br>
