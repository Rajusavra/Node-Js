const express =  require('express');

const routes = express.Router();

const { loginUser , } = require('../controllers/authController');

routes.post('/login',loginUser)

module.exports = routes;