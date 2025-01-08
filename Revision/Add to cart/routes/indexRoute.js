const express = require('express');

const routes = express.Router();

routes.use('/',require('./productRoute'));

module.exports = routes;