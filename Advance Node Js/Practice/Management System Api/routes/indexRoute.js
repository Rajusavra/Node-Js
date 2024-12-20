const express = require('express');

const routes = express.Router();

routes.use('/user', require('../routes/userRoute'));
routes.use('/', require('../routes/authRoute'));

module.exports = routes;