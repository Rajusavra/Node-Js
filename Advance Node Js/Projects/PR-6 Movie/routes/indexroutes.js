
const express=require('express')

const routes=express.Router()

const { addpage, viewpage, adddata, deletedata, edit, up, update } = require('../controllers/controllers')

const multer=require('multer')
const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const uniq = Math.floor(Math.random() * 100000000);
        cb(null, `${file.fieldname}-${uniq}`);
    }
})
  
  const upload = multer({ storage: st }).single('image')

routes.get('/',addpage)
routes.get('/views',viewpage)
routes.post('/insert',upload ,adddata)
routes.get('/delete',deletedata)
routes.get('/edit',edit)
// routes.post('/update',upload,up)

routes.post('/update',upload,update)
module.exports=routes
