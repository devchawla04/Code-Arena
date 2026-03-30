import express from 'express'
import {
  getMyProblemStatus,
  getProblems,
  runCode,
  submitCode,
} from '../controllers/problemController'
import { authenticateToken } from '../middlewares/authMiddleware'

const router = express.Router()

router.get('/', getProblems)
router.post('/run', runCode)
router.post('/submit', authenticateToken, submitCode)
router.get('/status/me', authenticateToken, getMyProblemStatus)

export default router
