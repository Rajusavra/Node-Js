const User = require('../models/user');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        console.log(req.body);
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                message: "All Fields Are Required"
            });
        }

        let userData = await User.create({
            name,
            email,
            password,
            phone
        });

        return res.status(200).json({
            message: "User Registered Successfully",
            UserDetails : userData
        });

    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
}

module.exports = {
    registerUser
}