var express = require('express')
var router = express.Router()

//Controllers
const userController = require('../controllers/api/user.controller')
const authController = require('../controllers/api/auth.controller')
const courseController = require('../controllers/api/course.controller')
const avatarController = require('../controllers/api/avatar.controller')
const categoryController = require('../controllers/api/category.controller')
const flashcardController = require('../controllers/api/flashcard.controller')
const roleController = require('../controllers/api/role.controller')

//Middlewares
const authMiddleware = require('../middlewares/api/auth.middleware')
const { multerMiddleware } = require('../utils/multer.utils')

const passport = require('passport')
const jwt = require('jsonwebtoken')
const { ServerResponse } = require('http')
const { User } = require('../models/index')

/* GET home page. */

// Users routes
router.get('/users', userController.index)
router.get('/users/:id', userController.find)
router.post('/users', userController.store)
router.patch('/users/:id', userController.update)
router.delete('/users/:id', userController.delete)

// Auth routes
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.post('/auth/logout', authMiddleware, authController.logout)

//Profile routes
router.get('/profile', authMiddleware, authController.profile)
// router.post('/profile')

// Google Auth routes
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

// Avatar

router.get('/avatars', authMiddleware, avatarController.getAvatars)
router.post(
  '/avatars/upload',
  authMiddleware,
  multerMiddleware,
  avatarController.postAvatar
)

router.patch(
  '/avatars/:avatarId',
  authMiddleware,
  avatarController.updateAvatar
)

// Courses - Sets of flashcards
router.get('/courses', authMiddleware, courseController.getCourses)
router.get('/courses/:id', authMiddleware, courseController.getCourse)
router.post('/courses', authMiddleware, courseController.postCourse)
router.patch('/courses/:id', authMiddleware, courseController.updateCourse)
router.delete('/courses/:id', authMiddleware, courseController.deleteCourse)

// Categories
router.get('/categories', authMiddleware, categoryController.getCategories)
router.get('/categories/:id', authMiddleware, categoryController.getCategory)
router.post('/category', authMiddleware, categoryController.postCategory)

// Check password courses, categories
router.post(
  '/check-password/:id',
  authMiddleware,
  courseController.checkPassword
)

// Flashcards
router.patch(
  '/flashcards/:id',
  authMiddleware,
  flashcardController.editFlashcard
)

// Role
router.get('/roles', roleController.getRole)

module.exports = router
