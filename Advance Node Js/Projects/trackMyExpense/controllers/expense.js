const User = require('../models/users')
const Expense = require('../models/expenses')

module.exports.expense = async (req, res) => {
  const { name, amount, tags } = req.body
  let newTags = tags.split(' ')
  newTags = newTags.map((tag) => tag.toLowerCase())
  const expense = {
    name,
    amount,
    tags: newTags,
    date: new Date(),
  }
  const user = await User.findById(req.user.id)
  const newExpense = new Expense(expense)
  user.expenses.push(newExpense)
  user.balance -= expense.amount
  user.totalExpense += parseInt(expense.amount)
  await user.save()
  await newExpense.save()
  req.flash('success', 'Expense Added Successfully')
  res.redirect(`/${user.username}`)
}

module.exports.deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id)
  const user = await User.findByIdAndUpdate(req.user.id, { $pull: { expenses: req.params.id} })
  user.balance += expense.amount
  user.totalExpense -= expense.amount
  user.save()
  expense.delete()
  req.flash('success', 'Expense Deleted Successfully')
  res.redirect(`/${req.user.username}`)
}