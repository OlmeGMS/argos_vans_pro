'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var Car = require('../models/car');
var Driver = require('../models/driver');
var DriverCar = require('../models/driver_car');

function getDriverCar(req, res)
{
  var driverCarId = req.params.id;
  DriverCar.findById(driverCarId).populate({
    path: 'driver',
    populate: {
      path: 'driver',
      model: 'Driver'
    },
  }).populate({
    path: 'car',
    populate: {
      path: 'car',
      model: 'Car'
    },
  }).exec((err, driverCar) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!driverCar) {
        res.status(404).send({message: 'El driverCar no exite'});
      }else {
        res.status(200).send({driverCar});
      }
    }
  });

}

function getDriverCars(req, res)
{
  if (req.params.page) {
    var page = req.params.page;
  }else {
    var page = 1;
  }

  var itemsPerPage = 3;

  DriverCar.find().sort('driverCar').paginate(page, itemsPerPage, function(err, driverCars, total){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if (!driverCar) {
        res.status(404).send({message: 'No hay relaciones driver_cars creados !!'});
      }else {
        res.status(200).send({driverCars: driverCars});
      }
    }
  });
}

function getListDriverCarsAdmin(req, res)
{
  var find = DriverCar.find({}).sort('dirverCar');
  find.populate({
    path: 'driver',
    populate: {
      path: 'driver',
      model: 'Driver'
    },
    populate: {
      path: 'user',
      model: 'User'
    },
  }).populate({
    path: 'car',
    populate: {
      path: 'car',
      model: 'Car'
    },
  }).exec((err, driverCars) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!driverCars) {
        res.status(404).send({message: 'No hay realciones driver_cars creados !!'});
      }else {
        res.status(200).send({driverCars: driverCars});
      }
    }
  });
}

function getListDriverCars(req, res)
{
  var find = DriverCar.find({}).sort('driverCar').where('status').equals(true);
  find.populate({
    path: 'driver',
    populate: {
      path: 'driver',
      model: 'Driver'
    },
    populate: {
      path: 'user',
      model: 'User'
    },
  }).populate({
    path: 'car',
    populate: {
      path: 'car',
      model: 'Car'
    },
  }).exec((err, driverCars) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!driverCars) {
        res.status(404).send({message: 'No hay realciones driver_cars creados !!'});
      }else {
        res.status(200).send({driverCars: driverCars});
      }
    }
  });

}

function saveDriverCar(req, res)
{
  var driverCar = new DriverCar();
  var params = req.body;

  driverCar.driver = params.driver;
  driverCar.car = params.car;
  driverCar.status = params.status;

  driverCar.save((err, driverCarStored) => {
    if (err) {
      res.status(500).send({message: 'Error al guardar la realción'});
    }else {
      if (!driverCarStored) {
        res.status(404).send({message: 'La relación no pudo ser guardada'});
      }else {
        res.status(200).send({driverCar: driverCarStored});
      }
    }
  });
}

function updateDriverCar(req, res)
{
  var driverCarId = new DriverCar();
  var update = req.body;

  DriverCar.findByIdAndUpdate(driverCarId, update, (err, driverUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!driverUpdate) {
        res.status(404).send({message: 'La realción no ha sido actualizada'});
      }else {
        res.status(200).send({driverCar: driverUpdate});
      }
    }
  });
}

function updateDriverCarStatus(req, res)
{
  var driverCarId = req.params.id;
  var update = req.body;

  DriverCar.findByIdAndUpdate(driverCarId, update, (err, driverCarUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!driverCarUpdate) {
        res.status(404).send({message: 'El prestador no ha sido actualizdo'});
      }else {
        res.status(200).send({driverCar: driverCarUpdate});
      }
    }
  });
}

function deleteDriverCar(req, res)
{
  var driverCarId = req.params.id;

  DriverCar.findByIdAndRemove(driverCarId, (err, driverCarRemove) => {
      if (err) {
        res.status(500).send({message: 'Error en la petición'});
      }else {
        if (!driverCarRemove) {
          res.status(404).send({message: 'La relación no ha sido eliminada'});
        }else {
          res.status(200).send({driverCarRemove});
        }
      }
  });
}

module.exports = {
  getDriverCar,
  getListDriverCarsAdmin,
  getDriverCars,
  getListDriverCars,
  saveDriverCar,
  updateDriverCar,
  updateDriverCarStatus,
  deleteDriverCar
}
