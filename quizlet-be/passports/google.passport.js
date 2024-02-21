const GoogleStrategy = require('passport-google-oauth20')
const { User, Provider } = require('../models/index')
module.exports = new GoogleStrategy(
  {
    clientID:
      '1002500978903-g9frgiuttqd7mch0fo6gc3qvlknutsik.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: `http://localhost:3001/auth/google/callback`,
    scope: ['profile', 'email'],
    state: true
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
        password: null,
        status: true,
        provider_id: provider.id
      })
    } else if (user.provider_id === null) {
      return cb(null, false, {
        message: 'Bạn đã đăng ký tài khoản bằng email và mật khẩu'
      })
    }
    //Logic lấy thông tin user từ database
    //Thêm user vào database nếu chưa có
    //Chú ý khi kiểm tra: provider và email
    return cb(null, profile)
  }
)
//Ý t là đoạn chuyển sang trang gg để login á
// Cái link redirect à
//đr b, đây b đag show là link callback
// Cái link redirect có trả về client mà mình đang test đoạn sau á nghĩa là đang bỏ qua bước đó làm sau
//Sai r b ơi, b có xem đoạn lấy url redirect hôm trước a an gửi trong nhóm k, phải lấy kiểu đó r trả về client redirect, vs là do ban đầu b redirect ở server sau lại lấy client call, 2 host nó khác nhau, thì nó báo lỗi 403 á(không có quyền ). Hiện tại b làm vẫn là redirect ở server, b xem cái ảnh hôm a an gửi trong nhóm á
// À để mình thử lại xem rồi có gì báo b sau nhé
//oke b có j nt t nha, h t out nha
// okeee
