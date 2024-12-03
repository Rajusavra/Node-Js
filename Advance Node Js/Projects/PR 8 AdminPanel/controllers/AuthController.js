const userModel = require("../models/UserModel");
const signInPage = (req, res) => {
  if (res.locals.users) {
    return res.redirect("dashboard");
  }
  return res.render("signIn");
};
const checkLogin = (req, res) => {
  return res.redirect("dashboard");
};
const dashboard = (req, res) => {
  return res.render("dashboard");
};
const registerPage = (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/dashboard");
    } else {
      return res.render("register");
    }
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
        console.log("SignUp Successfully");
        return res.redirect("/");
      } else {
        console.log('Password Not Matched');
        return res.redirect('register');
      }
  } catch (err) {
    console.log(err);
    return false;
  }
};
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return false;
    }
    return res.redirect("/");
  });
};

const profile = (req,res) => {
  res.render('profile');
}

const editProfile = (req,res) => {
  res.render('editProfile');
}



module.exports = {
  signInPage,
  checkLogin,
  dashboard,
  registerUser,
  registerPage,
  logout,
  profile,
  editProfile
};
