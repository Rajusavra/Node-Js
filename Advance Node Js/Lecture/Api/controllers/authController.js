const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

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
        let token = jwt.sign({paylod:user} , 'Sparky' , {expiresIn:"4hr"})
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


module.exports = {
    loginUser
}