const express = require('express')
const { getProblems, runCode, submitCode, getMyProblemStatus } = require('../controllers/problemController')
const { authenticateToken } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getProblems)
router.post('/run', runCode)
router.post('/submit', authenticateToken, submitCode)
router.get('/status/me', authenticateToken, getMyProblemStatus)

module.exports = router
