const userModel = require('../models/userModel');

const addUser =  (req,res) => {
    try {
        return res.status(200).send({
            success: true,
            message: "Response recieved",
        })
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Error in Add User",
        })
    }
}
const addData =  (req,res) => {
    try {
        console.log(req.body);
        
        return res.status(200).send({
            success: true,
            message: "data Added",
        })
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Error While inserting data",
        })
    }
}



module.exports = {
    addUser,addData,
}