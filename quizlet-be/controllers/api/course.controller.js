const { Op } = require('sequelize')
const { Course, Flashcard } = require('../../models')
const courseConfig = require('../../config/course.config')
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
  getCourse: async (req, res) => {
    const { id: userId } = req.user
    const { id } = req.params
    const response = {}
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
        message: 'Not found'
      })
      return res.status(response.status).json(response)
    }
    delete course.dataValues.user_id
    Object.assign(response, {
      status: 200,
      message: 'Success',
      data: course
    })
    res.status(response.status).json(response)
  },
  postCourse: async (req, res) => {
    const {
      name,
      is_public,
      description = null,
      category_id = null,
      flashcards = []
    } = req.body
    const { id } = req.user
    const response = {}
    const newCourse = await Course.create({
      name,
      is_public,
      description,
      user_id: id,
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
    res.status(response.status).json(response)
  },
  updateCourse: async (req, res) => {
    const { id: userId } = req.user
    const { id } = req.params
    const { name, is_public, category_id = null, flashcards = [] } = req.body
    const response = {}
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
