'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var City = require('../models/city');
var Localidad = require('../models/location');

function getLocation(req, res)
{
  var locationId = req.params.id;

  Localidad.findById(locationId, (err, location) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!location) {
        res.status(404).send({message: 'La localidad no exite'});
      }else {
        res.status(200).send({location});
      }
    }
  });
}

function getLocations(req, res)
{
  if (req.params.page) {
    var page = req.params.page;
  }else {
    var page = 1;
  }

  var itemsPerPage = 3;

  Localidad.find().sort('location').paginate(page, itemsPerPage, function(err, locations, tola){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if(!locations){
        res.status(404).send({message: 'No hay localidads !!'});
      }else{
        res.status(200).send({locations: locations});
      }
    }
  });
}

function getListLocations(req, res)
{
  var find = Localidad.find({}).sort('location');

  find.populate({path: 'id_city'}).exec((err, locations) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!locations) {
        res.status(404).send({message: 'No hay localidades !!'});
      }else {
        res.status(200).send({locations: locations});
      }
    }
  });
}

function searchLocation(req, res)
{
  var id_city = req.params.city;

  var find = Localidad.find({id_city: id_city}).sort('location').where('id_city').equals(id_city);
  find.populate({path: 'location'}).exec((err, locations) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!locations) {
        res.status(404).send({message: 'No hay localidades'});
        console.log('no encontro');
      }else {
        res.status(200).send({locations});
      }
    }
  });
}

function saveLocation(req, res)
{
  var location = new Localidad();
  var params = req.body;
  location.name = params.name;
  location.id_city = params.id_city;

  location.save((err, locationStored) => {
    if (err) {
      res.status(500).send({message: 'Error no se puede guardar la localidad'});
    }else {
      if (!locationStored) {
        res.status(404).send({message: 'El tema no se ha guardado'});
      }else {
        res.status(200).send({location: locationStored});
      }
    }
  });
}

function updateLocation(req, res)
{
  var locationId = req.params.id;
  var update = req.body;

  Localidad.findByIdAndUpdate(locationId, update, (err, locationUpdate) => {
    if(err){
      res.status(500).send({message: 'Error al actualizar la localidad'});
    }else {
      if (!locationUpdate) {
        res.status(404).send({message: 'La localidad no ha sido actualizada'});
      }else {
        res.status(200).send({location: locationUpdate});
      }
    }
  });
}

function deleteLocation(req, res)
{
  var locationId = req.params.id;
  Localidad.findByIdAndRemove(locationId, (err, locationRemove) => {
    if (err) {
      res.status(500).send({message: 'Error al eliminar la localidad'});
    }else {
      if (!locationRemove) {
        res.status(404).send({message: 'No se pudo eliminar la localidad'});
      }else {
        res.status(200).send({locationRemove});
      }
    }
  });
}


module.exports = {
  getLocation,
  getLocations,
  getListLocations,
  searchLocation,
  saveLocation,
  updateLocation,
  deleteLocation
}
