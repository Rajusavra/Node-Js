const express = require('express');

const routes = express.Router();

const { postEmail } = require('../controllers/ForgotController.js');

routes.post('/postEmail', postEmail)

module.exports = routes;