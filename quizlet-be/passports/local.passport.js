const { User } = require('../models/index')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const passportLocal = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      return done(null, false, { message: 'Email không tồn tại' })
    }
    if (user.provider_id !== null) {
      return done(null, false, {
        message: 'Bạn đã đăng ký tài khoản bằng hình thức khác'
      })
    }
    const passwordHash = user.password
    const result = bcrypt.compareSync(password, passwordHash)
    if (result) {
      return done(null, user) // Lưu user vào session
    }

    done(null, false, { message: 'Mật khẩu không chính xác' })
  }
)
module.exports = passportLocal
