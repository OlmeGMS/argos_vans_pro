'use strict'

var express = require('express');
var EpsController = require('../controllers/eps');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/eps/:id', md_auth.ensureAuth, EpsController.getEps);
api.get('/eps-list/', md_auth.ensureAuth, EpsController.getListEps);
api.post('/eps/', md_auth.ensureAuth, EpsController.saveEps);
api.put('/eps/:id', md_auth.ensureAuth, EpsController.updateEps);
api.delete('/eps/:id', md_auth.ensureAuth, EpsController.deleteEps);



module.exports = api;
