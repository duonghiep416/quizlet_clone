const { User, BlacklistToken, Course } = require('../../models')

module.exports = {
  getCourses: async (req, res) => {
    const { page = 1, keyword } = req.query
    const response = {}
    const filter = {}
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
  }
}
