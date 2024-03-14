const { Op } = require('sequelize')
const { Category, Course } = require('../../models')
const categoryConfig = require('../../config/category.config')
const { generate: genPassHash } = require('../../utils/passwordHash')

module.exports = {
  getCategories: async (req, res) => {
    const { id: userId } = req.user
    const {
      page = 1,
      keyword,
      sort = categoryConfig.getCategories.sort
    } = req.query
    const response = {}
    const filter = {
      user_id: userId
    }
    if (keyword) {
      filter[Op.or] = [
        {
          name: {
            [Op.iLike]: `%${keyword}%`
          }
        }
      ]
    }
    const limit = categoryConfig.getCategories.limit
    const offset = (page - 1) * limit
    const categories = await Category.findAndCountAll({
      order: [['created_at', sort]],
      where: filter,
      limit,
      offset
    })
    const { rows, count } = categories
    const totalPage = Math.ceil(count / limit)
    Object.assign(response, {
      status: 200,
      message: 'Success',
      data: categories,
      totalPage
    })
    res.status(response.status).json(response)
  },
  getCategory: async (req, res, next, checked = false) => {
    const { id: userId } = req.user
    const { id } = req.params
    const response = {}
    const category = await Category.findOne({
      where: {
        id
      },
      include: [
        {
          model: Course,
          as: 'courses',
          where: {
            category_id: id
          },
          separate: true,
          order: [['created_at', 'DESC']]
        }
      ]
    })

    if (!category && !checked) {
      Object.assign(response, {
        status: 404,
        message: 'Category not found'
      })
      return res.status(response.status).json(response)
    }

    if (
      !category.is_public &&
      category.password &&
      !checked &&
      userId !== category.user_id
    ) {
      Object.assign(response, {
        status: 401,
        message: 'Unauthorized',
        isPassword: true
      })
      return res.status(response.status).json(response)
    }
    if (!category.is_public && !category.password && !checked) {
      if (req.user.id !== category.user_id) {
        Object.assign(response, {
          status: 401,
          message: 'Unauthorized',
          isPassword: false
        })
        return res.status(response.status).json(response)
      }
    }
    category.courses.forEach((course) => {
      if (course.password) {
        course.password = true
      } else {
        course.password = false
      }
      delete course.dataValues.user_id
      delete course.dataValues.category_id
    })
    delete category.dataValues.user_id
    if (category.dataValues.password) {
      category.dataValues.password = true
    } else {
      category.dataValues.password = false
    }
    Object.assign(response, {
      status: 200,
      message: 'Success',
      data: category
    })
    res.status(response.status).json(response)
  },
  postCategory: async (req, res) => {
    const { name, is_public, password = null } = req.body
    const { id: userId } = req.user
    const response = {}
    if (Object.keys(req.body).length === 0) {
      Object.assign(response, {
        status: 400,
        message: 'Bad request'
      })
      return res.status(response.status).json(response)
    }
    if (!name || (is_public && password)) {
      Object.assign(response, {
        status: 400,
        message: 'Bad request'
      })
      return res.status(response.status).json(response)
    }
    const passwordHash = password ? genPassHash(password) : null
    const category = await Category.create({
      name,
      is_public,
      password: passwordHash,
      user_id: userId
    })
    delete category.dataValues.user_id
    if (category.dataValues.password) {
      category.dataValues.password = true
    } else {
      category.dataValues.password = false
    }
    Object.assign(response, {
      status: 201,
      message: 'Created',
      data: category
    })
    res.status(response.status).json(response)
  },
  updateCategory: async (req, res) => {
    const { name, is_public, password = null } = req.body
    const { id: userId } = req.user
    const { id } = req.params
    const response = {}
    const updateFields = {}
    if (name) {
      updateFields.name = name
    }
    if (is_public) {
      updateFields.is_public = is_public
    }
    if (password) {
      updateFields.password = genPassHash(password)
    }
    if (!name || (is_public && password)) {
      Object.assign(response, {
        status: 400,
        message: 'Bad request'
      })
      return res.status(response.status).json(response)
    }
    try {
      const category = await Category.update(updateFields, {
        where: {
          id,
          user_id: userId
        }
      })
      if (!category) {
        Object.assign(response, {
          status: 404,
          message: 'Category not found'
        })
        return res.status(response.status).json(response)
      }
      Object.assign(response, {
        status: 200,
        message: 'Updated'
      })
    } catch (error) {
      Object.assign(response, {
        status: 500,
        message: 'Internal server error'
      })
    }
    res.status(response.status).json(response)
  },
  deleteCategory: async (req, res) => {
    const { id: userId } = req.user
    const { id } = req.params
    const response = {}
    try {
      const category = await Category.destroy({
        where: {
          id,
          user_id: userId
        }
      })
      if (!category) {
        Object.assign(response, {
          status: 404,
          message: 'Category not found'
        })
        return res.status(response.status).json(response)
      }
      Object.assign(response, {
        status: 200,
        message: 'Deleted'
      })
    } catch (error) {
      Object.assign(response, {
        status: 500,
        message: 'Internal server error'
      })
    }
    res.status(response.status).json(response)
  }
}
