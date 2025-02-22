const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
  name: {
    type: String,
  },
  amount: {
    type: Number,
    minimum: 0,
    default: 0,
  },
  tags: {
    type: [String],
  },
  date: {
    type: Date,
  },
})


module.exports = mongoose.model('Expense', expenseSchema)