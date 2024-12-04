
const express = require('express');

const passport = require('passport');

const { addCategory, addcategoryfieldsPage, viewCategoryPage, deleteCategory } = require('../controllers/categoryController');

const routes = express.Router();

routes.use('/addcategory',passport.checkUser,addCategory);
routes.post('/addcategoryfields',addcategoryfieldsPage);
routes.use('/viewcategory',passport.checkUser,viewCategoryPage);

routes.get('/deleteCategory', deleteCategory);
module.exports = routes;
