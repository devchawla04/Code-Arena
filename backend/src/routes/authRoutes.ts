import express from 'express'
import { getProfile, signin, signup } from '../controllers/authController'
import { authenticateToken } from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/profile', authenticateToken, getProfile)

export default router
