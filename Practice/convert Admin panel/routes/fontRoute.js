const express = require('express');

const routes = express.Router();

const {fontPage}  = require('../controllers/fontController');

routes.get('/',fontPage);

module.exports = routes;