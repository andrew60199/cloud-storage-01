'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('Users', {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          deleted_at: {
            type: Sequelize.DATE,
            allowNull: true,
          }
        }, { transaction: t })
      ])
    })
  },
  down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('Users', { transaction: t })
      ])
    })
  }
}