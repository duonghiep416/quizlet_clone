'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Avatar.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      image_url: DataTypes.STRING,
      type: DataTypes.STRING,
      checksum: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Avatar',
      tableName: 'avatars',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return Avatar
}
