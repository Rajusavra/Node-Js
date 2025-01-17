const express = require('express');

const routes = express.Router();

const {materialPage}  = require('../controllers/materialController');

routes.get('/',materialPage);

module.exports = routes;