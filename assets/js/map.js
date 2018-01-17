/**
 * @References: https://developers.google.com/maps/documentation/javascript/
 * licensed under the Creative Commons Attribution 3.0 License(https://creativecommons.org/licenses/by/3.0/), and code samples are license under the Apache 2.0 License (http://www.apache.org/licenses/LICENSE-2.0)
 *
 * Usage: Google Maps API, Place library, Geocoding library.
 *
 * https://github.com/googlemaps/
 */

var ui = require("./ui.js");

function initMap() {
  console.log(google.maps);

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10
  });

  addSearchBox(map);

  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          marker = new google.maps.Marker({
            position: pos,
            map: map
          });

        infoWindow.setPosition(pos);
        infoWindow.setContent("You are here");
        infoWindow.open(map);
        map.setCenter(pos);

        marker.addListener("click", function() {
          infoWindow.setContent("It's your location");
          infoWindow.open(map, marker);
        });
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function addSearchBox(map) {
  var input = document.getElementById("pac-input");
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.

    /** so markers array will only have 1 elememt ever? */
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        },
        markerInfo = new google.maps.InfoWindow(),
        lat = place.geometry.location.lat(),
        lng = place.geometry.location.lng();

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        })
      );

      markers.forEach(function(marker) {
        marker.addListener("click", function() {
          infoWindow.setPosition(marker.position);
          infoWindow.setContent("lat: " + lat + ", lng: " + lng);
          infoWindow.open(map, this);
        });
      });

      ui.main.send({
        lat: lat,
        lng: lng
      });

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);
  });
}

window.initMap = initMap;

/**
 * todo: break the marker, icon, infowindow codes to
 * new function to increase readability
 */
