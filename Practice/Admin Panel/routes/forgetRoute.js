const express = require('express');

const passport = require('passport');

const routes = express.Router();

const { verifyEmail, email, otpPage, otpPost, newPassPage, newPassword} = require('../controllers/ForgetController.js');

routes.get('/verifyEmail', verifyEmail);
routes.post('/email', email)
routes.post('/otpPost', otpPost)
routes.get('/otp',otpPage)
routes.get('/newPassPage',newPassPage)
routes.post('/newPassword', newPassword)


module.exports = routes;