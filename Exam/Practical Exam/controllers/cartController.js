const path = require("path");
const fs = require("fs");
const productModel = require("../models/productModel");
const viewcartPage = async (req, res) => {
  try {
    const product = await productModel.find({});

    return res.render("cartpage", {
      product,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteCart = async (req, res) => {
  try {
    const id = req.query.id;

    let product = await productModel.findById(id);
    fs.unlinkSync(product.image);

    await productModel.findByIdAndDelete(id);

    return res.redirect("/cart/view");
  } catch (error) {
    console.log(error);
    return false;
  }
};
const editCart = async (req, res) => {
  try {
    const id = req.query.id;

    const product = await productModel.findById(id);

    return res.render("editcart", {
      product,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateCart = async (req, res) => {
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

      return res.redirect("/cart/view");
    } else {
      const single = await productModel.findById(editid);

      await productModel.findByIdAndUpdate(editid, {
        name: name,
        description: description,
        price: price,
        qt,qt,
        image:req.file.path
      });
      return res.redirect("/cart/view");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  viewcartPage,
  deleteCart,
  editCart,
  updateCart
};
