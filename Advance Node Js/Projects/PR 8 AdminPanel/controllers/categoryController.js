const categoryModel = require("../models/catagoryModel");

const addCategory = (req, res) => {
  return res.render("category/addcategory");
};

const addcategoryfieldsPage = async (req, res) => {
  try {
    const { category } = req.body;
    let insertCategory = await categoryModel.create({
      category: category,
    });
    return res.redirect("/category/viewcategory");
  } catch (err) {
    console.log("err");
    return false;
  }
};

const viewCategoryPage = async (req, res) => {
  try {
    const single = await categoryModel.find({});
    return res.render("category/viewcategory", {
      single,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.query.id;
    await categoryModel.findByIdAndDelete(id);
    return res.redirect("/category/viewcategory");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const editCategory = async (req, res) => {
  try {
    const id = req.query.id;
    let single = await categoryModel.findById(id);
    return res.render("category/editcategory", {
      single,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateCategory = async (req, res) => {
  try {
    const { category, editid } = req.body;
    await categoryModel.findByIdAndUpdate(editid, {
      category,
    });
    return res.redirect("/category/viewcategory");
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
      await categoryModel.findByIdAndUpdate(id, {
        status: "deactive",
      });
      return res.redirect("/category/viewcategory");
    } else {
      await categoryModel.findByIdAndUpdate(id, {
        status: "active",
      });
      return res.redirect("/category/viewcategory");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addCategory,
  addcategoryfieldsPage,
  viewCategoryPage,
  deleteCategory,
  editCategory,
  updateCategory,
  changeStatus,
};
