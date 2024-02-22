var express = require('express')
var router = express.Router()
const userController = require('../controllers/api/user.controller')
const authController = require('../controllers/api/auth.controller')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { ServerResponse } = require('http')
const authMiddleware = require('../middlewares/api/auth.middleware')
const { User } = require('../models/index')
/* GET home page. */

// Users routes
router.get('/users', userController.index)
router.get('/users/:id', userController.find)
router.post('/users', userController.store)
router.patch('/users/:id', userController.update)
router.delete('/users/:id', userController.delete)

//

// Auth routes
router.post('/auth/login', authController.login)
router.get('/auth/profile', authMiddleware, authController.profile)
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
    session: false
  }),
  async (req, res) => {
    console.log(req.user)
    const user = await User.findOne({
      where: { email: req.user.emails[0].value }
    })
    const token = jwt.sign(
      {
        data: user.id
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
  }
)

module.exports = router
