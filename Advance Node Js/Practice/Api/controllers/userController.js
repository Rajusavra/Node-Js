const userModel = require('../models/userModel');

const viewUser = async (req,res)  => {
    try {
        let userDetails = await userModel.find({});
        return res.status(200).send({
            success: true,
            message: "userDetails fetched successfully",
            userDetails
        })
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Error View user Details",
        })
    }
}

const addUser =  async (req,res) => {
    try {

        const {name,email,password,city} = req.body;

        let dup = await userModel.findOne({ email : email });
        if (dup) {
            return res.status(400).send({
                message: "User already exists"
            });
        }else{
            if (!name || !email || !password || !city) {
                return res.status(400).send({
                    success: false,
                    message: "All Fields Are Required",
                })
            } else {
                let userDetails = await userModel.create({
                    name:name,
                    email:email,
                    password:password,
                    city:city
                });
                return res.status(200).send({
                    success: true,
                    message: "User detail inserted Successfully",
                    userDetails
                })
            }
        }
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Error in Add User",
        })
    }
}

const deleteUser = async (req,res) => {
    try {
        let id = req.params.id;
        let delUser = await userModel.findByIdAndDelete(id);
        if (delUser) {
            return res.status(200).send({
                success : true,
                message: "User deleted successfully",
                delUser
            });
        }else{
            return res.status(400).sen({
                success : false,
                message : "User not found"
            });
        }
    } catch (err) {
        return res.status(400).send({
            success : false,
            message: "Error in Delete User",
        });
    }
}

const updateUser = async (req,res) => {
    try {
        let id = req.params.id;
        const {name,email,password,city} = req.body;
        if (!name || !email || !password || !city) {
            return res.status(400).send({
                success: false,
                message: "All Fields Are Required",
            })
        }else{
            let upUser = await userModel.findByIdAndUpdate(
                id,
                req.body
            );
            if (upUser) {
                return res.status(200).send({
                    success : true,
                    message : "user Details Updated Successfully",
                    upUser
                });
            }else{
                return res.status(400).send({
                    success : false,
                    message : "User not found"
                });
            }
        }
   
    } catch (err) {
        return res.status(400).send({
            success : false,
            message: "Error in Update User",
        });
    }
}

module.exports = {
    addUser,viewUser,deleteUser,updateUser,
}