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
    var requestMarker = $("#marker-type").val();
    request.req.send(requestMarker);
  });
});

module.exports = {
  main: main
};
