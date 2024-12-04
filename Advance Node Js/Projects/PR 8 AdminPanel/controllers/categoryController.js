const categoryModel = require('../models/catagoryModel');

const addCategory = (req,res) =>{
    return res.render('category/addcategory')
}

const addcategoryfieldsPage = async (req,res) => {
    try {
        const {category} = req.body
        await categoryModel.create({
            name:category
        })
        return res.redirect('/category/viewcategory')
    } catch (err) {
        console.log('err');
        return false;
    }
}

const viewCategoryPage = async (req,res) => {
    try {
        const single = await categoryModel.find({})
        return res.render('category/viewcategory',{
            single
        })
        
    } catch (error) {
        console.log(error);
        return false
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.query.id;
        await categoryModel.findByIdAndDelete(id);
        return res.redirect('/category/viewcategory');
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports ={
    addCategory,addcategoryfieldsPage,viewCategoryPage,deleteCategory
}