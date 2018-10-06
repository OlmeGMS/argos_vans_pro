'use strict'

var express = require('express');
var RateController = require('../controllers/rate');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/rate/:id', md_auth.ensureAuth, RateController.getRate);
api.get('/rates/:page?', md_auth.ensureAuth, RateController.getRates);
api.get('/rates-list', md_auth.ensureAuth, RateController.getListRates);
api.post('/rate-search', md_auth.ensureAuth, RateController.searchRate);
api.post('/rate/', md_auth.ensureAuth, RateController.saveRate);
api.put('/rate/:id', md_auth.ensureAuth, RateController.updateRate);
api.delete('/rate/:id', md_auth.ensureAuth, RateController.deleteRate);

module.exports = api;
