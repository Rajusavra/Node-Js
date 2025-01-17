const express = require('express');

const routes = express.Router();

const passport = require('passport');

const {addProductPage,viewProducts,addProductdata,getCategory} = require('../controllers/productControler');

routes.get('/addproduct',addProductPage);
routes.get('/getcategory', getCategory);
routes.post('/addproductdata',addProductdata);
routes.get('/viewproduct',viewProducts);

module.exports = routes ;