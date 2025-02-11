const express = require('express');

const routes = express.Router();

const {registerUser} = require('../controllers/userControler');

routes.post('/register',registerUser);

module.exports = routes;