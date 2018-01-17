function initMap() {
  var uluru = { lat: -25.363, lng: 131.044 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru
  });

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

window.initMap = initMap;
