const express = require('express');

const routes = express.Router();
const {createUser,getAllUsers,getUserById,updateUser,deleteUser} = require('../controllers/userController')

routes.post('/',createUser);
routes.get('/',getAllUsers);
routes.get('/:id',getUserById);
routes.put('/:id',updateUser);
routes.delete('/:id',deleteUser);

module.exports = routes;