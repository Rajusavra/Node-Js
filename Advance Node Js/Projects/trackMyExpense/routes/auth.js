const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')
const User = require('../models/users')
const passport = require('passport')

router.route('/register').get(auth.renderRegister).post(auth.registerUser)

router
  .route('/login')
  .get(auth.renderLogin)
  .post((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (!user) {
        req.flash('error', 'Username or password is incorrect')
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if(err) res.redirect('/login')
        next()
      })
      
    })(req, res, next)
  }, auth.loginUser)

router.get('/logout', auth.logout)

module.exports = router
