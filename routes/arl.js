'use strict'

var express = require('express');
var ArlController = require('../controllers/arl');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/arl/:id', md_auth.ensureAuth, ArlController.getArl);
api.get('/arl-list/', md_auth.ensureAuth, ArlController.getListArl);
api.post('/arl/', md_auth.ensureAuth, ArlController.saveArl);
api.put('/arl/:id', md_auth.ensureAuth, ArlController.updateArl);
api.delete('/arl/:id', md_auth.ensureAuth, ArlController.deleteArl);



module.exports = api;
