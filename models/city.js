'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CitySchema = Schema({
  name: String

});

module.exports = mongoose.model('City', CitySchema);
