const express =  require('express');

const route = express.Router();

const passport = require('passport');

const AdminCtl = require('../controllers/adminController');

const Admin = require('../models/Admin');

route.get('/',AdminCtl.signInPage);

route.get('/register',AdminCtl.registerPage);

route.post('/registerUser',AdminCtl.registerUser);

route.post('/checkLogin',passport.authenticate('local', {failureRedirect : '/'}),AdminCtl.checkLogin);

route.get('/logout',AdminCtl.logout);

route.get("/dashboard",passport.checkUser,AdminCtl.dashboard);

route.get("/addBlog",passport.checkUser,AdminCtl.addBlog);

route.get("/viewBlog",passport.checkUser,AdminCtl.viewBlog);

route.post('/insertAdminBlog',Admin.uploadAdminImage,AdminCtl.insertAdminBlog);

route.get('/deleteBlog/:adId',AdminCtl.deleteBlog);

route.get('/updateBlog',passport.checkUser,AdminCtl.updateBlog);

route.post('/editBlog/:adminId',Admin.uploadAdminImage,AdminCtl.editBlog);

module.exports = route;
