var mime = require('mime-types')
const generateAvatarName = (mimetype) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
  return `${uniqueSuffix}.${mime.extension(mimetype)}`
}
module.exports = {
  uploadAvatar: {
    destination: 'public/images/avatars/uploads/',
    name: generateAvatarName,
    allowedTypes: ['image/jpeg', 'image/png'],
    fileSize: 1024 * 1024 * 2 // 2MB
  }
}
