const express =  require('express');

const { signInPage, checkLogin, dashboard, registerPage, registerUser, logout, changePass, setNewPass, profile, editProfilePage, updateProfile, } = require('../controllers/AuthController');

const route = express.Router();

const passport = require('passport');


route.get('/',signInPage);
route.post('/checkLogin',passport.authenticate('local', {failureRedirect : '/'}),checkLogin);
route.get("/dashboard",passport.checkUser,dashboard);
route.get('/register',registerPage);

route.post('/registerUser',registerUser);
route.get('/logout',logout);

route.get('/changepass', passport.checkUser ,changePass)
route.post('/setNewPass',setNewPass)

route.get('/profile',passport.checkUser,profile)
route.get('/editprofile',passport.checkUser,editProfilePage)
route.post('/updateprofile',updateProfile)

module.exports = route;
