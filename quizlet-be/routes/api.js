var express = require('express')
var router = express.Router()
const userController = require('../controllers/api/user.controller')
const authController = require('../controllers/api/auth.controller')
const courseController = require('../controllers/api/course.controller')
const avatarController = require('../controllers/api/avatar.controller')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { ServerResponse } = require('http')
const authMiddleware = require('../middlewares/api/auth.middleware')
const { User } = require('../models/index')
const multer = require('multer')

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

// Courses - Sets of flashcards
router.get('/courses', authMiddleware, courseController.getCourses)

// Avatar

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/avatars/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      (file.fieldname + '-' + uniqueSuffix + '-' + file.originalname).replace(
        ' ',
        '-'
      )
    )
  }
})
function fileFilter(req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png'] // Danh sách các định dạng được phép
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true) // Cho phép upload
  } else {
    const error = new Error('Định dạng file không hợp lệ')
    error.status = 400
    cb(error, false) // Từ chối upload
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2 // 2MB
  }
})

router.get('/avatars', authMiddleware, avatarController.getAvatars)
router.post(
  '/avatars/upload',
  authMiddleware,
  (req, res, next) => {
    // Xử lý lỗi nếu có
    upload.single('avatar')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Lỗi từ multer
        return res
          .status(400)
          .json({ error: 'Lỗi từ Multer', message: err.message })
      } else if (err) {
        // Lỗi từ fileFilter
        return res
          .status(400)
          .json({ error: 'Lỗi xử lý file', message: err.message })
      }
      // Nếu không có lỗi, tiếp tục middleware tiếp theo
      next()
    })
  },
  avatarController.postAvatar
)

router.patch(
  '/avatars/:avatarId',
  authMiddleware,
  avatarController.updateAvatar
)
module.exports = router
