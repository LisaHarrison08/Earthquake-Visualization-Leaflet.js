# Visualizing USGS Data with Leaflet

## Background

![1-Logo](Images/1-Logo.png)

The United States Geological Survey (USGS) is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. 

They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.


### Part 1: Earthquake Visualization

![2-BasicMap](Images/2-BasicMap.png)

Earthquake data set visualization.

1. **Data**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. 
   Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page to explore the data sets available to visualize. When you select a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. The URL of this JSON is used to pull in the data for the visualization.

   ![4-JSON](Images/4-JSON.png)

2. **Import & Visualize the Data**

   Created a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

   * The data markers reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.

   * **HINT** the depth of the earth can be found as the third coordinate for each earthquake.

   * Popups included that provide additional information about the earthquake when a marker is clicked.

   * Created a legend that will provide context for the map data.

- - -

### Part 2: More Data 

![5-Advanced](Images/5-Advanced.png)

A second USGS data set plotted on the map to illustrate the relationship between tectonic plates and seismic activity. For this section a second data set was pulled in and visualized along side the original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

* Plotted a second data set on the map.

* Added a number of base maps to choose from as well as separated out the two different data sets into overlays that can be turned on and off independently.

* Added layer controls to the map.

- - -
