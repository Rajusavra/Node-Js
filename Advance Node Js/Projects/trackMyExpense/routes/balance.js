const express = require('express')
const router = express.Router()
const balance = require('../controllers/balance')

const { isLoggedIn } = require('../controllers/auth')

router.route('/balance')
  .get(isLoggedIn, balance.renderBalanceForm)
  .post(isLoggedIn, balance.updateBalance)
module.exports = router