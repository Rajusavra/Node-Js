const express = require('express');

const routes = express.Router();

routes.use('/user', require('../routes/userRoute'));
routes.use('/', require('../routes/authRoute'));
routes.use('/blog', require('../routes/blogRoute'));

module.exports = routes;