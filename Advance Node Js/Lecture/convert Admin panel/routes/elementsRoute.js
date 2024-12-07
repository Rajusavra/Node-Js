const express = require('express');

const routes = express.Router();

const {elementsPage}  = require('../controllers/elementsController');

routes.get('/',elementsPage);

module.exports = routes;