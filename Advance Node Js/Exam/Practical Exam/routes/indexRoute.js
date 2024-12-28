const express = require('express');

const routes = express.Router();

routes.use('/',require('./authRoute'));
routes.use('/product',require('./productRoute'));

module.exports = routes;