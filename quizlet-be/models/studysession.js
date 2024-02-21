'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class StudySession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudySession.belongsTo(models.User, { foreignKey: 'user_id' })
      StudySession.belongsTo(models.StudyType, { foreignKey: 'study_type_id' })
    }
  }
  StudySession.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      study_type_id: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'StudySession',
      tableName: 'study_sessions',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return StudySession
}
