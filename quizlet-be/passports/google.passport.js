const GoogleStrategy = require('passport-google-oauth20')
const { User, Provider } = require('../models/index')
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
      await User.create({
        name: profile.displayName,
        email,
        avatar: profile.photos[0].value,
        password: null,
        status: true,
        provider_id: provider.id
      })
    } else if (user.provider_id === null) {
      return cb(null, false, {
        message: 'Bạn đã đăng ký tài khoản bằng email và mật khẩu'
      })
    }

    return cb(null, profile)
  }
)
