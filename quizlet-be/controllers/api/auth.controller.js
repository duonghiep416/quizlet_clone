var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User, BlacklistToken } = require('../../models')
module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body
    const response = {}
    if (!email || !password) {
      Object.assign(response, {
        status: 400,
        error: 'Email and password are required',
        message: 'Bad request'
      })
    } else {
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (!user) {
        Object.assign(response, {
          status: 400,
          error: 'Email hoặc mật khẩu không chính xác',
          message: 'Bad request'
        })
      } else if (!user.provider_id) {
        const { password: hash } = user
        const result = bcrypt.compareSync(password, hash)
        if (!result) {
          Object.assign(response, {
            status: 400,
            error: 'Email hoặc mật khẩu không chính xác',
            message: 'Bad request'
          })
        } else {
          const payload = {
            data: user.id
          }
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
          })
          req.user = user
          Object.assign(response, {
            status: 200,
            message: 'Success',
            access_token: token
          })
        }
      } else {
        Object.assign(response, {
          status: 400,
          error: 'Tài khoản này đã được đăng ký bằng Google',
          message: 'Bad request'
        })
      }
    }
    res.status(response.status).json(response)
  },
  register: async (req, res) => {
    const { name, email, password, avatar } = req.body
    const response = {}
    if (!name || !email || !password || !avatar) {
      Object.assign(response, {
        status: 400,
        error: 'Name, email and password are required',
        message: 'Bad request'
      })
    } else {
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (user) {
        Object.assign(response, {
          status: 400,
          error: 'Email đã tồn tại',
          message: 'Bad request'
        })
      } else {
        const hash = bcrypt.hashSync(password, 10)
        const newUser = await User.create({
          name,
          email,
          status: true,
          password: hash,
          avatar
        })
        Object.assign(response, {
          status: 200,
          message: 'Success',
          data: newUser
        })
      }
    }
    res.status(response.status).json(response)
  },
  logout: async (req, res) => {
    const bearer = req.get('Authorization')
    const token = bearer.replace('Bearer', '').trim()
    await BlacklistToken.findOrCreate({
      where: {
        token
      }
    })
    res.json({
      status: 200,
      message: 'Success'
    })
  },
  profile: async (req, res) => {
    res.json({
      status: 200,
      message: 'Success',
      data: {
        ...req.user.dataValues,
        password: null
      }
    })
  }
}
