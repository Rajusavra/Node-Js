const express = require('express');

const routes = express.Router();

const {viewcartPage,deleteCart,editCart,updateCart} = require('../controllers/cartController');

const path = require('path')

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

const passport = require('passport');

routes.get('/view',passport.checkUser,viewcartPage);
routes.get('/delete',deleteCart);
routes.get('/edit', passport.checkUser ,editCart);
routes.post('/update',fileUpload,updateCart);

module.exports = routes;