const express = require('express');

const routes = express.Router();

routes.use('/',require('./authRoute'));
routes.use('/product',require('./productRoute'));
routes.use('/cart',require('./cartRoute'));

module.exports = routes;