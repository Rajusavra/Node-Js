const express = require('express');

const routes = express.Router();

const { studentRegister, studentLogin, removeStudent, updateStudent, getStudentList } = require('../controllers/studentController');
const { Auth } = require('../middleware/Security');

const multer = require('multer');

const st = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'uploads')
    },
    filename : (req,file,cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
});

const fileUpload = multer({storage : st}).single('image');

routes.post('/',fileUpload,studentRegister);
routes.post('/login',studentLogin);
routes.delete('/delete',Auth,removeStudent);
routes.put('/update',fileUpload,Auth,updateStudent);
routes.get('/studentlist', Auth, getStudentList);

module.exports = routes;