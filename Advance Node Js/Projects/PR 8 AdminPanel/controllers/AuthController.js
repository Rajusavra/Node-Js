const userModel = require("../models/UserModel");

// ========= Sign In ========= //

const signInPage = (req, res) => {
  if (res.locals.users) {
    return res.redirect("dashboard");
  }
  return res.render("signIn");
};

const checkLogin = (req, res) => {
  return res.redirect("dashboard");
};

// ========= DashBoard Page ========= //

const dashboard = (req, res) => {
  return res.render("dashboard");
};

// ========= Register UserInfo ========= //

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

// ========= Logout ========= //

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return false;
    }
    return res.redirect("/");
  });
};

// ========= Profile ========= //

const profile = (req,res) => {
  res.render('profile');
}

const editProfilePage = (req,res) => {
  res.render('editProfile');
}


const updateProfile = async(req,res) =>{
  try {
      const {name,email,editpassword,editemail} =req.body
      await userModel.findOneAndUpdate({email:editemail},{
          name : name,
          email : email,
          password : editpassword        
      })
      return res.redirect('/profile')
  } catch (err) {
      console.log(err);
      return false
  }
}


// ========= Change Password ========= //

const changePass = (req, res) => {
  return res.render("changePass");
};

const setNewPass = async (req, res) => {
  try {
    const { editpassword, conpassword, editemail } = req.body;
    await userModel.findOneAndUpdate({email:editemail},{
      password : editpassword,
    })
    if (editpassword == conpassword) {
      return res.redirect('/dashboard')
    } else {
      console.log('Make sure new and confirm pass are same');
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};


module.exports = {
  signInPage,
  checkLogin,
  dashboard,
  registerUser,
  registerPage,
  logout,
  changePass,
  setNewPass,
  profile,
  editProfilePage,
  updateProfile
};
