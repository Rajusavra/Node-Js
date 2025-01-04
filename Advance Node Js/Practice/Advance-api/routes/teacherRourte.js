const express = require('express');

const routes = express.Router();

const { teacherRegister,teacherLogin,removeTeacher,updateTeacher } = require('../controllers/teacherController');
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
})

const fileUpload = multer({storage : st}).single('image');

routes.post('/',fileUpload,teacherRegister);
routes.post('/login',teacherLogin);
routes.delete('/delete',Auth,removeTeacher);
routes.put('/update',fileUpload,Auth,updateTeacher);

module.exports = routes;