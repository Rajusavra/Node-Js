const express = require('express');

const routes = express.Router();

routes.use('/', require('../routes/authRoute'));

routes.use('/forgot', require('./forgotRoute'));

module.exports = routes;