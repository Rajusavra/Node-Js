const express =  require('express');

const { signInPage, checkLogin, dashboard, registerPage, registerUser, logout, profile } = require('../controllers/AuthController');

const route = express.Router();

const passport = require('passport');


route.get('/',signInPage);
route.post('/checkLogin',passport.authenticate('local', {failureRedirect : '/'}),checkLogin);
route.get("/dashboard",passport.checkUser,dashboard);
route.get('/register',registerPage);

route.post('/registerUser',registerUser);
route.get('/logout',logout);

route.get('/profile',profile)

module.exports = route;
