const express =  require('express');

const route = express.Router();

const AdminCtl = require('../controllers/adminController');

const Admin = require('../models/Admin');

route.get('/',AdminCtl.signInPage);

route.get('/register',AdminCtl.registerPage);

route.post('/registerUser',AdminCtl.registerUser);

route.post('/checkLogin',AdminCtl.checkLogin);

route.get('/logout',AdminCtl.logout);

route.get("/dashboard",AdminCtl.dashboard);

route.get("/addBlog",AdminCtl.addBlog);

route.get("/viewBlog",AdminCtl.viewBlog);

route.post('/insertAdminBlog',Admin.uploadAdminImage,AdminCtl.insertAdminBlog);

route.get('/deleteBlog/:adId',AdminCtl.deleteBlog);

route.get('/updateBlog',AdminCtl.updateBlog);

route.post('/editBlog/:adminId',Admin.uploadAdminImage,AdminCtl.editBlog);

module.exports = route;
