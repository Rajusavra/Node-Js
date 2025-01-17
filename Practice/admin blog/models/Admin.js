
const multer = require('multer');

const path = require('path');

const mongoose = require('mongoose');

const imagePath = '/uploads/AdminImages'

const AdminSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    avatar : {
        type: String,
        required: true
    },
})

const adminStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, path.join(__dirname,'..',imagePath));
    },
    filename : (req,file,cb)=>{
        cb(null, file.fieldname+"-"+Date.now())
    }
})

AdminSchema.statics.uploadAdminImage = multer({storage:adminStorage}).single('avatar');

AdminSchema.statics.adPath = imagePath;

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin; 