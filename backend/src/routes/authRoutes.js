const express = require('express')
const router = express.Router()
const { signup, signin, getProfile } = require('../controllers/authController')
const { authenticateToken } = require('../middlewares/authMiddleware')

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/profile', authenticateToken, getProfile)

module.exports = router
