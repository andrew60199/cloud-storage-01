'use strict';

const bcrypt = require('bcrypt')
const { User } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const user = await User.bulkCreate([{
        email: 'user1@email.com',
        password: 'password1',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        email: 'user2@email.com',
        password: 'password2',
        created_at: new Date(),
        updated_at: new Date()
      }], {
        individualHooks: true,
        returning: true,
        validate: true,
        transaction 
      })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    
    try {
      await queryInterface.bulkDelete('Users', null, { transaction })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
};
