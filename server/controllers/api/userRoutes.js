require('dotenv').config()
const router = require('express').Router()
const { sequelize, User } = require('../../db/models')

// api/user

router.post('/login', async (req, res) => {
  const failMessage = 'Incorrect email or password'

  if (!req.body.email) return res.status(400).json({ message: 'Please enter a valid email address' })
  if (!req.body.password) return res.status(400).json({ message: 'Please enter a valid password' })

  try {
    const userData = await User.findOne({ where: { email: req.body.email } })
    if (!userData) return res.status(400).json({ message: failMessage })

    const validPassword = await userData.checkPassword(req.body.password)
    if (!validPassword) return res.status(400).json({ message: failMessage })

    const userPlain = userData.get({ plain: true })
    // console.log(userPlain)

    const { password, deleted_at, ...rest } = userPlain

    return res.status(200).json({ message: 'Welcome back!', user: rest })
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: failMessage })
  }  
})

// router.get('/all', async (req, res) => {
//   try {
//     const users = await User.findAll({
//       attributes: ['id', 'email']
//     })
//     const usersPlain = users.map(user => user.get({ plain: true }))
//     return res.status(200).json({ users: usersPlain })
    
//   } catch (error) {
//     console.log(error)
//     return res.status(400).json({ message: 'Server error. Please try again later.' })
//   }
// })

module.exports = router