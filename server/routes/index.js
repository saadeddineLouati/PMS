const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const User = require('../models/User')

router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user,
  })
})

router.get('/user/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then((u) => {
      res.json(u)
    })
    .catch(err => next(err))
})
module.exports = router
