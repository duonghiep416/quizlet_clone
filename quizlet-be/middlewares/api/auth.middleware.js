const jwt = require('jsonwebtoken')
const { User, BlacklistToken } = require('../../models/index')
module.exports = async (req, res, next) => {
  const bearer = req.get('Authorization')
  const response = {}
  if (bearer) {
    const token = bearer.replace('Bearer', '').trim()
    const { JWT_SECRET } = process.env
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      const blacklist = await BlacklistToken.findOne({
        where: {
          token
        }
      })
      if (blacklist) {
        throw new Error('Token blacklist')
      }
      const { data: userId } = decoded
      const user = await User.findOne(
        {
          where: {
            id: userId,
            status: true
          }
        },
        {
          attributes: { exclude: 'password' }
        }
      )
      if (!user) {
        throw new Error('User Not Found')
      }
      req.user = {
        ...user,
        accessToken: token
      }

      return next()
    } catch (e) {
      console.log(e)
      Object.assign(response, {
        status: 401,
        message: 'Unauthorized'
      })
    }
  } else {
    Object.assign(response, {
      status: 401,
      message: 'Unauthorized'
    })
  }
  return res.status(response.status).json(response)
}
