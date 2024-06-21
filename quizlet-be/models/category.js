'use strict'
const { Model, UUIDV4} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.User, { foreignKey: 'user_id' })
      Category.hasMany(models.Course, {
        foreignKey: 'category_id',
        as: 'courses'
      })
    }
  }
  Category.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: UUIDV4
      },
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      is_public: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return Category
}
