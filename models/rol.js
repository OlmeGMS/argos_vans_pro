'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RolSchema = Schema({
  name: String,
  status: Boolean
});

module.exports = mongoose.model('Rol', RolSchema);
