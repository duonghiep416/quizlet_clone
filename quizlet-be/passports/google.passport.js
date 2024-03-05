const GoogleStrategy = require('passport-google-oauth20')
const { User, Provider, Avatar, UserAvatar } = require('../models/index')
const { getFileChecksum } = require('../utils/checkDuplicateFile.utils')
const downloadImageAndSaveToLocal = require('../utils/downloadAndSaveImage')
const fs = require('fs')
module.exports = new GoogleStrategy(
  {
    clientID:
      '1002500978903-g9frgiuttqd7mch0fo6gc3qvlknutsik.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: `http://localhost:3001/auth/google/callback`,
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, cb) => {
    const email = profile.emails[0].value
    let provider = await Provider.findOne({
      where: {
        name: profile.provider
      }
    })
    if (!provider) {
      provider = await Provider.create({
        name: profile.provider
      })
    }
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      const path = await downloadImageAndSaveToLocal(
        profile.photos[0].value,
        './public/images/avatars/uploads'
      )
      const storedChecksum = getFileChecksum(path)
      const [newAvatar, created] = await Avatar.findOrCreate({
        where: {
          checksum: storedChecksum
        },
        defaults: {
          checksum: storedChecksum,
          image_url: path.slice(path.indexOf('/images')),
          type: 'google uploaded'
        }
      })
      if (!created) {
        fs.unlinkSync(path)
      }
      const newUser = await User.create({
        name: profile.displayName,
        email,
        password: null,
        status: true,
        provider_id: provider.id,
        avatar_id: newAvatar.id
      })
      await UserAvatar.create({
        user_id: newUser.id,
        avatar_id: newAvatar.id,
        is_avatar: true
      })
    } else if (user.provider_id === null) {
      return cb(null, false, {
        message: 'Bạn đã đăng ký tài khoản bằng email và mật khẩu'
      })
    }

    return cb(null, profile)
  }
)
/*
- Người dùng đăng nhập bằng email
 + Nếu chưa có user  -> Tải avatar user -> get checksum -> check xem có avatar nào trùng checksum không ? tạo mới UserAvatar, user : tạo mới avatar, Tạo mới user, userAvatar
  
*/
