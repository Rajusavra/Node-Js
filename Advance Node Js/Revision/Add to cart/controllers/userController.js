const User = require('../models/userModel');

const loginUser = async (req, res) => {
    try {
        return res.render('loginuser')
    } catch (err) {
        console.log(err);
        return false;
    }
}

const registerUser = async (req, res) => {
    try {
        return res.render('register');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const registerUserData = async (req, res) => {
    try {
        const { name, email, password, con_password } = req.body;

        if (!name || !email || !password || !con_password) {
            console.log('All Fields Are Required');
            return res.redirect('/register');
        }

        let duplicate = await User.findOne({ email });
        if (duplicate) {
            console.log('Email Already Exist Try to Login....');
            return res.redirect('/register');
        }

        if (password !== con_password) {
            console.log('Password Not Match.....');
            return res.redirect('/register');
        }

        const userData = await User.create({
            name: name,
            email: email,
            password: password,
            con_password: con_password
        });

        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const checkLogin = async (req, res) => {
    try {
        return res.redirect('/product');
        
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    loginUser,
    registerUser,
    registerUserData,
    checkLogin
}