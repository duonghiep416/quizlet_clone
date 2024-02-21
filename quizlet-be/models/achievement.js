'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Achievement.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Achievement',
      tableName: 'achievements',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return Achievement
}
