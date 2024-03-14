const { Op } = require('sequelize')
const { Course, Flashcard, Category } = require('../../models')
const courseConfig = require('../../config/course.config')
const { getCategory } = require('../../controllers/api/category.controller')
const {
  generate: genPassHash,
  compare: comparePass
} = require('../../utils/passwordHash')
module.exports = {
  getCourses: async (req, res) => {
    const { id: userId } = req.user
    const { page = 1, keyword, sort = courseConfig.getCourses.sort } = req.query
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
    const limit = courseConfig.getCourses.limit
    const offset = (page - 1) * limit
    const courses = await Course.findAndCountAll({
      order: [['created_at', sort]],
      where: filter,
      limit,
      offset
    })
    courses.rows.forEach((course) => {
      if (course.password) {
        course.password = true
      } else {
        course.password = false
      }
      delete course.dataValues.user_id
    })
    const { rows, count } = courses
    const totalPage = Math.ceil(count / limit)
    Object.assign(response, {
      status: 200,
      message: 'Success',
      data: courses,
      totalPage
    })
    res.status(response.status).json(response)
  },
  getCourse: async (req, res, next, checked = false) => {
    const { id } = req.params
    const response = {}
    const course = await Course.findOne({
      where: {
        id
      },
      include: [
        {
          model: Flashcard,
          as: 'flashcards',
          where: {
            course_id: id
          },
          separate: true,
          order: [['order', 'ASC']],
          attributes: ['id', 'front_content', 'back_content', 'order']
        }
      ]
    })
    if (!course && !checked) {
      Object.assign(response, {
        status: 404,
        message: 'Not found'
      })
      return res.status(response.status).json(response)
    }
    if (
      !course.is_public &&
      course.password &&
      !checked &&
      req.user.id !== course.user_id
    ) {
      Object.assign(response, {
        status: 401,
        message: 'Unauthorized',
        isPassword: true
      })
      return res.status(response.status).json(response)
    }
    if (!course.is_public && !course.password && !checked) {
      if (req.user.id !== course.user_id) {
        Object.assign(response, {
          status: 401,
          message: 'Unauthorized',
          isPassword: false
        })
        return res.status(response.status).json(response)
      }
    }
    delete course.dataValues.user_id
    delete course.dataValues.password
    Object.assign(response, {
      status: 200,
      message: 'Success',
      data: course
    })
    res.status(response.status).json(response)
  },
  checkPassword: async (req, res, next) => {
    const { id } = req.params
    const { type, password } = req.body
    const response = {}
    try {
      if (
        Object.keys(req.body).length === 0 ||
        (type !== 'course' && type !== 'category') ||
        !password ||
        !type
      ) {
        Object.assign(response, {
          status: 400,
          message: 'Invalid type'
        })
        return res.status(response.status).json(response)
      }
      const model = type === 'course' ? Course : Category
      const data = await model.findOne({
        where: {
          id
        }
      })
      if (!data) {
        Object.assign(response, {
          status: 404,
          message: 'Not found'
        })
        return res.status(response.status).json(response)
      }
      if (data.password) {
        const result = comparePass(password, data.password)
        if (!result) {
          Object.assign(response, {
            status: 401,
            message: 'Sai mật khẩu'
          })
          return res.status(response.status).json(response)
        }
        if (result) {
          if (type === 'course') {
            module.exports.getCourse(req, res, next, true)
          }
          if (type === 'category') {
            getCategory(req, res, next, true)
          }
        }
      } else {
        Object.assign(response, {
          status: 404,
          message: 'Not found'
        })
        return res.status(response.status).json(response)
      }
    } catch (error) {
      console.log(error)
      Object.assign(response, {
        status: 500,
        message: 'Internal server error'
      })
      return res.status(response.status).json(response)
    }
  },

  postCourse: async (req, res) => {
    const {
      name,
      is_public,
      description = null,
      category_id = null,
      password = null,
      flashcards = []
    } = req.body
    const { id } = req.user
    const response = {}
    if (Object.keys(req.body).length === 0) {
      Object.assign(response, {
        status: 400,
        message: 'Invalid body'
      })
      return res.status(response.status).json(response)
    }
    if (is_public && password) {
      Object.assign(response, {
        status: 400,
        message: 'Invalid body'
      })
      return res.status(response.status).json(response)
    }
    const passwordHash = password ? genPassHash(password) : null
    try {
      const newCourse = await Course.create({
        name,
        is_public,
        description,
        user_id: id,
        password: passwordHash,
        category_id
      })
      flashcards.forEach((flashcard, index) => {
        if (!flashcard.front_content || !flashcard.back_content) {
          Object.assign(response, {
            status: 400,
            message: 'Invalid body'
          })
          return res.status(response.status).json(response)
        }
        flashcard.user_id = id
        flashcard.course_id = newCourse.id
        flashcard.order = index + 1
      })
      const newFlashcards = await Flashcard.bulkCreate(flashcards)
      delete newCourse.dataValues.user_id
      if (newCourse.dataValues.password) {
        newCourse.dataValues.password = true
      } else {
        newCourse.dataValues.password = false
      }
      newFlashcards.forEach((newFlashcard) => {
        delete newFlashcard.dataValues.course_id
        delete newFlashcard.dataValues.user_id
        delete newFlashcard.dataValues.created_at
        delete newFlashcard.dataValues.updated_at
        delete newFlashcard.dataValues.id
      })
      Object.assign(response, {
        status: 200,
        message: 'Success',
        data: {
          course: {
            ...newCourse.dataValues,
            flashcards: newFlashcards
          }
        }
      })
    } catch (error) {
      Object.assign(response, {
        status: 500,
        message: 'Internal server error'
      })
    }
    res.status(response.status).json(response)
  },
  updateCourse: async (req, res) => {
    const { id: userId } = req.user
    const { id } = req.params
    const { name, is_public, category_id = null, flashcards = [] } = req.body
    const response = {}
    if (Object.keys(req.body).length === 0) {
      Object.assign(response, {
        status: 400,
        message: 'Invalid body'
      })
      return res.status(response.status).json(response)
    }
    const updateFlashcards = []
    const createFlashcards = []
    const deleteFlashcards = []
    const course = await Course.findOne({
      where: {
        id,
        user_id: userId
      },
      include: [
        {
          model: Flashcard,
          as: 'flashcards',
          where: {
            user_id: userId,
            course_id: id
          },
          separate: true,
          order: [['order', 'ASC']],
          attributes: ['id', 'front_content', 'back_content', 'order']
        }
      ]
    })
    if (!course) {
      Object.assign(response, {
        status: 404,
        message: 'Not found course'
      })
      return res.status(response.status).json(response)
    }
    const updatedCourse = await course.update({
      name,
      is_public,
      category_id
    })
    flashcards.forEach((flashcard, index) => {
      if (!flashcard.front_content || !flashcard.back_content) {
        Object.assign(response, {
          status: 400,
          message: 'Invalid body'
        })
        return res.status(response.status).json(response)
      }
      flashcard.user_id = userId
      flashcard.course_id = id
      flashcard.order = index + 1
      if (!flashcard.id) {
        createFlashcards.push(flashcard)
      } else {
        updateFlashcards.push(flashcard)
      }
      course.flashcards.forEach((oldFlashcard) => {
        if (
          !flashcards.find((flashcard) => {
            return oldFlashcard.id === flashcard.id
          })
        ) {
          deleteFlashcards.push(oldFlashcard)
        }
      })
    })
    if (deleteFlashcards.length) {
      await Flashcard.destroy({
        where: {
          user_id: userId,
          course_id: id,
          id: deleteFlashcards.map((flashcard) => flashcard.id)
        }
      })
    }
    if (updateFlashcards.length) {
      updateFlashcards.forEach(async (flashcard) => {
        await Flashcard.update(
          {
            front_content: flashcard.front_content,
            back_content: flashcard.back_content,
            order: flashcard.order
          },
          {
            where: {
              id: flashcard.id
            }
          }
        )
      })
    }
    const newFlashcards = await Flashcard.bulkCreate(createFlashcards)
    delete updatedCourse.dataValues.user_id
    newFlashcards.forEach((newFlashcard) => {
      delete newFlashcard.dataValues.course_id
      delete newFlashcard.dataValues.user_id
      delete newFlashcard.dataValues.created_at
      delete newFlashcard.dataValues.updated_at
      delete newFlashcard.dataValues.id
    })
    Object.assign(response, {
      status: 200,
      message: 'Success'
    })
    res.status(response.status).json(response)
  },
  deleteCourse: async (req, res) => {
    const { id: userId } = req.user
    const { id } = req.params
    const response = {}
    const course = await Course.findOne({
      where: {
        id,
        user_id: userId
      }
    })
    if (!course) {
      Object.assign(response, {
        status: 404,
        message: 'Not found'
      })
      return res.status(response.status).json(response)
    }
    await course.destroy()
    Object.assign(response, {
      status: 200,
      message: 'Success'
    })
    res.status(response.status).json(response)
  }
}
// Flashcard có id -> update
// Flashcard không có id -> Create
// Flashcard trên db không tìm thấy id trên body => Xóa
