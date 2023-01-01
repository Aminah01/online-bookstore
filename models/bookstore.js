'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookstore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bookstore.init({
    productName: DataTypes.STRING,
    author: DataTypes.STRING,
    price: DataTypes.STRING,
    quantity_available: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bookstore',
  });
  return bookstore;
};