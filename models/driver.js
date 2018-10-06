'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverSchema = Schema({
  user: { type: Schema.ObjectId, ref: 'User'},
  eps: { type: Schema.ObjectId, ref: 'Eps'},
  arl: { type: Schema.ObjectId, ref: 'Arl'},
  status: Boolean
});

module.exports = mongoose.model('Driver', DriverSchema);
