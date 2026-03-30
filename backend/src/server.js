const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/database')
const authRoutes = require('./routes/authRoutes')
const problemRoutes = require('./routes/problemRoutes')

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 5001

app.use(cors())
app.use(express.json())

connectDB().catch((error) => {
  console.error('Failed to connect to MongoDB:', error)
})

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'leetcode-clone-backend',
    timestamp: new Date().toISOString(),
  })
})

app.get('/api', (_req, res) => {
  res.status(200).json({
    message: 'API is running',
  })
})

app.use('/auth', authRoutes)
app.use('/api/problems', problemRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
