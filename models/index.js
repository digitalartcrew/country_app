var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/country_app");


module.exports.Country = require("./country");