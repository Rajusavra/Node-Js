const express =  require('express');

const routes = express.Router();

const {addUser,viewUser,deleteUser,updateUser} = require('../controllers/userController');
const { verifyToken,Admin } = require('../middleware/Auth');

routes.post('/adduser',addUser);
routes.get('/viewuser',verifyToken,viewUser);
routes.delete('/deleteuser/:id',verifyToken,Admin,deleteUser);
routes.put('/updateuser/:id',verifyToken,Admin,updateUser);

module.exports = routes;
