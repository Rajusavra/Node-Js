const express = require("express");

const routes = express.Router();

routes.use('/',require('./teacherRourte'));
routes.use('/student',require('./studentRoute'));

module.exports = routes;