const express = require('express');

const routes = express.Router();

const {loginUser,registerUser,registerUserData,checkLogin} = require('../controllers/userController');

const passport = require('passport');

routes.get('/',loginUser);
routes.post('/checklogin',passport.authenticate('local',{failureRedirect : '/'}),checkLogin);   
routes.get('/register',registerUser);
routes.post('/registeruser',registerUserData);

module.exports = routes;