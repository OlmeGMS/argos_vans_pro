'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Driver = require('../models/driver');
var User = require('../models/user');

function getDriver(req, res)
{
  var driverId = req.params.id;

  Driver.findById(driverId).populate({
    path: 'user',
    populate: {
      path: 'user',
      model: 'User'
    },
  }).populate({
    path: 'eps',
    populate: {
      path: 'eps',
      model: 'Eps'
    },
  }).populate({
    path: 'arl',
    populate: {
      path: 'arl',
      model: 'Arl'
    },
  }).exec((err, driver) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!driver) {
        res.status(404).send({message: 'El conductor no existe !!'});
      }else {
        res.status(200).send({driver});
      }
    }
  });
}

function getListDriversAdmin(req, res)
{

  var find = Driver.find({}).sort('dirver');
  find.populate({
    path: 'user',
    populate: {
      path: 'user',
      model: 'User'
    },
  }).populate({
    path: 'eps',
    populate: {
      path: 'eps',
      model: 'Eps'
    },
  }).populate({
    path: 'arl',
    populate: {
      path: 'arl',
      model: 'Arl'
    },
  }).exec((err, drivers) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!drivers) {
        res.status(404).send({message: 'No hay conductores !!'});
      }else {
        res.status(200).send({drivers: drivers});
      }
    }
  });
}

function getListDrivers(req, res)
{
  var find = Driver.find({}).sort('driver').where('status').equals(true);
  find.populate({
    path: 'user',
    populate: {
      path: 'user',
      model: 'User'
    },
  }).populate({
    path: 'eps',
    populate: {
      path: 'eps',
      model: 'Eps'
    },
  }).populate({
    path: 'arl',
    populate: {
      path: 'arl',
      model: 'Arl'
    },
  }).exec((err, drivers) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!drivers) {
        res.status(404).send({message: 'No hay conductores !!'});
      }else {
        res.status(200).send({drivers: drivers});
      }
    }
  });
}

function saveDriver(req, res)
{
  var driver = new Driver();
  var params = req.body;
  driver.user = params.user;
  driver.eps = params.eps;
  driver.arl = params.arl;
  driver.status = params.status;


  driver.save((err, driverStored) => {
    if (err) {
      res.status(500).send({message: 'Error al guardar el empleado'});
    }else {
      if (!driverStored) {
        res.status(404).send({message: 'El conductor no ha sido guardado'});
      }else {
        res.status(200).send({driver: driverStored});
      }
    }
  });
}

function updateDriver(req, res)
{
  var driverId = req.params.id;
  var update = req.body;

  Driver.findByIdAndUpdate(driverId, update, (err, driverUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!driverUpdate) {
        res.status(404).send({message: 'El conductor no ha sido actualizdo'});
      }else {
        res.status(200).send({driver: driverUpdate});
      }
    }
  });
}

function updateDriverStatus(req, res)
{
  var driverId = req.params.id;
  var update = req.body;

  Driver.findByIdAndUpdate(driverId, update, (err, driverUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!driverUpdate) {
        res.status(404).send({message: 'El conductor no ha sido actualizdo'});
      }else {
        res.status(200).send({driver: driverUpdate});
      }
    }
  });
}

function deleteDriver(req, res)
{
  var driverId = req.params.id;

  Driver.findByIdAndRemove(driverId, (err, driverRemove) => {
    if (err) {
      res.status(500).send({message: 'Error al eliminar el conductor'});
    }else {
      if (!driverRemove) {
        res.status(404).send({message: 'No se pudo eliminar el conductor'});
      }else {
        res.status(200).send({driverRemove});
      }
    }
  });
}

module.exports = {
  getDriver,
  getListDriversAdmin,
  getListDrivers,
  saveDriver,
  updateDriver,
  deleteDriver,
  updateDriverStatus
}
