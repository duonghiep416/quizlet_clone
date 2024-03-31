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
      'permissions',
      [
        {
          name: 'Create User',
          description: 'Create User',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Read User',
          description: 'Read User',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Update User',
          description: 'Update User',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Delete User',
          description: 'Delete User',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Create Role',
          description: 'Create Role',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Read Role',
          description: 'Read Role',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Update Role',
          description: 'Update Role',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Delete Role',
          description: 'Delete Role',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Create Permission',
          description: 'Create Permission',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Read Permission',
          description: 'Read Permission',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Update Permission',
          description: 'Update Permission',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Delete Permission',
          description: 'Delete Permission',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Create Notification',
          description: 'Create Notification',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Read Notification',
          description: 'Read Notification',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Update Notification',
          description: 'Update Notification',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Delete Notification',
          description: 'Delete Notification',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Create User Role',
          description: 'Create User Role',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Read User Role',
          description: 'Read User Role',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Update User Role',
          description: 'Update User Role',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Delete User Role',
          description: 'Delete User Role',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Create Role Permission',
          description: 'Create Role Permission',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Read Role Permission',
          description: 'Read Role Permission',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Update Role Permission',
          description: 'Update Role Permission',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Delete Role Permission',
          description: 'Delete Role Permission',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Create User Permission',
          description: 'Create User Permission',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Read User Permission',
          description: 'Read User Permission',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Update User Permission',
          description: 'Update User Permission',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Delete User Permission',
          description: 'Delete User Permission',
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
    await queryInterface.bulkDelete('permissions', null, {})
  }
}
