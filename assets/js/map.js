/**
 * @References: https://developers.google.com/maps/documentation/javascript/
 * licensed under the Creative Commons Attribution 3.0 License(https://creativecommons.org/licenses/by/3.0/), and code samples are license under the Apache 2.0 License (http://www.apache.org/licenses/LICENSE-2.0)
 *
 * Usage: Google Maps API, Place library, Geocoding library.
 *
 * https://github.com/googlemaps/
 */

var ui = require("./ui.js");
var request = require("./request.js");

function initMap() {
  console.log(google.maps);

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10
  });

  map.addListener("click", function(event) {
    addMarker(event.latLng, map);
  });

  addSearchBox(map);

  infoWindow = new google.maps.InfoWindow();

  request.req.loadMarkers().done(function(data) {
    console.log(data);
    data.forEach(function(marker) {
      var m_icon = marker.type.split("/");

      var m = new google.maps.Marker({
        position: new google.maps.LatLng(marker.lat, marker.lng),
        map: map,
        title: marker.content,
        icon: require("../img/ggmMarker/" + m_icon[3])
      });

      m.id = marker.id;
      m.lat = marker.lat;
      m.lng = marker.lng;

      window.markers.push(m);

      m.addListener(
        "click",
        (function(index) {
          return function() {
            markerLClick(index);
          };
        })(window.markers.length - 1)
      );

      m.addListener(
        "rightclick",
        (function(index) {
          return function() {
            markerRClick(index);
          };
        })(window.markers.length - 1)
      );
    });
  });

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

function addMarker(location, map) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: window._markerIconLoaded || window._defaultMarkerLoaded
  });
  (marker.lat = marker.position.lat()), (marker.lng = marker.position.lng());

  var req_marker = {
    lat: marker.lat,
    lng: marker.lng,
    icon: window._markerIcon || window._defaultMarker,
    content: "lat: " + marker.lat + ", lng: " + marker.lng
  };

  request.req.addMarker(req_marker).done(function(response) {
    marker.id = response.id;
    markers.push(marker);

    marker.addListener(
      "click",
      (function(index) {
        return function() {
          markerLClick(index);
        };
      })(window.markers.length - 1)
    );

    marker.addListener(
      "rightclick",
      (function(index) {
        return function() {
          markerRClick(index);
        };
      })(window.markers.length - 1)
    );
  });

  ui.main.send({
    lat: marker.lat,
    lng: marker.lng
  });
}

function markerLClick(index) {
  var marker = markers[index];
  var infowindow = new google.maps.InfoWindow();

  marker.title
    ? infowindow.setContent(markers[index].title)
    : infowindow.setContent("lat: " + marker.lat + ", lng: " + marker.lng);

  infowindow.open(map, marker);
}

function markerRClick(index) {
  $("#if-modal").modal("show");

  $(".if-save")
    .unbind()
    .click(function(event) {
      event.stopImmediatePropagation();
      var content = $(".if-content").val(),
        data = {
          id: markers[index].id,
          lat: markers[index].lat,
          lng: markers[index].lng,
          content: content
        };
      request.req.saveMarkerContent(data).done(function(resp) {
        console.log(resp);
        markers[index].title = resp.content;
        $("#if-modal").modal("hide");
      });
    });
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

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      // Create a marker for each place.
      addMarker(place.geometry.location, map);

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
