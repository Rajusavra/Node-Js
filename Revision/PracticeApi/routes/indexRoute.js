const express = require('express');

const routes = express.Router();

routes.use('/',require('./userRoute'));

module.exports = routes;