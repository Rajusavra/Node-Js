const express = require('express');

const {addProductPage,viewProducts,addProductdata,deleteProduct,editProduct,updateProduct,getCategory,getSubCategory} = require('../controllers/productControler');

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

const passport = require('passport');


routes.get('/addproduct', passport.checkUser ,addProductPage);
routes.get('/getcategory', getCategory);
routes.get('/getsubcategory', getSubCategory);
routes.post('/addproductdata',fileUpload,addProductdata);
routes.get('/viewproduct',viewProducts);

routes.get('/deleteproduct',deleteProduct);
routes.get('/editproduct', passport.checkUser ,editProduct);
routes.post('/update',fileUpload,updateProduct)

module.exports = routes ;