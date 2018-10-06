'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var City = require('../models/city');

function getCity(req, res)
{
  var cityId = req.params.id;

  City.findById(cityId, (err, city) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!city) {
        res.status(404).send({message: 'La ciudad no existe'});
      }else {
        res.status(200).send({city});
      }
    }
  });
}

function getCities(req, res)
{
  if (req.params.page) {
    var page = req.params.page;
  }else {
    var page = 1;
  }
  var itemsPerPage = 3;
  City.find().sort('city').paginate(page, itemsPerPage, function(err, cities, total){
    if (err) {
      res.status(500).send({message: 'Error en la peticón'});
    }else {
      if (!cities) {
        res.status(404).send({message: 'No hay ciudades creadas !!'});
      }else {
        res.status(200).send({cities: cities});
      }
    }
  });
}

function getListCities(req, res)
{
  City.find({}, function(err, cities){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!cities) {
        res.status(404).send({message: 'No hay ciudades creadas !!'});
      }else {
        res.status(200).send({cities: cities});
      }

    }
  });
}

function saveCity(req, res)
{
  var city = new City();
  var params = req.body;
  city.name = params.name;

  city.save((err, cityStored) => {
    if (err){
      res.status(500).send({message: 'Error no se pudo guardar la ciudad'});
    }else {
      if (!cityStored) {
        res.status(404).send({message: 'La ciudad no ha sido guardada'});
      }else {
        res.status(200).send({city: cityStored});
      }
    }
  });
}

function updateCity(req, res)
{
  var cityId = req.params.id;
  var update = req.body;

  City.findByIdAndUpdate(cityId, update, (err, cityUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error al actualizar la ciudad'});
    }else {
      if (!cityUpdate) {
        res.status(404).send({message: 'La ciudad no ha sido actualizada'});
      }else {
        res.status(200).send({city: cityUpdate});
      }
    }
  });
}

function deleteCity(req, res)
{
  var cityId = req.params.id;

  City.findByIdAndRemove(cityId, (err, cityRemove) => {
    if (err) {
      res.status(500).send({message: 'Error al eliminar la ciudad'});
    }else {
      if (!cityRemove) {
        res.status(404).send({message: 'La ciudad no pudo ser eliminada'});
      }else {
        res.status(200).send({cityRemove});
      }
    }
  });
}


module.exports = {
  getCity,
  getCities,
  getListCities,
  saveCity,
  updateCity,
  deleteCity
}
