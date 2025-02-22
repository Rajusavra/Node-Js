const express = require('express')
const router = express.Router()
const { showUser } = require('../controllers/users')
const { isLoggedIn } = require('../controllers/auth')

const isOwner = (req, res, next) => {
  if(req.user.username !== req.params.username) {
    return res.redirect('/')
  }
  next()
}

router.route('/:username')
  .get(isLoggedIn, isOwner, showUser)


  module.exports = router
