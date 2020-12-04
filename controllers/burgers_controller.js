var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../model/burger.js");

// Export routes for server.js to use.
module.exports = router;