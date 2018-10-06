'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Employee = require('../models/employee');
var User = require('../models/user');
var CostCenter = require('../models/costCenter');
var Localidad = require('../models/location');

function getEmployee(req, res)
{
  var employeeId = req.params.id;

  Employee.findById(employeeId).populate({
    path: 'id_user',
    populate: {
      path: 'user',
      model: 'User'
    },
  }).populate({
    path: 'id_cost_center',
    populate: {
      path: 'id_cost_center',
      model: 'CostCenter'
    },
  }).populate({
    path: 'id_localidad',
    populate: {
      path: 'id_localidad',
      model: 'Location'
    },
  }).exec((err, employee) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!employee) {
        res.status(404).send({message: 'El empleado no existe !!'});
      }else {
        res.status(200).send({employee});
      }
    }
  });
}

function getEmployees(req, res)
{
  if (req.params.page) {
    var page = req.params.page;
  }else {
    var page = 1;
  }

  var itemsPerPage = 3;

  Employee.find().sort('employee').paginate(page, itemsPerPage, function(err, employees, total){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!employees) {
        res.status(404).send({message: 'No hay empleados creados !!'});
      }else {
        res.status(200).send({employees: employees});
      }
    }
  });
}

function getListEmployeesAdmin(req, res)
{

  var find = Employee.find({}).sort('employee');
  find.populate({
    path: 'id_user',
    populate: {
      path: 'user',
      model: 'User'
    },
  }).populate({
    path: 'id_cost_center',
    populate: {
      path: 'id_cost_center',
      model: 'CostCenter'
    },
  }).populate({
    path: 'id_localidad',
    populate: {
      path: 'id_localidad',
      model: 'Location'
    },
  }).exec((err, employees) => {
  //Employee.find({}, function(err, employees){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!employees) {
        res.status(404).send({message: 'No hay empleados !!'});
      }else {
        res.status(200).send({employees: employees});
      }
    }
  });
}

function getListEmployees(req, res)
{
  var find = Employee.find({}).sort('employee').where('status').equals(true);
  find.populate({
    path: 'id_user',
    populate: {
      path: 'user',
      model: 'User'
    },
  }).populate({
    path: 'id_cost_center',
    populate: {
      path: 'id_cost_center',
      model: 'CostCenter'
    },
  }).populate({
    path: 'id_localidad',
    populate: {
      path: 'id_localidad',
      model: 'Location'
    },
  }).exec((err, employees) => {
  //Employee.find({}, function(err, employees){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!employees) {
        res.status(404).send({message: 'No hay empleados !!'});
      }else {
        res.status(200).send({employees: employees});
      }
    }
  });
}

function saveEmployee(req, res)
{
  var employee = new Employee();
  var params = req.body;
  employee.code = params.code;
  employee.address = params.address;
  employee.id_user = params.id_user;
  employee.id_cost_center = params.id_cost_center;
  employee.id_localidad = params.id_localidad;
  employee.status = params.status;

  employee.save((err, employeeStored) => {
    if (err) {
      res.status(500).send({message: 'Error al guardar el empleado'});
    }else {
      if (!employeeStored) {
        res.status(404).send({message: 'El empleado no ha sido guardado'});
      }else {
        res.status(200).send({employee: employeeStored});
      }
    }
  });
}

function updateEmployee(req, res)
{
  var employeeId = req.params.id;
  var update = req.body;

  Employee.findByIdAndUpdate(employeeId, update, (err, employeeUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!employeeUpdate) {
        res.status(404).send({message: 'El empleado no ha sido actualizdo'});
      }else {
        res.status(200).send({employee: employeeUpdate});
      }
    }
  });
}

function updateEmployeeStatus(req, res)
{
  var employeeId = req.params.id;
  var update = req.body;

  Employee.findByIdAndUpdate(employeeId, update, (err, employeeUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!employeeUpdate) {
        res.status(404).send({message: 'El empleado no ha sido actualizdo'});
      }else {
        res.status(200).send({employee: employeeUpdate});
      }
    }
  });
}

function deleteEmployee(req, res)
{
  var employeeId = req.params.id;

  Employee.findByIdAndRemove(employeeId, (err, employeeRemove) => {
    if (err) {
      res.status(500).send({message: 'Error al eliminar el empleado'});
    }else {
      if (!employeeRemove) {
        res.status(404).send({message: 'No se pudo eliminar el empleado'});
      }else {
        res.status(200).send({employeeRemove});
      }
    }
  });
}



module.exports = {
  getEmployee,
  getEmployees,
  getListEmployeesAdmin,
  getListEmployees,
  saveEmployee,
  updateEmployee,
  deleteEmployee,
  updateEmployeeStatus
}
