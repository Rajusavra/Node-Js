const express=require('express')

const passport = require('passport');

const routes=express.Router()

const { addSubCategory, addSubCategoryFieldsPage,viewSubCategory} = require('../controllers/subcategoryController');

routes.use('/addsubcategory',passport.checkUser,addSubCategory);
routes.post('/addsubcategoryfields',addSubCategoryFieldsPage);
routes.get('/viewsubcategory',viewSubCategory);

 module.exports=routes