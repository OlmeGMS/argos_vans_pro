'use strict'

var express = require('express');
var DriverCarController = require('../controllers/dirverCar');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/driver-car/:id', md_auth.ensureAuth, DriverCarController.getDriverCar);
api.get('/driver-car/:page?', md_auth.ensureAuth, DriverCarController.getDriverCars);
api.get('/driver-car-list-admin', md_auth.ensureAuth, DriverCarController.getListDriverCarsAdmin);
api.get('/driver-car-list', md_auth.ensureAuth, DriverCarController.getListDriverCars);
api.post('/driver-car', md_auth.ensureAuth, DriverCarController.saveDriverCar);
api.put('/driver-car/:id', md_auth.ensureAuth, DriverCarController.updateDriverCar);
api.put('/driver-car-status/:id', md_auth.ensureAuth, DriverCarController.updateDriverCarStatus);
api.delete('/driver-car/:id', md_auth.ensureAuth, DriverCarController.deleteDriverCar);

module.exports = api;
