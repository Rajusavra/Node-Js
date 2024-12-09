const categoryModel = require("../models/catagoryModel");

const subcategoryModel = require("../models/subcategoryModels");

const exsubcategoryModel = require("../models/exsubcategoryModel");

const viewExSubCategory = async (req,res) => {
    try {
        let exsubcategory = await exsubcategoryModel.find({ status: 'active' }).populate('categoryid').populate('subcategoryid');
        return res.render('exsubcategory/viewexsubcategory', {
            exsubcategory: exsubcategory
        })
    } catch (err) {
        console.log(err);
        return false
    }
}

const addExSubCategoryPage = async (req, res) => {
  try {
    let category = await categoryModel.find({ status: "active" });
    let subcategory = await subcategoryModel.find({ status: "active" });
    return res.render("exsubcategory/addexsubcategory", {
      category: category,
      subcategory: subcategory,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const addExSubCategoryData = async (req, res) => {
  try {
    const { category, subcategory, exsubcategory } = req.body;
    await exsubcategoryModel.create({
      categoryid: category,
      subcategoryid: subcategory,
      exsubcategory: exsubcategory,
    });
    return res.redirect("/exsubcategory/viewexsubcategory"); 
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteExSubCategory = async (req, res) => {
  try {
      const id = req.query.id;
      await exsubcategoryModel.findByIdAndDelete(id);
      return res.redirect('/exsubcategory/viewexsubcategory');
  } catch (err) {
      console.log(err);
      return false;
  }
}

module.exports = {
  addExSubCategoryPage,
  addExSubCategoryData,
  viewExSubCategory,
  deleteExSubCategory,
};
