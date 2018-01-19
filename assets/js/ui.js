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

    request.req.send({ icon: markerLabel, color: markerColor });
  });
});

module.exports = {
  main: main
};
