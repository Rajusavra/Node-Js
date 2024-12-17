const express =  require('express');

const routes = express.Router();

const {addUser,addData} = require('../controllers/userController');

routes.get('/',addUser)
routes.post("/addData",addData)

module.exports = routes;
