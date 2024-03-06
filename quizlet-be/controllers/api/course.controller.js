const { Op } = require('sequelize')
const { User, BlacklistToken, Course, Flashcard } = require('../../models')

module.exports = {
  getCourses: async (req, res) => {
    const { id: userId } = req.user
    const { page = 1, keyword } = req.query
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
    const limit = 10
    const offset = (page - 1) * limit
    const courses = await Course.findAndCountAll({
      order: [['created_at', 'DESC']],
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
  postCourse: async (req, res) => {
    const { name, is_public, category_id = null, flashcards = [] } = req.body
    const { id } = req.user
    const response = {}
    const newCourse = await Course.create({
      name,
      is_public,
      user_id: id,
      category_id
    })
    flashcards.forEach((flashcard) => {
      if (!flashcard.front_content || !flashcard.back_content) {
        Object.assign(response, {
          status: 400,
          message: 'Invalid body'
        })
        return res.status(response.status).json(response)
      }
      flashcard.user_id = id
      flashcard.course_id = newCourse.id
    })
    const newFlashcards = await Flashcard.bulkCreate(flashcards)
    delete newCourse.dataValues.created_at
    delete newCourse.dataValues.updated_at
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
  }
}
