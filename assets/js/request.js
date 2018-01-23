var req = {};

/*these request functions can be wrapped
  into 1, like send(), but not now 
*/

// prettier-ignore
req.changeMarker = function(data) {
  $.post(
    "/marker/type",
    JSON.stringify({
      icon: data.icon,
      color: data.color.toLowerCase()
    })
  ).done(function(res) {
    console.log(res);
    window._markerIcon = "../img/ggmMarker/" + res;              
    window._markerIconLoaded = require("../img/ggmMarker/" + res);              
  });
};

req.getDistance = function(data) {
  $.post(
    "/distance",
    JSON.stringify({
      from: data.from,
      to: data.to
    })
  ).done(function(res) {
    var response = JSON.parse(res);

    $(".distance").html(
      "The distance between those points are " +
        response.rows[0].elements[0].distance.text
    );
  });
};

req.getDirection = function(data) {
  $.post("/direction", JSON.stringify(data)).done(function(resp) {
    console.log(resp);
  });
};

req.addMarker = function(data) {
  return $.post("/marker/add", JSON.stringify(data));
};

req.saveMarkerContent = function(data) {
  return $.post("/marker/content/" + data.id, JSON.stringify(data));
};

req.loadMarkers = function() {
  return $.get("/markers/load");
};

module.exports = {
  req: req
};
