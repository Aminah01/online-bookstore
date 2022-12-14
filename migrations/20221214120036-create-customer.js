'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        uniqueKey:true
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
        uniqueKey:true
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