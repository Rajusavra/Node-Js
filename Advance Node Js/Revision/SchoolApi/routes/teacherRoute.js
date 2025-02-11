const express = require('express');

const routes = express.Router();

const { teacherRegister, removeTeacher, updateTeacher, getTeacherList } = require('../controllers/teacherController');
const { Auth } = require('../middlewares/Security');
const fileUpload = require('../middlewares/upload');

routes.post('/register', fileUpload, teacherRegister);
routes.put('/:id', Auth, fileUpload, updateTeacher);
routes.delete('/:id', Auth, removeTeacher);
routes.get('/list', Auth, getTeacherList);


module.exports = routes;