'use strict'
const bcrypt = require('bcrypt')
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
