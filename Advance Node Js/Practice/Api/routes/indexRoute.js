const express = require('express');

const routes = express.Router();

routes.use('/', require('../routes/userRoute'));

module.exports = routes;