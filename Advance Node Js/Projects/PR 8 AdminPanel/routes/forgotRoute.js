const express = require('express');

const routes = express.Router();

const { verifyEmail } = require('../controllers/ForgotController.js');

routes.post('/verifyEmail', verifyEmail)

module.exports = routes;