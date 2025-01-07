const studentModel = require('../models/studentModel');
const teacherModel = require('../models/teacherModel');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs')

const studentRegister = async (req, res) => {
    try {

        const { name, email, phone, fees, rating } = req.body;
        if (!name || !email || !phone || !fees || !rating || !req.file) {
            return res.status(500).send({
                success: false,
                message: "All filed are required",
            });
        }
        const existStudent = await studentModel.findOne({ email: email });
        if (!existStudent) {
            const student = await studentModel.create({
                name: name,
                email: email,
                phone: phone,
                image: req.file.path,
                fees: fees,
                rating: rating,
            });
            return res.status(200).send({
                success: true,
                message: 'student registered successfully',
                student
            });
        } else {
            return res.status(500).send({
                success: false,
                message: "Student Already Exist !!... Try to login",
            });
        }


    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message
        });
    }
}

const studentLogin = async (req, res) => {
    try {
        const { email, phone } = req.body;
        const student = await studentModel.findOne({ email: email });
        if (!student) {
            return res.status(404).send({
                success: false,
                message: "student Not Found !!... Try to Register",
            });
        } else {
            if (student.phone != phone) {
                return res.status(400).send({
                    success: false,
                    message: "Wrong phone !!... Try to Login Again",
                });
            } else {
                let token = jwt.sign({ studentToken: student }, 'Sparky', { expiresIn: '1h' });

                return res.status(200).send({
                    success: true,
                    message: "student Login Successfull",
                    studentToken: token
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

const removeStudent = async (req, res) => {
    try {
        const id = req.query.id;
        let student = await studentModel.findById(id);
        fs.unlinkSync(student.image);

        let delStudent = await studentModel.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: 'Student removed Successfully',
            delStudent
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message
        });
    }
}

const updateStudent = async (req, res) => {
    try {
        const id = req.query.id;
        const { name, email, phone, fees, rating } = req.body;

        if (!name || !email || !phone || !fees || !rating || !req.file) {
            return res.status(500).send({
                success: false,
                message: "All fileds are required",
            });
        }
        let student = await studentModel.findById(id);
        if (!student) {
            return res.status(404).send({
                success: false,
                message: "student not found",
            });
        }
        fs.unlinkSync(student.image);
        let upStudent = await studentModel.findByIdAndUpdate(id, {
            name: name,
            email: email,
            phone: phone,
            image: req.file.path,
            fees: fees,
            rating: rating
        });
        return res.status(200).send({
            success: true,
            message: "Student Details Updated Successfully",
            upStudent,
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message
        });
    }
}

const getStudentList = async (req, res) => {
    try {
        const Students = await studentModel.find({})
            .populate('teacher', 'name email');
        return res.status(200).send({
            success: true,
            message: "Student List",
            Students
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    studentRegister,
    studentLogin,
    removeStudent,
    updateStudent,
    getStudentList
}