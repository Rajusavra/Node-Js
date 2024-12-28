const path = require("path");
const fs = require("fs");
const productModel = require("../models/productModel");
const addProductPage = (req, res) => {
  return res.render("product");
};
const cartPage = async (req, res) => {
  try {
    const product = await productModel.find({});

    return res.render("viewcart", {
      product,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const insertProduct = async (req, res) => {
  try {
    const { name, description, price,qt } = req.body;

    await productModel.create({
      name: name,
      description: description,
      price: price,
      qt:qt,
      image:req.file.path
    });
    console.log(`product add`);
    return res.redirect("/product/view");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.query.id;

    let product = await productModel.findById(id);
    fs.unlinkSync(product.image);

    await productModel.findByIdAndDelete(id);

    return res.redirect("/product/view");
  } catch (error) {
    console.log(error);
    return false;
  }
};
const editProduct = async (req, res) => {
  try {
    const id = req.query.id;

    const product = await productModel.findById(id);

    return res.render("edit", {
      product,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateProduct = async (req, res) => {
  try {
    const { editid, name, description, price,qt } = req.body;

    if (req.file) {
      let product = await productModel.findById(editid);
      fs.unlinkSync(product.image);

      await productModel.findByIdAndUpdate(editid, {
        name: name,
        description: description,
        price: price,
        qt,qt,
        image:req.file.path
      });

      return res.redirect("/product/view");
    } else {
      const single = await productModel.findById(editid);

      await productModel.findByIdAndUpdate(editid, {
        name: name,
        description: description,
        price: price,
        qt,qt,
        image:req.file.path
      });
      return res.redirect("/product/view");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
addProductPage,
  cartPage,
  insertProduct,
  deleteProduct,
  editProduct,
  updateProduct,
};
