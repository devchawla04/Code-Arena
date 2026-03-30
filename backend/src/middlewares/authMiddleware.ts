import type { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import type { AuthPayload, AuthenticatedRequest } from '../types/auth'

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export function generateToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload
  } catch {
    return null
  }
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: 'Access token required' })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload
    req.user = decoded
    next()
  } catch {
    res.status(403).json({ error: 'Invalid or expired token' })
  }
}
