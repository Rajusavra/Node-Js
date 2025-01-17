const express = require('express');

const routes = express.Router();

const {gridPage}  = require('../controllers/gridController');

routes.get('/',gridPage);

module.exports = routes;