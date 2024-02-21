'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Flashcard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Flashcard.belongsTo(models.User, { foreignKey: 'user_id' })
      Flashcard.belongsTo(models.Course, { foreignKey: 'course_id' })
    }
  }
  Flashcard.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      front_content: DataTypes.STRING,
      back_content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Flashcard',
      tableName: 'flashcards',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return Flashcard
}
