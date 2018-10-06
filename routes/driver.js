'use strict'

var express = require('express');
var DriverController = require('../controllers/driver');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/driver/:id', md_auth.ensureAuth, DriverController.getDriver);
api.get('/driver-list-admin/', md_auth.ensureAuth, DriverController.getListDriversAdmin);
api.get('/driver-list/', md_auth.ensureAuth, DriverController.getListDrivers);
api.post('/driver/', md_auth.ensureAuth, DriverController.saveDriver);
api.put('/driver/:id', md_auth.ensureAuth, DriverController.updateDriver);
api.put('/driver-status/:id', md_auth.ensureAuth, DriverController.updateDriverStatus);
api.delete('/driver/:id', md_auth.ensureAuth, DriverController.deleteDriver);

module.exports = api;
