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
    await queryInterface.addConstraint('categories', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_categories_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addConstraint('courses', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_courses_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addConstraint('courses', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'fk_courses_category_id',
      references: {
        table: 'categories',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addConstraint('flashcards', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_flashcards_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addConstraint('flashcards', {
      fields: ['course_id'],
      type: 'foreign key',
      name: 'fk_flashcards_course_id',
      references: {
        table: 'courses',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addConstraint('study_sessions', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_study_sessions_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addConstraint('study_sessions', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_study_sessions_type_id',
      references: {
        table: 'study_types',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addConstraint('achievements', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_achievements_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addConstraint('users', {
      fields: ['provider_id'],
      type: 'foreign key',
      name: 'fk_users_provider_id',
      references: {
        table: 'providers',
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
    await queryInterface.removeConstraint('categories', 'fk_categories_user_id')
    await queryInterface.removeConstraint('courses', 'fk_courses_user_id')
    await queryInterface.removeConstraint('courses', 'fk_courses_category_id')
    await queryInterface.removeConstraint('flashcards', 'fk_flashcards_user_id')
    await queryInterface.removeConstraint(
      'flashcards',
      'fk_flashcards_course_id'
    )
    await queryInterface.removeConstraint(
      'study_sessions',
      'fk_study_sessions_user_id'
    )
    await queryInterface.removeConstraint(
      'study_sessions',
      'fk_study_sessions_type_id'
    )
    await queryInterface.removeConstraint(
      'achievements',
      'fk_achievements_user_id'
    )
    await queryInterface.removeConstraint('users', 'fk_users_provider_id')
  }
}
