'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RateSchema = Schema({
  origen: { type: Schema.ObjectId, ref: 'Location'},
  destino: { type: Schema.ObjectId, ref: 'Location'},
  precio: Number,
});

module.exports = mongoose.model('Rate', RateSchema);
