const express = require('express');

const routes = express.Router();

const passport = require('passport');

const {addProductPage,viewProducts,addProductdata} = require('../controllers/productControler');

routes.get('/addproduct',addProductPage);
routes.post('/addproductdata',addProductdata);
routes.get('/viewproduct',viewProducts);

module.exports = routes ;