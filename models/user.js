'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  surname: String,
  dni: String,
  email: String,
  password: String,
  phone: String,
  image: String,
  rol: { type: Schema.ObjectId, ref: 'Rol'},
  estatus: Boolean
});

module.exports = mongoose.model('User', UserSchema);
