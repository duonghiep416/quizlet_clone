const multer = require('multer')
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
module.exports = {
  multerMiddleware: (req, res, next) => {
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
  }
}
