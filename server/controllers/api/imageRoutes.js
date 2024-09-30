require('dotenv').config()
const router = require('express').Router()

// api/image

router.post('/upload', async (req, res) => {
    console.log(req.body)

  try {

    return res.status(200).json({ message: 'Success' })
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Fail' })
  }  
})

module.exports = router