const userModel = require("../models/userModel");

// ========= Sign In ========= //

const signInPage = (req, res) => {
  if (res.locals.users) {
    return res.redirect("/dashboard");
  }
  return res.render("signIn");
};

const checkLogin = (req, res) => {
  return res.redirect("/dashboard");
};

const dashboard = (req,res) => {
  return res.render("dashboard");
}

// ========= Register UserInfo ========= //

const registerPage = (req, res) => {
  try {
    if (res.locals.users) {
        return res.redirect("/dashboard");
      }
      return res.render("register");
  } catch (err) {
    console.log(err);
    return res.redirect("/dashboard");
  }
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password, conpassword } = req.body;
    await userModel.create({
      name: name,
      email: email,
      password: password,
      conpassword: password
    });

    if (password == conpassword) {
        return res.redirect("/");
      } else {
        console.log('Password Not Matched');
        return res.redirect('/register');
      }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  signInPage,
  checkLogin,
  registerUser,
  registerPage,
  dashboard
}
