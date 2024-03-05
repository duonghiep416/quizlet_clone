var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User, BlacklistToken, Avatar, UserAvatar } = require('../../models')
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
        },
        include: [
          {
            model: Avatar,
            as: 'avatar',
            attributes: ['image_url']
          }
        ]
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
          const newUser = {
            ...user.dataValues,
            avatar: user.dataValues.avatar.dataValues.image_url
          }
          req.user = newUser

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
    const { name, email, password } = req.body
    const response = {}
    if (!name || !email || !password) {
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
        const userAvatarDataCreate = []

        const newUser = await User.create({
          name,
          email,
          status: true,
          password: hash,
          avatar_id: 5
        })
        for (let i = 2; i <= 11; i++) {
          userAvatarDataCreate.push({
            user_id: newUser.id,
            avatar_id: i,
            is_avatar: i === 5
          })
        }
        await UserAvatar.bulkCreate(userAvatarDataCreate)
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
        ...req.user,
        password: null
      }
    })
  }
}
