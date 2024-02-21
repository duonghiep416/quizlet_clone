var express = require('express')
var router = express.Router()
const userController = require('../controllers/api/user.controller')
const authController = require('../controllers/api/auth.controller')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const ServerResponse = require('../utils/ServerResponse')
/* GET home page. */
router.get('/users', userController.index)
router.get('/users/:id', userController.find)
router.post('/users', userController.store)
router.patch('/users/:id', userController.update)
router.delete('/users/:id', userController.delete)
router.post('/auth/login', authController.login)
router.get('/auth/profile', authController.profile)
router.get('/auth/google/redirect', (req, res, next) => {
  const emptyResponse = new ServerResponse(req)
  passport.authenticate(
    'google',
    {
      scope: ['profile', 'email']
    },
    (err, user, info) => {
      console.log('user', user, 'info', info, 'err', err)
    }
  )(req, emptyResponse)
  console.log('emptyResponse', emptyResponse)
  const url = emptyResponse.getHeader('Location')
  console.log('url', url)
  return res.status(200).json({
    status: 200,
    message: 'Success',
    data: url
  })
})
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const token = jwt.sign(
        {
          id: req.user.id,
          email: req.user.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN
        }
      )
      return res.status(200).json({
        status: 200,
        message: 'Success',
        data: req.user,
        access_token: token
      })
    } else {
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized'
      })
    }
  }
)

module.exports = router
/*
 var express = require('express')
var router = express.Router()
const authController = require('../controllers/auth.controller')
const passport = require('passport')
router.get('/login', authController.login)
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
    failureFlash: true,
    successRedirect: '/'
  })
)

router.get('/logout', (req, res) => {
  req.logout(() => {})
  return res.redirect('/auth/login')
})

router.get('/google/redirect', passport.authenticate('google'))
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/login',
    failureFlash: true,
    successRedirect: '/'
  })
)

router.get('/forgot-password', authController.forgotPassword)
router.post('/forgot-password', authController.handleForgotPassword)
router.get('/reset-password/:token/:email', authController.resetPassword)
router.post('/reset-password/:token/:email', authController.handleResetPassword)

router.get('/register', authController.register)
module.exports = router
*/
