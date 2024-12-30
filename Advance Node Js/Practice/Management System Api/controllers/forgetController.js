const adminModel = require("../models/adminModel");
const fs = require("fs");
const moment = require("moment");
const jwt = require('jsonwebtoken');

const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const emailExist = await adminModel.findOne({ email });
        if (!emailExist) {
            return res.status(404).send({
                success: false,
                message: 'Email Not exist'
            });
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "savraraju49@gmail.com",
                pass: "rchiwvpmdkwlnwtk",
            },
        });
        const info = await transporter.sendMail({
            from: 'savraraju49@gmail.com',
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        return res.status(200).send({
            message: "Email is available",
            emailExist
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err
        });
    }
}

module.exports = {
    checkEmail
}