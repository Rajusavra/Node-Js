const express = require('express');

const routes = express.Router();

const {loginUser,registerUser,registerUserData} = require('../controllers/userController');

routes.get('/',loginUser);
routes.get('/register',registerUser);
routes.post('/registeruser',registerUserData);

module.exports = routes;