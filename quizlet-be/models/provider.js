'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Provider.hasMany(models.User, {
        foreignKey: 'provider_id'
      })
    }
  }
  Provider.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Provider',
      tableName: 'providers',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return Provider
}
