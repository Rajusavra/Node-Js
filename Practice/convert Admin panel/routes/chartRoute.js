const express = require('express');

const routes = express.Router();

const {chartPage}  = require('../controllers/chartController');

routes.get('/',chartPage);

module.exports = routes;