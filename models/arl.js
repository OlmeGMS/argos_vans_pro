'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArlSchema = Schema({
  name: String

});

module.exports = mongoose.model('Arl', ArlSchema);
