const express = require('express');

const routes = express.Router();

const{addComment} = require('../controllers/commentController');

// routes.post('/addcomment',addComment);

module.exports = routes;