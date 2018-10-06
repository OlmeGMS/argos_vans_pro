'use strict'

var express = require('express');
var CityController = require('../controllers/city');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/city/:id', md_auth.ensureAuth, CityController.getCity);
api.get('/cities/:page?', md_auth.ensureAuth, CityController.getCities);
api.get('/cities-list/', md_auth.ensureAuth, CityController.getListCities);
api.post('/city/', md_auth.ensureAuth, CityController.saveCity);
api.put('/city/:id', md_auth.ensureAuth, CityController.updateCity);
api.delete('/city/:id', md_auth.ensureAuth, CityController.deleteCity);



module.exports = api;
