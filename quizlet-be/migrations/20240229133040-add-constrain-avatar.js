'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('users', {
      fields: ['avatar_id'],
      type: 'foreign key',
      name: 'fk_users_avatar_id',
      references: {
        table: 'avatars',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addConstraint('userAvatars', {
      fields: ['avatar_id'],
      type: 'foreign key',
      name: 'fk_userAvatars_avatar_id',
      references: {
        table: 'avatars',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addConstraint('userAvatars', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_userAvatars_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('users', 'fk_users_avatar_id')
    await queryInterface.removeConstraint(
      'userAvatars',
      'fk_userAvatars_avatar_id'
    )
    await queryInterface.removeConstraint(
      'userAvatars',
      'fk_userAvatars_user_id'
    )
  }
}
