const Student = require('../models/studentModel');
const Teacher  = require('../models/teacherModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const studentRegister = async (req, res) => {
    try {
        const { name, email, phone, fees, teacherId } = req.body;
        const image = req.file.path;

        const student = new Student({ name, email, phone, image, fees, teacher: teacherId });
        await student.save();

        // Add student to teacher's students list
        await Teacher.findByIdAndUpdate(teacherId, { $push: { students: student._id } });

        res.status(201).send({ success: true, message: 'Student registered successfully.', student });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

const studentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });

        if (!student || !(await bcrypt.compare(password, student.password))) {
            return res.status(400).send({ success: false, message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: student._id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ success: true, token });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

const removeStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.user.id);
        if (!student) {
            return res.status(404).send({ success: false, message: 'Student not found.' });
        }

        // Remove student from teacher's students list
        await Teacher.findByIdAndUpdate(student.teacher, { $pull: { students: student._id } });

        res.status(200).send({ success: true, message: 'Student deleted successfully.' });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const updates = req.body;
        if (req.file) updates.image = req.file.path;

        const student = await Student.findByIdAndUpdate(req.user.id, updates, { new: true });
        res.status(200).send({ success: true, message: 'Student updated successfully.', student });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

const getStudentList = async (req, res) => {
    try {
        const students = await Student.find({}).populate('teacher', 'name email');
        res.status(200).send({ success: true, message: 'Student List', students });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

module.exports = { studentRegister, studentLogin, removeStudent, updateStudent, getStudentList };