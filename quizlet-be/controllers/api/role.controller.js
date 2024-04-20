const { Role } = require('../../models/index')

module.exports = {
  getRole: async (req, res) => {
    const response = {}
    try {
      const roles = await Role.findAll()
      roles.forEach((role) => {
        delete role.dataValues.created_at
        delete role.dataValues.updated_at
      })
      Object.assign(response, {
        status: 200,
        message: 'Success',
        roles
      })
    } catch (error) {
      console.log(error)
      Object.assign(response, {
        status: 500,
        message: 'Internal Server Error'
      })
    }
    return res.status(response.status).json(response)
  }
}
