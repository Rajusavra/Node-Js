const adminModel = require("../models/adminModel");
const fs = require("fs");
const moment = require("moment");

const adminRegister = async (req, res) => {
  try {
    const { name, email, password, phone, confirm_password } = req.body;

    if (!name || !email || !password || !confirm_password || !phone) {
      return res.status(500).send({
        success: false,
        message: "All filed is required",
      });
    }
    const existAdmin = await adminModel.findOne({ email: email });
    if (existAdmin) {
      return res.status(500).send({
        success: false,
        message: "Admin Already Exist !!... Try to login",
      });
    }
    if (password !== confirm_password) {
      return res.status(500).send({
        success: false,
        message: "Password and Confirm Password is not match",
      });
    }
    req.body.createdDate = moment().format("DD-MM-YYYY, h:mm:ss A");
    req.body.updatedDate = moment().format("DD-MM-YYYY, h:mm:ss A");
    let insertAdmin = await adminModel.create({
      name: name,
      email: email,
      password: password,
      confirm_password: confirm_password,
      phone: phone,
      image: req.file.path,
      createdDate: req.body.createdDate,
      updatedDate: req.body.updatedDate,
    });
    console.log(req.body);
    return res.status(200).send({
      success: true,
      message: "AdminDetails Inserted Successfullky",
      insertAdmin,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email: email });
    if (!admin) {
      return res.status(500).send({
        success: false,
        message: "Admin Not Found !!... Try to Register",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Admin Login Successfull",
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err,
    });
  }
};

module.exports = {
  adminRegister,
  adminLogin,
};
