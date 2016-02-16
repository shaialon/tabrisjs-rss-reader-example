// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

// Inject the config into the global scope?
config = require('./config.js').config;

// Web Services
loading = false;
Promise = require("promise");
require("whatwg-fetch");

// Include common function
c = require('./common.js').common;

// Run
require('./pages/'+config.defaultPage).open();
