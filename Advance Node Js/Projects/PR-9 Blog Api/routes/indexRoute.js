const express = require('express');

const routes = express.Router();

routes.use('/user', require('../routes/userRoute'));
routes.use('/blog', require('../routes/blogRoute'));
routes.use('/comment', require('../routes/commentRoute'));
routes.use('/admin',require('./adminRoute'));

module.exports = routes;