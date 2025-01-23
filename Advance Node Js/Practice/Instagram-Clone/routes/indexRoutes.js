const express = require('express');

const routes = express.Router();

const RgisterModel = require('../controllers/registercontroller');

const CreateModel = require('../controllers/createcontrollers');

const multer = require('multer');
const passport = require('passport');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const imageupload = multer({ storage: storage }).single('image');

routes.get('/register', RgisterModel.register);
routes.get('/', RgisterModel.login);
routes.post('/addUser', RgisterModel.addUser);
routes.post('/loginUser', passport.authenticate('local', { failureRedirect: '/' }), RgisterModel.loginUser);
routes.get('/create', RgisterModel.create);
routes.get('/dashbord', passport.checkUser, CreateModel.dashbord);
routes.post('/createUser', imageupload, CreateModel.createUser);
routes.get('/logout', CreateModel.logout);
routes.get('/delteRecord', CreateModel.delteRecord);
routes.get('/editRecord', CreateModel.editRecord);
routes.get('/profile', CreateModel.profile);
routes.post('/updateUser', imageupload, CreateModel.updateUser);

//like
routes.get('/postLike/:id', CreateModel.postLike)
routes.get('/postUnLike/:id', CreateModel.postUnLike)


module.exports = routes;