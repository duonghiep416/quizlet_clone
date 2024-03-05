'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = []
    for (var i = 0; i < 5; i++) {
      data.push({
        image_url: `/images/avatars/default/default-${i + 1}.jpg`,
        type: 'system',
        created_at: new Date(),
        updated_at: new Date()
      })
    }
    for (var i = 5; i < 10; i++) {
      data.push({
        image_url: `/images/avatars/default/default-${i + 1}.png`,
        type: 'system',
        created_at: new Date(),
        updated_at: new Date()
      })
    }
    await queryInterface.bulkInsert('avatars', data, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('avatars', null, {})
  }
}
