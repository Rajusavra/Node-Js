const express=require('express')

const passport = require('passport');

const routes=express.Router()

const { addSubCategory,addSubCategoryFieldsPage,viewSubCategory,deleteSubCategory,editSubCategory,updateSubCategory,changeStatus} = require('../controllers/subcategoryController');

routes.use('/addsubcategory',passport.checkUser,addSubCategory);
routes.post('/addsubcategoryfields',addSubCategoryFieldsPage);
routes.get('/viewsubcategory',viewSubCategory);

routes.get('/deletesubcategory',deleteSubCategory);
routes.get('/editsubcategory',editSubCategory);
routes.post('/updatesubcategory',updateSubCategory);



routes.get('/changeStatus', changeStatus);
 module.exports=routes