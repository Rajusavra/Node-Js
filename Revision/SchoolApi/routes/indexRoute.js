const express = require('express');

const routes = express.Router();

routes.use('/student', require('./studentRoute'));
routes.use('/teacher', require('./teacherRoute'));

module.exports = routes;