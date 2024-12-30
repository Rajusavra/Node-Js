const express = require('express');

const routes = express.Router();

const { blogDetails,commentDetails} = require('../controllers/adminController');

const { verifyToken, Admin } = require('../middleware/Auth');

routes.get('/blogdetail',verifyToken,Admin,blogDetails);
routes.get('/commentdetail',verifyToken,Admin,commentDetails);

module.exports = routes;