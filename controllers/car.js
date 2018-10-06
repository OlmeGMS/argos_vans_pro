'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Car = require('../models/car');

function getCar(req, res)
{
  var carId = req.params.id;

  Car.findById(carId, (err, car) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!car) {
        res.status(404).send({message: 'El vehículo no existe'});
      }else {
        res.status(200).send({car});
      }
    }
  });
}

function getCars(req, res)
{
  if (req.params.page) {
    var page = req.params.page;
  }else {
    var page = 1;
  }

  var itemsPerPage = 3;

  Car.find().sort('car').paginate(page, itemsPerPage, function(err, cars, total){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!cars) {
        res.status(404).send({message: ' No hay vehículos creados'});
      }else {
        res.status(200).send({cars: cars});
      }
    }
  });
}

function getListCars(req, res)
{
    Car.find({}, function(err, cars){
      if (err) {
        res.status(500).send({message: 'Error en la petición'});
      }else{
        if(!cars){
          res.status(404).send({message: 'No hay vehículos creados'});
        }else {
          res.status(200).send({cars: cars});
        }

      }

    });
}

function searchCar(req, res)
{
  var placa = req.params.placa;

  var find = Car.find({placa: placa}).sort('car').where('placa').equals(placa);
  find.populate({path: 'car'}).exec((err, cars) => {

    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!cars) {
        res.status(404).send({message: 'No hay vehículos'});
        console.log('no encontro');
      }else{
        res.status(200).send({cars});
      }
    }
  });
}

function saveCar(req, res)
{
  var car = new Car();
  var params = req.body;
  car.placa = params.placa.toUpperCase();
  car.capacity = params.capacity;
  car.address = params.address;
  car.status = params.status;

  car.save((err, carStored) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!carStored) {
        res.status(404).send({message: 'El vahículo no fue guardado'});
      }else {
        res.status(200).send({car: carStored});
      }
    }
  });


}

function updateCar(req, res)
{
  var carId = req.params.id;
  var update = req.body;

  Car.findByIdAndUpdate(carId, update, (err, carUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error al actualizar el vehículo'});
    }else {
      if (!carUpdate) {
        res.status(404).send({message: ''})
      }else {
        res.status(200).send({car: carUpdate});
      }
    }
  });
}

function deleteCar(req, res)
{
  var carId = req.params.id;

  Car.findByIdAndRemove(carId, (err, carRemove) => {
    if(err){
      res.status(500).send({message: 'Error al eliminar el vehículo'});
    }else {
      if (!carRemove) {
        res.status(404).send({message: 'El vehículo no pudo ser actualizado'});
      }else {
        res.status(200).send({carRemove});
      }
    }
  });
}



module.exports = {
  getCar,
  getCars,
  getListCars,
  searchCar,
  saveCar,
  updateCar,
  deleteCar
}
