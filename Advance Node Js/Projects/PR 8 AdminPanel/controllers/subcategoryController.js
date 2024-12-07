const categoryModel = require("../models/catagoryModel");
const subcategoryModel = require("../models/subcategoryModels");

const addSubCategory = async (req, res) => {
  try {
    let category = await categoryModel.find({ status: "active" });

    return res.render("subcategory/addsubcategory", {
      category: category,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addSubCategoryFieldsPage = async(req, res)=>{
    try {
        const {category,subcategory}=req.body
        await subcategoryModel.create({
            categoryid:category,
            subcategory:subcategory
            
        })
        
        return res.redirect('/subcategory/viewsubcategory')
        
    } catch (error) { 
        console.log(error);
        return false
    }
}

const viewSubCategory = async (req, res)=>{
    try {
        const subcategory = await subcategoryModel.find({}).populate('categoryid')
        return res.render('subcategory/viewsubcategory',{
          subcategory: subcategory
        })
        
    } catch (error) {
        console.log(error);
        return false
    }
}


module.exports = {
    addSubCategory,
    addSubCategoryFieldsPage,
    viewSubCategory,
    // deleteCategory,
    // editCategory,
    // updateCategory,
    // changeStatus
  };