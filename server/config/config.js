const path = require('path')
require('dotenv').config({path : path.join(__dirname, '../.env')})

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: '0.0.0.0',
    dialect: 'postgres',
    seederStorage: 'sequelize'
  },
  production: {
    username: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    host: process.env.DB_HOST,
    dialect: 'postgres',
    seederStorage: 'sequelize'
  }
}
