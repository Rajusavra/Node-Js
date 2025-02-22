const express = require('express')
const router = express.Router()
const User = require('../models/users')

router.get('/:username/search', async (req, res) => {
  const { id } = req.user
  const tag = req.query.tag.toLowerCase()
  const user = await User.findById(id).populate('expenses')
  const expenses = user.expenses
  const filteredExpense = expenses.filter((expense) => {
    return expense.tags.includes(tag)
  })
  user.expenses = filteredExpense
  let totalExpense = 0
  filteredExpense.forEach((expense) => {
    totalExpense += expense.amount
  })
  user.totalExpense = totalExpense
  res.render('show', {user, tag})
})

module.exports = router

