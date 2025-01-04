const teacherModel = require('../models/teacherModel');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs')

const teacherRegister = async (req, res) => {
    try {

        const { name, email, phone, fees } = req.body;
        if (!name || !email || !phone || !fees || !req.file) {
            return res.status(500).send({
                success: false,
                message: "All filed are required",
            });
        }
        const existTeacher = await teacherModel.findOne({ email: email });
        if (!existTeacher) {
            const teacher = await teacherModel.create({
                name: name,
                email: email,
                phone: phone,
                image: req.file.path,
                fees: fees,
            });
            return res.status(200).send({
                success: true,
                message: 'Teacher registered successfully',
                teacher
            });
        } else {
            return res.status(500).send({
                success: false,
                message: "Faculty Already Exist !!... Try to login",
            });
        }


    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message
        });
    }
}

const teacherLogin = async (req, res) => {
    try {
        const { email, phone } = req.body;
        const teacher = await teacherModel.findOne({ email: email });
        if (!teacher) {
            return res.status(404).send({
                success: false,
                message: "teacher Not Found !!... Try to Register",
            });
        } else {
            if (teacher.phone != phone) {
                return res.status(400).send({
                    success: false,
                    message: "Wrong phone !!... Try to Login Again",
                });
            } else {
                let token = jwt.sign({ teacherToken: teacher }, 'Sparky', { expiresIn: '1h' });

                return res.status(200).send({
                    success: true,
                    message: "teacher Login Successfull",
                    teacherToken: token
                });
            }
        }
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        });
    }
};

const removeTeacher = async (req, res) => {
    try {
        const id = req.query.id;
        let teacher = await teacherModel.findById(id);
        fs.unlinkSync(teacher.image);

        let delTeacher = await teacherModel.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: 'Faculty removed Successfully',
            delTeacher
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message
        });
    }
}

const updateTeacher = async (req, res) => {
    try {
        const id = req.query.id;
        const { name, email, phone, fees } = req.body;

        if (!name || !email || !phone || !fees || !req.file) {
            return res.status(500).send({
                success: false,
                message: "All fileds are required",
            });
        }
        let teacher = await teacherModel.findById(id);
        if (!teacher) {
            return res.status(404).send({
                success: false,
                message: "Teacher not found",
            });
        }
        fs.unlinkSync(teacher.image);
        let upTeacher = await teacherModel.findByIdAndUpdate(id, {
            name: name,
            email: email,
            phone: phone,
            image: req.file.path,
            fees: fees,
        });
        return res.status(200).send({
            success: true,
            message: "faculty Details Updated Successfully",
            upTeacher,
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    teacherRegister,
    teacherLogin,
    removeTeacher,
    updateTeacher
}