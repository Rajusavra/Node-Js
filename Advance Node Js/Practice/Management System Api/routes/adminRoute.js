const express = require('express');

const routes = express.Router();

const nodemailer = require('nodemailer');
const multer = require('multer');

const st = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'uploads')
    },
    filename : (req,file,cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
})

const fileUpload = multer({storage : st}).single('image');
const {adminAuth} = require('../middleware/AdminAuth');

const {adminRegister,adminLogin,adminProfile,changePassword} = require('../controllers/adminController');
const {checkEmail} = require('../controllers/forgetController');

routes.post('/adminregister',fileUpload,adminRegister);
routes.post('/adminlogin',adminLogin);
routes.get('/adminprofile',adminAuth,adminProfile);
routes.post('/changepassword',adminAuth,changePassword);
routes.post('/checkemail',checkEmail);

module.exports = routes ;