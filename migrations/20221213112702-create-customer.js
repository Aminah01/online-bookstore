'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      sn: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true
      },
      customer_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      is_email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull:false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      is_phone_number_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false
      },
      dob: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_salt: {
        type: Sequelize.STRING,
        allowNull: false,
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};