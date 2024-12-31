const express = require('express');

const routes = express.Router();

const { blogDetails,commentDetails} = require('../controllers/adminController');

const { verifyToken, Admin } = require('../middleware/Auth');

routes.get('/allblogshow',verifyToken,Admin,blogDetails);
routes.get('/allcommentshow',verifyToken,Admin,commentDetails);

module.exports = routes;