
const express = require('express');

const passport = require('passport');

const { addCategory, addcategoryfieldsPage, viewCategoryPage, deleteCategory, editCategory, updateCategory, changeStatus } = require('../controllers/categoryController');

const routes = express.Router();

routes.use('/addcategory',passport.checkUser,addCategory);
routes.post('/addcategoryfields',addcategoryfieldsPage);
routes.use('/viewcategory',passport.checkUser,viewCategoryPage);

routes.get('/deleteCategory', deleteCategory);
routes.get('/editCategory', editCategory);
routes.post('/updateCategory', updateCategory);

routes.get('/changeStatus',changeStatus)
module.exports = routes;
