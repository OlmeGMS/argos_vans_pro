'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CostCenterSchema = Schema({
  name: String,
  address: String,
  ceco: String

});

module.exports = mongoose.model('CostCenter', CostCenterSchema);
