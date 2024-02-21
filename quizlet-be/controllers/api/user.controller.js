const { response } = require('express')
const { User } = require('../../models/index')
const { Op } = require('sequelize')
const { object, string } = require('yup')
const bcrypt = require('bcrypt')
module.exports = {
  index: async (req, res) => {
    const { order = 'asc', sort = 'id', status, q, limit, page = 1 } = req.query

    const response = {}
    const filters = {}
    if (status === 'true' || status === 'false') {
      filters.status = status === 'true'
    }
    if (q) {
      filters[Op.or] = {
        name: {
          [Op.iLike]: `%${q.trim()}%`
        },
        email: {
          [Op.iLike]: `%${q.trim()}%`
        }
      }
    }
    const options = {
      order: [[sort, order]],
      attributes: { exclude: ['password'] },
      where: filters
    }
    if (limit && Number.isInteger(+limit)) {
      const offset = (page - 1) * limit
      options.limit = +limit
      options.offset = offset
    }
    try {
      const { count, rows: users } = await User.findAndCountAll(options)
      response.status = 200
      response.message = 'Success'
      response.data = users
      response.count = count
    } catch (error) {
      response.status = 500
      response.message = 'SERVER ERROR'
    }
    res.status(response.status).json(response)
  },
  find: async (req, res) => {
    const { id } = req.params
    const response = {}
    try {
      const user = await User.findByPk(id)
      if (!user) {
        Object.assign(response, {
          status: 404,
          message: 'Not found'
        })
      }
      Object.assign(response, {
        status: 200,
        message: 'Success',
        data: user
      })
    } catch (error) {
      response.status = 500
      response.message = 'SERVER ERROR'
    }
    res.status(response.status).json(response)
  },
  store: async (req, res) => {
    const schema = object({
      name: string().required('Name is required'),
      email: string().email('Email is invalid').required('Email is required'),
      password: string().required('Password is required'),
      status: string()
        .required('Status is required')
        .test('check-boolean', 'Status must be boolean', (value) => {
          return value === 'true' || value === 'false'
        })
    })
    const response = {}
    try {
      const body = await schema.validate(req.body, { abortEarly: false })
      body.status = body.status === 'true'
      body.password = bcrypt.hashSync(body.password, 10)
      const [user, created] = await User.findOrCreate({
        where: {
          email: body.email
        },
        defaults: body
      })
      if (!created) {
        Object.assign(response, {
          status: 409,
          message: 'Email already exists'
        })
      } else {
        delete user.dataValues.password
        Object.assign(response, {
          status: 201,
          message: 'Success',
          data: user
        })
      }
    } catch (error) {
      const errors = Object.fromEntries(
        error.inner.map(({ path, message }) => [path, message])
      )
      Object.assign(response, {
        status: 400,
        message: 'Bad request',
        errors
      })
    }
    res.status(response.status).json(response)
  },
  update: async (req, res) => {
    const { id } = req.params
    const method = req.method
    const body = req.body
    const schema = object({
      //    name: string().required('Name is required'),
      //     email: string().email('Email is invalid').required('Email is required'),
      //     password: string().required('Password is required'),
      //     status: string()
      //       .required('Status is required')
      //       .test('check-boolean', 'Status must be boolean', (value) => {
      //         return value === 'true' || value === 'false'
      //       })
    })
    const response = {}
    try {
      const body = await schema.validate(req.body, { abortEarly: false })
      if (body.status === 'true' || body.status === 'false') {
        body.status = body.status === 'true'
      }
      if (body.password) {
        body.password = bcrypt.hashSync(body.password, 10)
      }
      await User.update(body, {
        where: {
          id
        }
      })
      const user = await User.findByPk(id)
      delete user.dataValues.password
      Object.assign(response, {
        status: 201,
        message: 'Success',
        data: user
      })
    } catch (error) {
      const errors = Object.fromEntries(
        error.inner.map(({ path, message }) => [path, message])
      )
      Object.assign(response, {
        status: 400,
        message: 'Bad request',
        errors
      })
    }
    res.status(response.status).json(response)
  },
  delete: async (req, res) => {
    const { id } = req.params
    await User.destroy({ where: { id } })
    res.status(204).json({
      status: 204,
      message: 'Success'
    })
  }
}
