var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')
/* GET home page. */
router.get('/', function (req, res, next) {
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
})

module.exports = router
