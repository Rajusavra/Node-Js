const adminModel = require("../models/adminModel");
const fs = require("fs");
const moment = require("moment");
const jwt = require('jsonwebtoken');

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
      return res.status(404).send({
        success: false,
        message: "Admin Not Found !!... Try to Register",
      });
    } else {
      if (admin.password != password) {
        return res.status(400).send({
          success: false,
          message: "Wrong Password !!... Try to Login Again",
        });
      } else {
        let token = jwt.sign({ adminToken: admin }, 'Sparky', { expiresIn: '1h' });
        return res.status(200).send({
          success: true,
          message: "Admin Login Successfull",
          adminToken: token
        });
      }
    }
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err,
    });
  }
};

const adminProfile = (req, res) => {
  try {
    let adminToken = req.user;
    return res.status(200).send({
      success: true,
      message: 'This is my profile ||',
      adminToken
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err,
    });
  }
}

const changePassword = async (req, res) => {
  try {
    const adminId = req.user;
    
    const { cpass, newpass, conpass } = req.body;
    
    if (!cpass || !newpass || !conpass) {
      return res.status(400).send({
        success: false,
        message: 'Current password, new password, and confirm password are required',
      });
    }
    
    if (newpass !== conpass) {
      return res.status(400).send({
        success: false,
        message: 'New password and confirm password do not match',
      });
    }
    
    const admin = await adminModel.findOne(adminId);
    if (!admin) {
      return res.status(404).send({
        success: false,
        message: 'Admin not found',
      });
    }
    
    if (admin.password !== cpass) {
      return res.status(400).send({
        success: false,
        message: 'Current password is incorrect',
      });
    }
    
    await adminModel.findOneAndUpdate({ _id: adminId }, {
      password: newpass
    });

    return res.status(200).send({
      success: true,
      message: 'Password updated successfully',
      newpass
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'An error occurred while changing the password',
    });
  }
}



module.exports = {
  adminRegister,
  adminLogin,
  adminProfile,
  changePassword
};
