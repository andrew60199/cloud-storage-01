require('dotenv').config()
const express = require('express')
const { sequelize } = require('./db/models')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const routes = require('./controllers')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

const connectDb = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        process.exit(1)
    }
}
  
(async () => {    
    await connectDb()
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`)
    })
})()