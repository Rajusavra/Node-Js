const express = require('express');

const routes = express.Router();

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

const {adminRegister,adminLogin} = require('../controllers/adminController');

routes.post('/adminregister',fileUpload,adminRegister);
routes.post('/adminlogin',adminLogin);

module.exports = routes ;