'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Arl = require('../models/arl');

function getArl(req, res)
{
  var arlId = req.params.id;

  Arl.findById(arlId, (err, arl) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!arl) {
        res.status(404).send({message: 'La arl no existe'});
      }else {
        res.status(200).send({arl});
      }
    }
  });
}

function getListArl(req, res)
{
  Arl.find({}, function(err, arl){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!arl) {
        res.status(404).send({message: ' No hay arl creadas !!'});
      }else {
        res.status(200).send({arl: arl});
      }
    }
  });
}

function saveArl(req, res)
{
  var arl = new Arl();
  var params = req.body;
  arl.name = params.name;

  arl.save((err, arlStored) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!arlStored) {
        res.status(404).send({message: ' La arl no pudo ser creada'});
      }else {
        res.status(200).send({arl: arlStored});
      }
    }
  });
}

function updateArl(req, res)
{
  var arlId = req.params.id;
  var update = req.body;

  Arl.findByIdAndUpdate(arlId, update, (err, arlUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!arlUpdate) {
        res.status(404).send({message: 'La arl no pudo ser actualizada'});
      }else {
        res.status(200).send({arl: arlUpdate});
      }
    }
  });
}

function deleteArl(req, res)
{
  var arlId = req.params.id;

  Arl.findByIdAndRemove(arlId, (err, arlRemove) => {
    if (err) {
      res.status(500).send({message: 'Error al eliminar la arl'});
    }else {
      if (!arlRemove) {
        res.status(404).send({message: 'No se pudo eliminar la arl'});
      }else {
        res.status(200).send({arlRemove});
      }
    }
  });
}

module.exports = {
  getArl,
  getListArl,
  saveArl,
  updateArl,
  deleteArl
}
