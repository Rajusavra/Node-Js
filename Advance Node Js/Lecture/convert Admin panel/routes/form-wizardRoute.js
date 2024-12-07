const express = require('express');

const routes = express.Router();

const {wizardPage}  = require('../controllers/form-wizardController');

routes.get('/',wizardPage);

module.exports = routes;