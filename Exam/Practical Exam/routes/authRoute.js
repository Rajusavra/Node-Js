const express = require('express');

const routes = express.Router();

const {signInPage,registerPage,registerUser,checkLogin,dashboard,logoutUser} = require('../controllers/AuthController');

const passport = require('passport');

routes.get('/',signInPage);
routes.post('/checkLogin',passport.authenticate('local', {failureRedirect : '/'}),checkLogin);
routes.get("/dashboard",passport.checkUser,dashboard);
routes.get('/register',registerPage);
routes.post('/registerUser',registerUser);
routes.get('/logout',logoutUser);

module.exports = routes;