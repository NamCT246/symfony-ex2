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

module.exports = {
  main: main
};
