const express =  require('express');

const routes = express.Router();

const {addUser,viewUser,deleteUser,updateUser} = require('../controllers/userController');

routes.post('/adduser',addUser);
routes.get('/viewuser',viewUser);
routes.delete('/deleteuser/:id',deleteUser);
routes.put('/updateuser/:id',updateUser);

module.exports = routes;
