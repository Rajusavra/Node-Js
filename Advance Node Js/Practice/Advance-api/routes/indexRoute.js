const express = require("express");

const routes = express.Router();

routes.use('/',require('./teacherRourte'));

module.exports = routes;