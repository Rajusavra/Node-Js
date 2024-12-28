const express = require('express');

const routes = express.Router();

const {addProductPage,cartPage,insertProduct,deleteProduct,editProduct,updateProduct} = require('../controllers/productController');

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

routes.get('/',passport.checkUser,addProductPage);
routes.post('/insertProduct',fileUpload,insertProduct);
routes.get('/view',passport.checkUser,cartPage);
routes.get('/delete',deleteProduct);
routes.get('/edit', passport.checkUser ,editProduct);
routes.post('/update',fileUpload,updateProduct)

module.exports = routes;