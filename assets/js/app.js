import "bootstrap";
import "./ui.js";
import "./map.js";
import "./request.js";

(function(window) {
  window.markers = [];
  window._defaultMarkerLoader = require("../img/ggmMarker/red_MarkerA.png");
  window._defaultMarker = "../img/ggmMarker/red_MarkerA.png";
})(window);
