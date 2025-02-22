const User = require('../models/users')

module.exports.renderRegister = (req, res) => {
  res.render('register')
}

module.exports.renderLogin = (req, res) => {
  res.render('login')
}

module.exports.registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body
    const newUser = new User({
      name,
      email,
      username: username.toLowerCase(),
      registrationDate: new Date(),
    })
    const registeredUser = await User.register(newUser, password)
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err)
      }
      req.flash('success', 'Welcome to TrackMyExpense')
      res.redirect(`/${newUser.username}`)
    })
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('/register')
  }
}

module.exports.loginUser = (req, res) => {
  const { username } = req.body
  req.flash('success', 'Welcome Back')
  const returnUrl = req.session.returnTo || username || '/'
  delete req.session.returnTo
  res.redirect(returnUrl)
}

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl
    req.flash('error', 'You must be logged in')
    return res.redirect('/login')
  }
  next()
}

module.exports.logout = (req, res) => {
  req.logout()
  req.flash('success', 'You have been successfully logged out')
  res.redirect('/')
}
