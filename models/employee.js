'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeeSchema = Schema({
  code: String,
  address: String,
  id_user: { type: Schema.ObjectId, ref: 'User'},
  id_cost_center: { type: Schema.ObjectId, ref: 'CostCenter'},
  id_localidad: { type: Schema.ObjectId, ref: 'Location'},
  status: Boolean

});

module.exports = mongoose.model('Employee', EmployeeSchema);
