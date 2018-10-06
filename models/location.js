'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = Schema({
  name: String,
  id_city: { type: Schema.ObjectId, ref: 'City'}
});

module.exports = mongoose.model('Location', LocationSchema);
