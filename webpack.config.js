var Encore = require("@symfony/webpack-encore");

Encore
  // the project directory where compiled assets will be stored
  .setOutputPath("public/build/")
  // the public path used by the web server to access the previous directory
  .setPublicPath("/build")
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  // uncomment to create hashed filenames (e.g. app.abc123.css)
  // .enableVersioning(Encore.isProduction())

  .addEntry("js/app", "./assets/js/app.js")
  .addEntry("js/map", "./assets/js/map.js")
  .addStyleEntry("css/app", "./assets/css/app.css")
  .autoProvidejQuery();

module.exports = Encore.getWebpackConfig();
