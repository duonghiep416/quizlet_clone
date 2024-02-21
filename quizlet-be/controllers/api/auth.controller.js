var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../../models')
module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body
    const response = {}
    const error = ''
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
      } else {
        const { password: hash } = user
        const result = bcrypt.compareSync(password, hash)
        if (!result) {
          Object.assign(response, {
            status: 400,
            error: 'Email hoặc mật khẩu không chín xác',
            message: 'Bad request'
          })
        } else {
          const payload = {
            id: user.id,
            email: user.email
          }
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
          })
          Object.assign(response, {
            status: 200,
            message: 'Success',
            access_token: token
          })
        }
      }
    }
    res.status(response.status).json(response)
  },
  profile: async (req, res) => {
    const bearer = req.get('Authorization')
    const response = {}
    if (bearer) {
      const token = bearer.replace('Bearer ', '').trim()
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id } = decoded
        const user = await User.findByPk(id)
        delete user.dataValues.password
        Object.assign(response, {
          status: 200,
          message: 'Success',
          data: user
        })
      } catch (error) {
        Object.assign(response, {
          status: 401,
          message: 'Unauthorized'
        })
      }
    }
    res.json(response)
  }
}
