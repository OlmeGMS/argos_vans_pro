'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var CostCenter = require('../models/costCenter');

function getCostCenter(req, res)
{
  var costCenterId = req.params.id;

  CostCenter.findById(costCenterId, (err, costCenter) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!costCenter) {
        res.status(404).send({message: 'El centro de costo no exite'});
      }else {
        res.status(200).send({costCenter});
      }
    }
  });
}

function getCostCenters(req, res)
{
  if (req.params.page) {
    var page = req.params.page;
  }else {
    var page = 1;
  }

  var itemsPerPage = 3;
  CostCenter.find().sort('costCenter').paginate(page, itemsPerPage, function(err, costCenter, total){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!costCenter) {
        res.status(404).send({message: 'No hay centros de costos creados'});
      }else {
        res.status(200).send({costCenters: costCenters});
      }
    }
  });
}

function getLisCostCenters(req, res)
{
  CostCenter.find({}, function(err, costCenter){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!costCenter) {
        res.status(404).send({message: 'No hay centros de costos !!'});
      }else {
        res.status(200).send({costCenter: costCenter});
      }
    }
  });
}

function saveCostCenter(req, res)
{
  var costCenter = new CostCenter();
  var params = req.body;
  costCenter.name = params.name;
  costCenter.address = params.address;
  costCenter.ceco = params.ceco;

  costCenter.save((err, costCenterStored) =>{
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!costCenterStored) {
        res.status(404).send({message: 'El centro de costos no ha sido guardado'});
      }else {
        res.status(200).send({costCenter: costCenterStored});
      }
    }
  });
}

function updateCostCenter(req, res)
{
  var costCenterId = req.params.id;
  var update = req.body;

  CostCenter.findByIdAndUpdate(costCenterId, update, (err, costCenterUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error al actualizar el centro de costo'});
    }else {
      if (!costCenterUpdate) {
        res.status(404).send({message: 'El centro de costo no ha sido actualizado'});
      }else {
        res.status(200).send({costCenter: costCenterUpdate});
      }
    }
  });
}

function deleteCostCenter(req, res)
{
  var costCenterId = req.params.id;
  CostCenter.findByIdAndRemove(costCenterId, (err, costCenterRemove) => {
    if (err) {
      res.status(500).send({message: 'Error al eliminar el centro de costo'});
    }else {
      if (!costCenterRemove) {
        res.status(404).send({message: 'No se puedo eliminar el centro de costo'});
      }else {
        res.status(200).send(costCenterRemove);
      }
    }
  });
}

module.exports = {
  getCostCenter,
  getCostCenters,
  getLisCostCenters,
  saveCostCenter,
  updateCostCenter,
  deleteCostCenter
}
