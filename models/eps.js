'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EpsSchema = Schema({
  name: String
});

module.exports = mongoose.model('Eps', EpsSchema);
