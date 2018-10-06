'use strict'

var express = require('express');
var CostCenterController = require('../controllers/costCenter');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/cost-center/:id', md_auth.ensureAuth, CostCenterController.getCostCenter);
api.get('/cost-center/:page?', md_auth.ensureAuth, CostCenterController.getCostCenters);
api.get('/cost-center-list', md_auth.ensureAuth, CostCenterController.getLisCostCenters);
api.post('/cost-center/', md_auth.ensureAuth, CostCenterController.saveCostCenter);
api.put('/cost-center/', md_auth.ensureAuth, CostCenterController.updateCostCenter);
api.delete('/cost-center/:id', md_auth.ensureAuth, CostCenterController.deleteCostCenter);

module.exports = api
