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
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'Super Admin',
          description: 'Super Admin can do anything',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Admin',
          description: 'Admin role',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'User',
          description: 'User role',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('roles', null, {})
  }
}
