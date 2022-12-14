'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customer.init({
    id:{
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement:true
    },
    customer_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      uniqueKey:true
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull:false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull:false,
      uniqueKey:true
    },
    is_phone_number_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_salt: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    createdAt: { //createdAt
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: { //updatedAt
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};