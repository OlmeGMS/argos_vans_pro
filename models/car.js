'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CasSchema = Schema({
  placa: String,
  capacity: String,
  address: String,
  status: Boolean
});

module.exports = mongoose.model('Car', CasSchema);
