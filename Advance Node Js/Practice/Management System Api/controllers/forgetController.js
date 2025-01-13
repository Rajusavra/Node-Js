const adminModel = require("../models/adminModel");
const fs = require("fs");
const moment = require("moment");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
        const otp = Math.round(Math.random() * 100000);
        res.cookie("Otp", otp);
        res.cookie("Email",email);
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
            to: email,
            subject: "Hello 🦍🦍🦍🦍🦍",
            text: "OTP De de Bhagat",
            html: `<b>Bhagat No OTP :  ${otp}</b>`,
        });
        if (!info) {
            return res.status(404).send({
                success: false,
                message: 'OTP not sent',
            });
        }
        return res.status(200).send({
            success: true,
            message: 'OTP sent to your email',
            emailExist,
            otp
        });

    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err
        });
    }
}

const checkOtp = async (req,res) => {
    try {
        let otp = req.headers.cookie;
        let postOtp = otp.slice(4,otp.length);
        if (req.body.otp !== postOtp) {    
            return res.status(200).send({
                success: true,
                message: "OTP Not match",
                postOtp
            });
        }
        return res.status(200).send({
            success: true,
            message: "OTP match SuccessFully",
            postOtp
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err
        });
    }
}

module.exports = {
    checkEmail,
    checkOtp,
}