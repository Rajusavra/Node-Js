// routes/studentRoutes.js
const express = require('express');
const routes = express.Router();
const { studentRegister, removeStudent, updateStudent, getStudentList } = require('../controllers/studentController');
const { Auth } = require('../middlewares/Security');
const fileUpload = require('../middlewares/upload');

routes.post('/register', fileUpload, studentRegister);
routes.put('/:id', Auth, fileUpload, updateStudent);
routes.delete('/:id', Auth, removeStudent);
routes.get('/list', Auth, getStudentList);

module.exports = routes;