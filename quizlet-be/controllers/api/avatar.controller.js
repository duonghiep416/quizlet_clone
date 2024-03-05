const { Op } = require('sequelize')
const { Avatar, UserAvatar, User } = require('../../models')
const { getFileChecksum } = require('../../utils/checkDuplicateFile.utils')
const fs = require('fs')
module.exports = {
  getAvatars: async (req, res) => {
    const user = req.user
    const { id } = user
    const response = {}
    try {
      const avatars = await UserAvatar.findAll({
        where: {
          user_id: id
        }
      })
      console.log(avatars)
      const avatarIds = avatars.map((avatar) => avatar.avatar_id)
      const avatarsData = await Avatar.findAll({
        where: {
          id: {
            [Op.in]: avatarIds
          }
        }
      })
      const mainAvatar = avatars.find((avatar) => avatar.is_avatar)
      avatarsData.forEach((avatar) => {
        if (avatar.id === mainAvatar?.avatar_id) {
          avatar.dataValues.is_avatar = true
        } else {
          avatar.dataValues.is_avatar = false
        }
      })
      Object.assign(response, {
        status: 200,
        message: 'Success',
        data: avatarsData
      })
    } catch (error) {
      console.log(error)
      Object.assign(response, {
        status: 500,
        message: 'Internal Server Error'
      })
    }
    res.status(response.status).json(response)
  },
  postAvatar: async (req, res) => {
    const response = {}
    const file = req.file
    const path = `./public/images/avatars/uploads/${file?.filename}`
    const storedChecksum = getFileChecksum(path)
    const avatar = await Avatar.findOne({
      where: {
        checksum: storedChecksum
      }
    })
    if (avatar) {
      const userId = req.user.id
      const userAvatar = await UserAvatar.findOne({
        where: {
          avatar_id: avatar.id
        }
      })
      if (userAvatar) {
        await UserAvatar.update(
          {
            is_avatar: true
          },
          {
            where: {
              user_id: userId,
              avatar_id: avatar.id
            }
          }
        )
        await UserAvatar.update(
          {
            is_avatar: false
          },
          {
            where: {
              user_id: userId,
              avatar_id: {
                [Op.ne]: avatar.id
              }
            }
          }
        )
        await User.update(
          {
            avatar_id: avatar.id
          },
          {
            where: {
              id: userId
            }
          }
        )
      } else {
        await UserAvatar.create({
          user_id: userId,
          avatar_id: avatar.id,
          is_avatar: true
        })
        await UserAvatar.update(
          {
            is_avatar: false
          },
          {
            where: {
              user_id: userId,
              avatar_id: {
                [Op.ne]: avatar.id
              }
            }
          }
        )
        await User.update(
          {
            avatar_id: avatar.id
          },
          {
            where: {
              id: userId
            }
          }
        )
      }
      fs.unlinkSync(path)
      avatar.is_avatar = true
      Object.assign(response, {
        status: 200,
        message: 'Success',
        data: avatar,
        isDuplicate: userAvatar ? true : false
      })
      return res.status(response.status).json(response)
    }
    const user = req.user
    try {
      const newAvatar = await Avatar.create({
        image_url: path.slice(path.indexOf('/images')),
        checksum: storedChecksum,
        type: 'uploaded'
      })
      await UserAvatar.create({
        user_id: user.id,
        avatar_id: newAvatar.id,
        is_avatar: true
      })
      await UserAvatar.update(
        {
          is_avatar: false
        },
        {
          where: {
            user_id: user.id,
            avatar_id: {
              [Op.ne]: newAvatar.id
            }
          }
        }
      )
      await User.update(
        {
          avatar_id: newAvatar.id
        },
        {
          where: {
            id: user.id
          }
        }
      )
      newAvatar.is_avatar = true
      Object.assign(response, {
        status: 200,
        message: 'Success',
        data: newAvatar
      })
    } catch (error) {
      console.log(error)
      Object.assign(response, {
        status: 500,
        message: 'Internal Server Error'
      })
    }
    res.status(response.status).json(response)
  },
  updateAvatar: async (req, res) => {
    const response = {}
    const user = req.user
    const { id } = user
    const { avatarId } = req.params
    try {
      const avatar = await Avatar.findOne({
        where: {
          id: avatarId
        }
      })
      if (!avatar) {
        Object.assign(response, {
          status: 404,
          message: 'Not Found'
        })
        return res.status(response.status).json(response)
      }
      const userAvatar = await UserAvatar.findOne({
        where: {
          user_id: id,
          avatar_id: avatarId
        }
      })
      if (!userAvatar) {
        Object.assign(response, {
          status: 404,
          message: 'Not Found'
        })
        return res.status(response.status).json(response)
      }
      await UserAvatar.update(
        {
          is_avatar: true
        },
        {
          where: {
            user_id: id,
            avatar_id: avatarId
          }
        }
      )
      await UserAvatar.update(
        {
          is_avatar: false
        },
        {
          where: {
            user_id: id,
            avatar_id: {
              [Op.ne]: avatarId
            }
          }
        }
      )
      await User.update(
        {
          avatar_id: avatarId
        },
        {
          where: {
            id
          }
        }
      )
      Object.assign(response, {
        status: 200,
        message: 'Success',
        data: avatar
      })
    } catch (error) {
      Object.assign(response, {
        status: 500,
        message: 'Internal Server Error'
      })
    }
    res.status(response.status).json(response)
  }
}
