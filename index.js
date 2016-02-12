// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

// Inject the config into the global scope?
config = require('./config.js').config;

isIOS = tabris.device.get("platform") === "iOS";

// Web Services
loading = false;
Promise = require("promise");
require("whatwg-fetch");

// Modules
mods = [];

config.modules.split(',').forEach(function( mod ){
  mods[ mod ] = require('./mod/' + mod + '.js' ).init;
});

// Add reload icon
//tabris.create("Action", {
//  title: "Reload",
//  placementPriority: "high",
//  image: {src: "images/refresh.png", scale: 3}
//}).on("select", function() {
//  tabris.app.reload();
//});

// Include common function
c = require('./common.js').common;


// Run
mods[ config.defaultModule ]();
