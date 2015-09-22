var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/country_app");

module.exports.User = require("./user");
module.exports.Country = require("./country");