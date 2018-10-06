'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Template = require('../models/template');
var Route = require('../models/route');
var Employee = require('../models/employee');
var CostCenter = require('../models/costCenter');


function getTemplate(req, res)
{
  var templateId = req.params.id;

  Template.findById(templateId).populate({
    path: 'costCenter',
    populate: {
      path: 'costCenter',
      model: 'CostCenter'
    },
  }).exec((err, template) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!template) {
        res.status(404).send({message: 'La planilla no exite !!'});
      }else {
        res.status(200).send({template});
      }
    }
  });
}

function getListTemplate(req, res)
{
  Template.find({}, function(err, templates) {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!templates) {
        res.status(404).send({message: 'No planillas'});
      }else {
        res.status(200).send({templates: templates});
      }
    }
  });
}


function saveTemplate(req, res)
{
  var template = new Template();
  var params = req.body;
  template.title = params.title;
  template.employee = params.employee;
  template.date_start = params.date_start;
  template.date_end = params.date_end;
  template.address_start = params.address_start;
  template.location_start = params.location_start;
  template.address_end = params.address_end;
  template.location_end = params.location_end;
  template.ceco = params.ceco;
  template.cost_center = params.cost_center;
  template.canLocalidades = params.canLocalidades;

  template.save((err, templateStored) => {
    if (err) {
      //res.status(500).send({message: 'Error en la petición'});
      res.status(500).send({err});
    }else {
      if (!templateStored) {
        res.status(404).send({message: 'No se pudo guardar la planilla'});
      }else {
        res.status(200).send({template: templateStored});
      }
    }
  });
}

function updateTemplate(req, res)
{
  var templateId = req.params.id;
  var update = req.body;

  Template.findByIdAndUpdate(templateId, update, (err, templateUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!templateUpdate) {
        res.status(404).send({message: 'No se pudo actualizar la planilla'});
      }else {
        res.status(200).send({template: templateUpdate});
      }
    }
  });
}

function deleteTemplate(req, res)
{
  var templateId = req.params.id;

  Template.findByIdAndRemove(templateId, (err, templateRemoved) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!templateRemoved) {
        res.status(404).send({message: 'No se pudo eliminar la planilla'});
      }else{
        res.status(200).send({template: templateRemoved});
      }
    }
  });
}

module.exports = {
  getTemplate,
  getListTemplate,
  saveTemplate,
  updateTemplate,
  deleteTemplate
}
