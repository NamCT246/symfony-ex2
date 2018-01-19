var req = {};

// prettier-ignore
req.send = function(data) {
  $.post(
    "/marker",
    JSON.stringify({
      icon: data.icon,
      color: data.color.toLowerCase()
    })
  ).done(function(res) {
    console.log(res);
    window._markerIcon = require("../img/ggmMarker/" + res);
  });
};

module.exports = {
  req: req
};
