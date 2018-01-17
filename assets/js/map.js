const loadGoogleMapsAPI = require("load-google-maps-api");

loadGoogleMapsAPI({
  key: "AIzaSyDFaA3gybURsl7iwQf4hR6PenuyhdtxIFo"
})
  .then(function(googleMaps) {
    var latlng = new googleMaps.LatLng(39.305, -76.617);
    map = new googleMaps.Map(document.getElementById("map"), {
      center: latlng,
      zoom: 12
    });
    var marker = new googleMaps.Marker({
      position: latlng,
      map: map
    });
    console.log(googleMaps);
  })
  .catch(err => {
    console.error(err);
  });
