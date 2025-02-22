const express = require('express')
const router = express.Router()
const {expense, deleteExpense} = require('../controllers/expense')

router.route('/expense')
 .post(expense)
 
router.delete('/expense/:id', deleteExpense)



 module.exports = router