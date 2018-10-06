'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Eps = require('../models/eps');

function getEps(req, res)
{
  var epsId = req.params.id;

  Eps.findById(epsId, (err, eps) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!eps) {
        res.status(404).send({message: 'La eps no existe'});
      }else {
        res.status(200).send({eps});
      }
    }
  });
}

function getListEps(req, res)
{
  Eps.find({}, function(err, eps){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!eps) {
        res.status(404).send({message: ' No hay eps creadas !!'});
      }else {
        res.status(200).send({eps: eps});
      }
    }
  });
}

function saveEps(req, res)
{
  var eps = new Eps();
  var params = req.body;
  eps.name = params.name;

  eps.save((err, epsStored) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!epsStored) {
        res.status(404).send({message: ' La eps no pudo ser creada'});
      }else {
        res.status(200).send({eps: epsStored});
      }
    }
  });
}

function updateEps(req, res)
{
  var epsId = req.params.id;
  var update = req.body;

  Eps.findByIdAndUpdate(epsId, update, (err, epsUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!epsUpdate) {
        res.status(404).send({message: 'La eps no pudo ser actualizada'});
      }else {
        res.status(200).send({eps: epsUpdate});
      }
    }
  });
}

function deleteEps(req, res)
{
  var epsId = req.params.id;

  Eps.findByIdAndRemove(epsId, (err, epsRemove) => {
    if (err) {
      res.status(500).send({message: 'Error al eliminar la eps'});
    }else {
      if (!epsRemove) {
        res.status(404).send({message: 'No se pudo eliminar la eps'});
      }else {
        res.status(200).send({epsRemove});
      }
    }
  });
}

module.exports = {
  getEps,
  getListEps,
  saveEps,
  updateEps,
  deleteEps
}
