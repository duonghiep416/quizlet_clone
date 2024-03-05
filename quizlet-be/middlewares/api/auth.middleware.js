const jwt = require('jsonwebtoken')
const { User, BlacklistToken, Avatar } = require('../../models/index')
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
          },
          include: [
            {
              model: Avatar,
              as: 'avatar',
              attributes: ['image_url']
            }
          ]
        },
        {
          attributes: { exclude: 'password' }
        }
      )
      if (!user) {
        throw new Error('User Not Found')
      }
      const newUser = {
        ...user.dataValues,
        avatar: user.dataValues.avatar.dataValues.image_url
      }
      req.user = {
        ...newUser,
        accessToken: token
      }
      return next()
    } catch (e) {
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
