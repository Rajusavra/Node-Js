const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const fileUpload = require('../middlewares/upload');
const jwt = require("jsonwebtoken");

exports.studentRegister = async (req, res) => {
  try {
    const { name, email, phone, fees, teacherId } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const student = await Student.create({
      name,
      email,
      phone,
      profileImage,
      fees,
      teacherId,
    });

    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({ success: true, data: student, token });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, fees, teacherId } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const student = await Student.findByIdAndUpdate(
      id,
      { name, email, phone, profileImage, fees, teacherId },
      { new: true }
    );

    res.status(200).json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.removeStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Student deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getStudentList = async (req, res) => {
  try {
    const { studentName, teacherName } = req.query;

    const students = await Student.find({
      name: { $regex: studentName || '', $options: 'i' },
    }).populate({
      path: 'teacherId',
      match: { name: { $regex: teacherName || '', $options: 'i' } },
    });

    res.status(200).json({ success: true, data: students });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};