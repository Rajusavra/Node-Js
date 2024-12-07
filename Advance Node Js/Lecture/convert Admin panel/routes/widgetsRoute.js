const express = require('express');

const routes = express.Router();

const {widgetsPage}  = require('../controllers/widgetsController');

routes.get('/',widgetsPage);

module.exports = routes;