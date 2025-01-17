const express = require("express");

const routes = express.Router();

const {indexPage}  = require('../controllers/indexController');

routes.get('/',indexPage);

routes.use(('/chart'),require('./chartRoute'));
routes.use(('/widgets'),require('./widgetsRoute'));
routes.use(('/tables'),require('./tableRoute'));
routes.use(('/grid'),require('./gridRoute'));
routes.use(('/form-basic'),require('./form-basicRoute'));
routes.use(('/form-wizard'),require('./form-wizardRoute'));
routes.use(('/buttons'),require('./buttonsRoute'));
routes.use(('/material'),require('./materialRoute'));
routes.use(('/font'),require('./fontRoute'));
routes.use(('/elements'),require('./elementsRoute'));
routes.use(('/'),require('./addonRoute'));

module.exports = routes ;