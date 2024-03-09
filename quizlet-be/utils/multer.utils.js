const multer = require('multer')
const { uploadAvatar: avatarConfig } = require('../config/uploadFile.config')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, avatarConfig.destination)
  },
  filename: function (req, file, cb) {
    cb(null, avatarConfig.name(file.mimetype))
  }
})
function fileFilter(req, file, cb) {
  const allowedTypes = avatarConfig.allowedTypes // Danh sách các định dạng được phép
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
    fileSize: avatarConfig.fileSize
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
      next()
    })
  }
}
