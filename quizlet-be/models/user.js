'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Provider, {
        foreignKey: 'provider_id'
      })
      User.hasMany(models.Category, {
        foreignKey: 'user_id'
      })
      User.hasMany(models.Flashcard, {
        foreignKey: 'user_id'
      })
      User.hasMany(models.StudySession, {
        foreignKey: 'user_id'
      })
      User.hasMany(models.Achievement, {
        foreignKey: 'user_id'
      })
      // User.hasMany(models.userAvatar, {
      //   foreignKey: 'user_id'
      // })
      User.belongsTo(models.Avatar, {
        foreignKey: 'avatar_id',
        as: 'avatar'
      })
      User.hasOne(models.UserRole, {
        foreignKey: 'user_id',
        as: 'roles'
      })
    }
  }
  User.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      provider_id: {
        type: DataTypes.INTEGER
      },

      avatar_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return User
}
