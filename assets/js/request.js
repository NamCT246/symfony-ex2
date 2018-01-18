var req = {};

req.send = function(data) {
  $.post("/marker/default", JSON.stringify({ icon: data })).done(function(res) {
    console.log(res);
    window._mIcon = res;
  });
};

module.exports = {
  req: req
};
