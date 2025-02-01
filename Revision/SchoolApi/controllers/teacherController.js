const Teacher = require('../models/teacherModel');
const Student = require('../models/teacherModel');
const fileUpload = require('../middlewares/upload');
const jwt = require("jsonwebtoken");

exports.teacherRegister = async (req, res) => {
  try {
    const { name, email, phone, fees } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const teacher = await Teacher.create({
      name,
      email,
      phone,
      profileImage,
      fees,
    });

    const token = jwt.sign(
      { id: teacher._id, email: teacher.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ success: true, data: teacher, token });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


exports.updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, fees } = req.body;
        const profileImage = req.file ? req.file.path : null;

        const teacher = await Teacher.findByIdAndUpdate(
            id,
            { name, email, phone, profileImage, fees },
            { new: true }
        );

        res.status(200).json({ success: true, data: teacher });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.removeTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        await Teacher.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Teacher deleted' });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getTeacherList = async (req, res) => {
    try {
        const { studentName, teacherName } = req.query;

        const teachers = await Teacher.find({
            name: { $regex: teacherName || '', $options: 'i' },
        }).populate({
            path: 'students',
            match: { name: { $regex: studentName || '', $options: 'i' }, fees: { $gt: 10000 } },
        });

        const filteredTeachers = teachers.filter(
            (teacher) => teacher.students && teacher.students.length >= 5
        );

        res.status(200).json({ success: true, data: filteredTeachers });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};