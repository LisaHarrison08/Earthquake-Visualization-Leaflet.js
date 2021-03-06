// Store our API endpoint inside queryUrl
// Data set: 'All Earthquakes from the Past 7 Days'
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

// Function to Determine Color of Marker Based on the Magnitude of the Earthquake
function markerColor(mag) {
  if (mag < 1) {
    return "#DAF7A6";
  } else if (mag < 2) {
    return "#FFC300";
  } else if (mag < 3) {
    return "#FF4500";
  } else if (mag < 4) {
    return "#C70039";
  } else if (mag < 5) {
    return "#DC143C";
  } else {
    return "#8B0000";
  };
}
function markerSize(mag) {
  return mag * 20000;
}
function createFeatures(earthquakeData) {


  var earthquakes = L.geoJSON(earthquakeData, {

    // Define a function we want to run once for each feature in the features array // Give each feature a popup describing the place and time of the earthquake
    onEachFeature: function (feature, layer) {

      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p> Magnitude: " + feature.properties.mag + "</p>")
    },
    pointToLayer: function (feature, latlng) {
      return new L.circle(latlng,
        {
          radius: markerSize(feature.properties.mag),
          fillColor: markerColor(feature.properties.mag),
          fillOpacity: 0.55,
          stroke: false,
        })
    }
  });

  // Send earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define satelite map and darkmap layers
  var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satelite Map": satelitemap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the satelite map and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [satelitemap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Set Up Legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend"),
      magnitudeLevels = [0, 1, 2, 3, 4, 5];

    div.innerHTML += "<h3>Magnitude</h3>"

    for (var i = 0; i < magnitudeLevels.length; i++) {
      div.innerHTML +=
        '<i style="background: ' + markerColor(magnitudeLevels[i] + 1) + '"></i> ' +
        magnitudeLevels[i] + (magnitudeLevels[i + 1] ? '&ndash;' + magnitudeLevels[i + 1] + '<br>' : '+');
    }
    return div;
  };

  // Add Legend to the Map
  legend.addTo(myMap);
}