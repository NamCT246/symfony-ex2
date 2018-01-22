var request = require("./request.js");
var main = {};

main.send = function(data) {
  if (typeof data !== "object") return;

  console.log(data);

  $("#info").html(
    "Your requested location longtitude is " +
      data.lng +
      ", latitude is " +
      data.lat +
      "\n"
  );
};

$(function() {
  $("#changeMarker").on("click", function() {
    var markerLabel = $("#marker-label")
        .val()
        .toUpperCase(),
      markerColor = $("#marker-color").val();

    request.req.changeMarker({ icon: markerLabel, color: markerColor });
  });

  // $("#clearMarkers").click(function() {
  //   for (var i = 0; i < markers.length; i++) {
  //     markers[i].setMap(null);
  //   }
  //   window.markers = markers = [];
  // });

  $("#getDistance").click(function() {
    var mlength = markers.length;

    var from = markers[mlength - 1].position,
      to = markers[mlength - 2].position;

    request.req.getDistance({
      from: {
        lat: from.lat(),
        lng: from.lng()
      },
      to: {
        lat: to.lat(),
        lng: to.lng()
      }
    });
  });
});

module.exports = {
  main: main
};
