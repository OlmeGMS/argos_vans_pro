'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var LocationAdd = require('../models/locationAdd');

function getLocationAdd(req, res)
{
  var locationAddId = req.params.id;

  LocationAdd.findById(locationAddId, (err, locationAdd) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!locationAdd) {
        res.status(404).send({message: 'La trarifa no existe'});
      }else {
        res.status(200).send({locationAdd});
      }
    }
  });
}

function getLocationAdds(req, res)
{
  if (req.params.page) {
    var page = req.params.page;
  }else {
    var page = 1;
  }
  var itemsPerPage = 3;
  LocationAdd.find().sort('locationadd').paginate(page, itemsPerPage, function(err, locationAdds, total){
    if (err) {
      res.status(500).send({message: 'Error en la peticón'});
    }else {
      if (!locationAdds) {
        res.status(404).send({message: 'No hay ciudades creadas !!'});
      }else {
        res.status(200).send({locationAdds: locationAdds});
      }
    }
  });
}

function getListLocationAdd(req, res)
{
  LocationAdd.find({}, function(err, locationAdds){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!locationAdds) {
        res.status(404).send({message: 'No hay ciudades creadas !!'});
      }else {
        res.status(200).send({locationAdds: locationAdds});
      }

    }
  });
}

function saveLocationAdd(req, res)
{
  var locationAdd = new LocationAdd();
  var params = req.body;
  locationAdd.price = params.price;

  locationAdd.save((err, locationAdd) => {
    if (err){
      res.status(500).send({message: 'Error no se pudo guardar la ciudad'});
    }else {
      if (!locationAdd) {
        res.status(404).send({message: 'La ciudad no ha sido guardada'});
      }else {
        res.status(200).send({locationAdd: locationAdd});
      }
    }
  });
}

function updateLocationAdd(req, res)
{
  var locationAddId = req.params.id;
  var update = req.body;

  LocationAdd.findByIdAndUpdate(locationAddId, update, (err, locationAddUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error al actualizar la ciudad'});
    }else {
      if (!locationAddUpdate) {
        res.status(404).send({message: 'La ciudad no ha sido actualizada'});
      }else {
        res.status(200).send({locationAdd: locationAddUpdate});
      }
    }
  });
}

function deleteLocationAdd(req, res)
{
  var locationAddId = req.params.id;

  LocationAdd.findByIdAndRemove(locationAddId, (err, locationAddRemove) => {
    if (err) {
      res.status(500).send({message: 'Error al eliminar la ciudad'});
    }else {
      if (!locationAddRemove) {
        res.status(404).send({message: 'La ciudad no pudo ser eliminada'});
      }else {
        res.status(200).send({locationAddRemove});
      }
    }
  });
}


module.exports = {
  getLocationAdd,
  getLocationAdds,
  getListLocationAdd,
  saveLocationAdd,
  updateLocationAdd,
  deleteLocationAdd
}
