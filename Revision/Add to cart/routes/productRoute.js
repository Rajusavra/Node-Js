const express = require('express');

routes = express.Router();

const {addProductPage,insertProduct,viewProduct,deleteProduct,editProduct,updateProduct} = require('../controllers/productControllers');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const fileUpload = multer({ storage: storage }).single('image');

routes.get('/',addProductPage);
routes.post('/insertproduct',fileUpload,insertProduct);
routes.get('/viewproduct',viewProduct);
routes.get('/deleteproduct',deleteProduct);
routes.get('/editproduct',editProduct);
routes.post('/updateproduct',fileUpload,updateProduct);

module.exports = routes;