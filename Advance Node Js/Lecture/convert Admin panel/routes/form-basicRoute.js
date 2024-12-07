const express = require('express');

const routes = express.Router();

const {basicPage}  = require('../controllers/form-basicController');

routes.get('/',basicPage);

module.exports = routes;