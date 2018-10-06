'use strict'

var express = require('express');
var EmployeeController = require('../controllers/employee');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/employee/:id', md_auth.ensureAuth, EmployeeController.getEmployee);
api.get('/employee/:page?', md_auth.ensureAuth, EmployeeController.getEmployees);
api.get('/employee-list-admin/', md_auth.ensureAuth, EmployeeController.getListEmployeesAdmin);
api.get('/employee-list/', md_auth.ensureAuth, EmployeeController.getListEmployees);
api.post('/employee/', md_auth.ensureAuth, EmployeeController.saveEmployee);
api.put('/employee/:id', md_auth.ensureAuth, EmployeeController.updateEmployee);
api.put('/employee-status/:id', md_auth.ensureAuth, EmployeeController.updateEmployeeStatus);
api.delete('/employee/:id', md_auth.ensureAuth, EmployeeController.deleteEmployee);

module.exports = api;
