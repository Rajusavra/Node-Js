const Admin = require("../models/Admin");
const userModel = require("../models/userModel");

const path = require("path");

const fs = require("fs");

// =================  Login Page  ==================== //

module.exports.signInPage = (req, res) => {
  try { 
    if (req.cookies.admin == undefined) {
      return res.render("signIn");
    } else {
      return res.redirect("/dashboard");
    }
  } catch (err) {
    console.log(err);
    return res.render("signIn");
  }
};
// =================  Register Page  ==================== //

module.exports.registerPage = async (req, res) => {
    return res.render("register");
};

module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await userModel.create({
      name: name,
      email: email,
      password: password,
    });
    if (!name || !email || !password) {
      console.log("Fields Are Required");
      return res.redirect("back");
    } else {
      console.log("SignUp Successfully");
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// =================  CheckLogin Page  ==================== //

module.exports.checkLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email, password: password });

    if (!user || user.password !== password) {
      console.log(`Email and Password not valid`);
      return res.redirect("/");
    } else {
      if (!email || !password) {
        console.log("Fields Are Required");
        return res.redirect("back");
      } else {
        res.cookie("admin", user);
        return res.redirect("/dashboard");
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.dashboard = async (req, res) => {
  try {
    if (req.cookies.admin == undefined) {
      return res.redirect("/");
    } else {
      let adminId = req.cookies.admin._id;
      let adminData = await userModel.findById(adminId);

      if (adminData) {
        let singleAdmin = req.cookies.admin;
        return res.render("dashboard", {
          singleAdmin,
        });
      } else {
        return res.redirect("/");
      }
    }
  } catch (err) {
    console.log("Something Wrong");
    return false;
  }
};

module.exports.addBlog = async (req, res) => {
  try {
    if (req.cookies.admin == undefined) {
      return res.redirect("/");
    } else {
      let adminId = req.cookies.admin._id;
      let adminData = await userModel.findById(adminId);

      if (adminData) {
        let singleAdmin = req.cookies.admin;
        return res.render("addAdmin", {
          singleAdmin,
        });
      } else {
        return res.redirect("/");
      }
    }
  } catch (err) {
    console.log("Something Wrong");
    return res.redirect("/");
  }
};

// =================  View Blog  ==================== //

module.exports.viewBlog = async (req, res) => {
  try {
    if (req.cookies.admin == undefined) {
      return res.redirect("/");
    } else {
      let adminId = req.cookies.admin._id;
      let adminData = await userModel.findById(adminId);

      if (adminData) {
        let adminRecord = await Admin.find({});
        if (adminRecord) {
          let singleAdmin = req.cookies.admin;
          return res.render("viewAdmin", {
            adminRecord,
            singleAdmin,
          });
        } else {
          return res.render("viewBlog", []);
        }
      } else {
        return res.redirect("/");
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// =================  Add Blog  ==================== //

module.exports.insertAdminBlog = async (req, res) => {
  try {
    req.body.name = req.body.title;
    req.body.avatar = "";
    if (req.file) {
      req.body.avatar = Admin.adPath + "/" + req.file.filename;
    }

    let adminRecord = await Admin.create(req.body);
    if (adminRecord) {
      console.log("Admin record Inserted");
      return res.redirect("back");
    } else {
      console.log("Admin record not Inserted");
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// =================  Delete Blog  ==================== //

module.exports.deleteBlog = async (req, res) => {
  try {
    let adminId = req.params.adId;
    let adminData = await Admin.findById(adminId);
    if (adminData) {
      let imagePath = path.join(__dirname, "..", adminData.avatar);
      try {
        await fs.unlinkSync(imagePath);
      } catch (err) {
        console.log(err);
      }

      let deleteBlog = await Admin.findByIdAndDelete(adminId);
      if (deleteBlog) {
        console.log("blog deleted successfully");
        res.redirect("/viewBlog");
      } else {
        console.log("erroe in deleting blog");
        return false;
      }
    } else {
      console.log("admin record not found");
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// =================  Edit Blog  ==================== //

module.exports.updateBlog = async (req, res) => {
  try {
    let adminId = req.query.adminId;
    let oldAdminData = await Admin.findById(adminId);
    if (oldAdminData) {
      let singleAdmin = req.cookies.admin;
      return res.render("editAdmin", {
        oldAdminData,
        singleAdmin
      });
    } else {
      console.log("record noiyt found");
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// =================  Edit Blog  ==================== //

module.exports.editBlog = async (req, res) => {
  try {
    let adminId = req.params.adminId;
    let oldAdminData = await Admin.findById(adminId);
    if (oldAdminData) {
      if (req.file) {
        let imagePath = path.join(__dirname, "..", oldAdminData.avatar);
        try {
          await fs.unlinkSync(imagePath);
        } catch (err) {
          console.log(err);
        }
        req.body.avatar = Admin.adPath + "/" + req.file.filename;
      } else {
        req.body.avatar = oldAdminData.avatar;
      }

      let newAdminData = await Admin.findByIdAndUpdate(adminId, req.body);

      if (newAdminData) {
        console.log("Blog Updated Successfully");
        return res.redirect("/viewBlog");
      } else {
        console.log("Something Wrong");
        return res.redirect("back");
      }
    } else {
      console.log("record not found");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// =================  Logout Page  ==================== //

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("admin");
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
