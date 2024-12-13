const categoryModel = require("../models/catagoryModel");

const subcategoryModel = require("../models/subcategoryModels");

const exsubcategoryModel = require("../models/exsubcategoryModel");

const viewExSubCategory = async (req, res) => {
  try {
    let exsubcategory = await exsubcategoryModel
      .find({})
      .populate("categoryid")
      .populate("subcategoryid");
    return res.render("exsubcategory/viewexsubcategory", {
      exsubcategory: exsubcategory,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

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
    return res.redirect("/exsubcategory/viewexsubcategory");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const editExSubCategory = async (req, res) => {
  try {
    const id = req.query.id;

    const category = await categoryModel.find({});
    const subcategory = await subcategoryModel.find({}).populate("categoryid");
    const exsubcategory = await exsubcategoryModel
      .findById(id)
      .populate("categoryid")
      .populate("subcategoryid");

    return res.render("exsubcategory/editexsubcategory", {
      category: category,
      subcategory: subcategory,
      exsubcategory: exsubcategory,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateExSubCategory = async (req, res) => {
  try {
    const { editid, category, subcategory, exsubcategory } = req.body;
    await exsubcategoryModel.findByIdAndUpdate(editid, {
      categoryid: category,
      subcategoryid: subcategory,
      exsubcategory: exsubcategory,
    });
    return res.redirect("/exsubcategory/viewexsubcategory");
  } catch (err) {
    console.log(err);
  }
};

const getCategory = async (req, res) => {
  try {
    const id = req.query.id;

    const category = await subcategoryModel.find({ categoryid : id });
    return res.send({
      success: true,
      message: "its Working",
      category,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const changeStatus = async (req, res) => {
  try {
    const id = req.query.id;
    const st = req.query.status;
    if (st == "active") {
      await exsubcategoryModel.findByIdAndUpdate(id, { status: "deactive" });
      return res.redirect("/exsubcategory/viewexsubcategory");
    } else {
      await exsubcategoryModel.findByIdAndUpdate(id, { status: "active" });
      return res.redirect("/exsubcategory/viewexsubcategory");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  addExSubCategoryPage,
  addExSubCategoryData,
  viewExSubCategory,
  deleteExSubCategory,
  editExSubCategory,
  updateExSubCategory,
  getCategory,
  changeStatus,
};
