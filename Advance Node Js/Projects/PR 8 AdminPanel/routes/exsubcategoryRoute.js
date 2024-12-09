const express = require('express');

const routes = express.Router();

const passport = require('passport');

const {addExSubCategoryPage,addExSubCategoryData,viewExSubCategory,deleteExSubCategory} = require('../controllers/exsubcategoryController');

routes.get('/addpage' , passport.checkUser , addExSubCategoryPage);
routes.post('/add' , addExSubCategoryData);
routes.get('/viewexsubcategory' , passport.checkUser , viewExSubCategory);

routes.get('/deleteexsubcategory',deleteExSubCategory);

module.exports = routes ;