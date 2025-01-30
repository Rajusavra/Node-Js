const Teacher = require('../models/teacherModel');
const Student = require('../models/studentModel');
const bcrypt = require('bcryptjs');

const teacherRegister = async (req, res) => {
    try {
        const { name, email, phone, salary } = req.body;
        const image = req.file.path;

        const teacher = new Teacher({ name, email, phone, image, salary });
        await teacher.save();

        res.status(201).send({ success: true, message: 'Teacher registered successfully.', teacher });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

const teacherLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const teacher = await Teacher.findOne({ email });

        if (!teacher || !(await bcrypt.compare(password, teacher.password))) {
            return res.status(400).send({ success: false, message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: teacher._id, role: 'teacher' }, "sparky", { expiresIn: '1h' });
        res.status(200).send({ success: true, token });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

const removeTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.user.id);
        if (!teacher) {
            return res.status(404).send({ success: false, message: 'Teacher not found.' });
        }

        // Remove teacher reference from students
        await Student.updateMany({ teacher: teacher._id }, { $unset: { teacher: 1 } });

        res.status(200).send({ success: true, message: 'Teacher deleted successfully.' });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

const updateTeacher = async (req, res) => {
    try {
        const updates = req.body;
        if (req.file) updates.image = req.file.path;

        const teacher = await Teacher.findByIdAndUpdate(req.user.id, updates, { new: true });
        res.status(200).send({ success: true, message: 'Teacher updated successfully.', teacher });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

const getTeacherList = async (req, res) => {
    try {
        const teachers = await Teacher.find({}).populate('students', 'name email');
        res.status(200).send({ success: true, message: 'Teacher List', teachers });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

module.exports = { teacherRegister, teacherLogin, removeTeacher, updateTeacher, getTeacherList };