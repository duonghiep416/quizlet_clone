'use strict'
const bcrypt = require('bcrypt')
const { User } = require('../models/index')
const { faker } = require('@faker-js/faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = []
    for (let i = 1; i < 11; i++) {
      const hash = bcrypt.hashSync(`duonghiep123`, 10)
      data.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hash,
        status: 'true',
        avatar_id: i + 1,
        created_at: new Date(),
        updated_at: new Date()
      })
    }
    await queryInterface.bulkInsert('users', data, {})
    for (const item of data) {
      const user = await User.findOne({ where: { email: item.email } })
      await queryInterface.bulkInsert(
        'user_roles',
        [
          {
            user_id: user.dataValues.id,
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date()
          }
        ],
        {}
      )
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('user_roles', null, {})
  }
}
