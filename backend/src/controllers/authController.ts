import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../middlewares/authMiddleware'
import { createUser, findUserByEmail, validatePassword } from '../models/userModel'
import type { AuthenticatedRequest } from '../types/auth'

export async function signup(req: Request, res: Response) {
  try {
    const { email, password, fullName } = req.body as {
      email?: string
      password?: string
      fullName?: string
    }

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
    const token = jwt.sign({ userId: String(user._id), email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    })

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        userId: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Signup failed'
    return res.status(500).json({ error: message })
  }
}

export async function signin(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email?: string; password?: string }

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

    const token = jwt.sign({ userId: String(user._id), email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    })

    return res.status(200).json({
      message: 'Sign in successful',
      token,
      user: {
        userId: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Signin failed'
    return res.status(500).json({ error: message })
  }
}

export async function getProfile(req: AuthenticatedRequest, res: Response) {
  try {
    return res.status(200).json({
      message: 'User profile retrieved',
      user: req.user,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load profile'
    return res.status(500).json({ error: message })
  }
}
