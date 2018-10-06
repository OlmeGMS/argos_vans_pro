'use strict'

var express = require('express');
var LocationController = require('../controllers/location');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/location/:id', md_auth.ensureAuth, LocationController.getLocation);
api.get('/locations/:page?', md_auth.ensureAuth, LocationController.getLocations);
api.get('/locations-list', md_auth.ensureAuth, LocationController.getListLocations);
api.get('/location-search/:city', md_auth.ensureAuth, LocationController.searchLocation);
api.post('/location/', md_auth.ensureAuth, LocationController.saveLocation);
api.put('/location/:id', md_auth.ensureAuth, LocationController.updateLocation);
api.delete('/location/:id', md_auth.ensureAuth, LocationController.deleteLocation);

module.exports = api;
