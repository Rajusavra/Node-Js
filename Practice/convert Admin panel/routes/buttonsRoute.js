const express = require('express');

const routes = express.Router();

const {buttonsPage}  = require('../controllers/buttonsController');

routes.get('/',buttonsPage);

module.exports = routes;