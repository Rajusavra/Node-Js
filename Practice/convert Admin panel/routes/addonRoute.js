const express = require('express');

const routes = express.Router();

const {dashPage,galaryPage,calenderPage,invoicePage,chatPage}  = require('../controllers/addonsController');

routes.get('/dash',dashPage);
routes.get('/galary',galaryPage);
routes.get('/calender',calenderPage);
routes.get('/invoice',invoicePage);
routes.get('/chat',chatPage);

module.exports = routes;