const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')

const viewUser = async (req, res) => {
  try {
    let userDetails = await userModel.find({});
    return res.status(200).send({
      success: true,
      message: "userDetails fetched successfully",
      userDetails,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Error View user Details",
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, password, city, phone ,role} = req.body;

    let dup = await userModel.findOne({ email: email });
    if (dup) {
      return res.status(400).send({
        message: "User already exists",
      });
    } else {
      if (!name || !email || !password || !city || !phone || !role) {
        return res.status(400).send({
          success: false,
          message: "All Fields Are Required",
        });
      } else {
        let userDetails = await userModel.create({
          name: name,
          email: email,
          password: password,
          city: city,
          phone:phone,
          role:role
        });
        return res.status(200).send({
          success: true,
          message: "User detail inserted Successfully",
          userDetails,
        });
      }
    }
    let token = await jwt.sign({ user: user }, "sparky", { expiresIn: "2hr" });
    return res.status(200).send({
      success: true,
      token: token,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Error in Add User",
    });
  }
}

const loginUser = async (req,res) => {
  try {
      const {email,password} = req.body;
      if (!email || !password) {
          return res.status(500).send({
              success : false,
              message : "All Filed Are Required",
          });
      }
      let user = await userModel.findOne({email : email});
      if(!user || user.password != password){
          return res.status(500).send({
              success : false,
              message : "Plz Enter valid Email And Password",
          });
      }
      let token = await jwt.sign({paylod:user} , 'Sparky' , {expiresIn:"4hr"})
      return res.status(200).send({
          success : true,
          token : token
      })
  } catch (err) {
      return res.status(501).send({
          success:false,
          message:err
      })
  }
}


const deleteUser = async (req, res) => {
  try {
    let id = req.query.id;
    let delUser = await userModel.findByIdAndDelete(id);
    if (delUser) {
      return res.status(200).send({
        success: true,
        message: "User deleted successfully",
        delUser,
      });
    } else {
      return res.status(400).sen({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Error in Delete User",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let id = req.query.id;
    const { name, email, password, city, phone ,role } = req.body;
    if (!name || !email || !password || !city || !phone || !role) {
      return res.status(400).send({
        success: false,
        message: "All Fields Are Required",
    });
    } else {
      let upUser = await userModel.findByIdAndUpdate(id, req.body);
      if (upUser) {
        return res.status(200).send({
          success: true,
          message: "user Details Updated Successfully",
          upUser,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "User not found",
        });
      }
    }
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Error in Update User",
    });
  }
};

module.exports = {
  addUser,
  loginUser,
  viewUser,
  deleteUser,
  updateUser
};
