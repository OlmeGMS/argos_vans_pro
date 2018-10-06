'use strict'

var express = require('express');
var LocationAddController = require('../controllers/locationAdd');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/location-add/:id', md_auth.ensureAuth, LocationAddController.getLocationAdd);
api.get('/location-adds/:page?', md_auth.ensureAuth, LocationAddController.getLocationAdds);
api.get('/location-add-list/', md_auth.ensureAuth, LocationAddController.getListLocationAdd);
api.post('/location-add/', md_auth.ensureAuth, LocationAddController.saveLocationAdd);
api.put('/location-add/:id', md_auth.ensureAuth, LocationAddController.updateLocationAdd);
api.delete('/location-add/:id', md_auth.ensureAuth, LocationAddController.deleteLocationAdd);



module.exports = api;
