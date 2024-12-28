const express = require('express');

const routes = express.Router();

const{addComment,viewComment,deleteComment} = require('../controllers/commentController');

routes.post('/addcomment',addComment);
routes.get('/viewcomment',viewComment);
routes.delete('/deletecomment/:id',deleteComment);

module.exports = routes;