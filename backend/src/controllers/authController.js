const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../middlewares/authMiddleware')
const { createUser, findUserByEmail, validatePassword } = require('../models/userModel')

async function signup(req, res) {
  try {
    const { email, password, fullName } = req.body

    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Email, password, and full name are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' })
    }

    const user = await createUser(email, password, fullName)
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    })

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        userId: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function signin(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isPasswordValid = validatePassword(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    })

    res.status(200).json({
      message: 'Sign in successful',
      token,
      user: {
        userId: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function getProfile(req, res) {
  try {
    res.status(200).json({
      message: 'User profile retrieved',
      user: req.user,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  signup,
  signin,
  getProfile,
}
