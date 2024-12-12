const categoryModel = require("../models/catagoryModel");
const subcategoryModel = require("../models/subcategoryModels");

const addSubCategory = async (req, res) => {
  try {
    let category = await categoryModel.find({ status: "active" });

    return res.render("subcategory/addsubcategory", {
      category: category
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addSubCategoryFieldsPage = async (req, res) => {
  try {
    const { category, subcategory } = req.body;
    await subcategoryModel.create({
      categoryid: category,
      subcategory: subcategory,
    });

    return res.redirect("/subcategory/viewsubcategory");
  } catch (error) {
    console.log(error);
    return false;
  }
};

const viewSubCategory = async (req, res) => {
  try {
    const subcategory = await subcategoryModel.find({}).populate("categoryid");
    return res.render("subcategory/viewsubcategory", {
      subcategory: subcategory,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const id = req.query.id;
    await subcategoryModel.findByIdAndDelete(id);
    return res.redirect("/subcategory/viewsubcategory");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const editSubCategory = async (req, res) => {
  try {
      const id = req.query.id;
      let category = await categoryModel.find({ status: 'active' });
      const single = await subcategoryModel.findById(id).populate('categoryid');
      return res.render('subcategory/editsubcategory', {
          category: category,
          single: single
      });
  } catch (err) {
      console.log(err);
      return false;
  }
}

const updateSubCategory = async (req, res) => {
  try {
      const { editid, category, subcategory } = req.body;
      await subcategoryModel.findByIdAndUpdate(editid, {
          categoryid: category,
          subcategory: subcategory
      })
      return res.redirect('/subcategory/viewsubcategory');
  } catch (err) {
      console.log(err);
      return false;
  }
}

const changeStatus = async (req, res) => {
  try {
    const id = req.query.id;
    const st = req.query.status;
    if (st == "active") {
      await subcategoryModel.findByIdAndUpdate(id, { status: "deactive" });
      return res.redirect("/subcategory/viewsubcategory");
    } else {
      await subcategoryModel.findByIdAndUpdate(id, { status: "active" });
      return res.redirect("/subcategory/viewsubcategory");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  addSubCategory,
  addSubCategoryFieldsPage,
  viewSubCategory,
  deleteSubCategory,
  editSubCategory,
  updateSubCategory,
  changeStatus,
};
