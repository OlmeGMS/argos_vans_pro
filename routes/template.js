'use strict'

var express = require('express');
var TemplateController = require('../controllers/template');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/template/:id', md_auth.ensureAuth, TemplateController.getTemplate);
api.get('/template-list', md_auth.ensureAuth, TemplateController.getListTemplate);
api.post('/template', md_auth.ensureAuth, TemplateController.saveTemplate);
api.put('/template/:id', md_auth.ensureAuth, TemplateController.updateTemplate);
api.delete('/template/:id', md_auth.ensureAuth, TemplateController.deleteTemplate);

module.exports = api;
