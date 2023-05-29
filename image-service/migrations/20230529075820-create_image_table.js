'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('Images', {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    } catch (error) {
      console.error('Error creating table:', error);
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Images');
  },
};
