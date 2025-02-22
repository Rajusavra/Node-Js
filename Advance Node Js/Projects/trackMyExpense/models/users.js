const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  registrationDate: {
    type: Date,
  },
  balance: {
    type: Number,
    default: 1000,
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
    },
  ],
  totalExpense: {
    type: Number,
    minimum: 0,
    default: 0,
  },
})

userSchema.virtual('firstName').get(function () {
  return this.name.split(' ')[0]
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)
