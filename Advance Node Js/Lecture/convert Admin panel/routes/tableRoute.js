const express = require('express');

const routes = express.Router();

const {tablePage}  = require('../controllers/tableController');

routes.get('/',tablePage);

module.exports = routes;