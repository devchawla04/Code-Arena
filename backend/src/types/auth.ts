import type { Request } from 'express'

export type AuthPayload = {
  userId: string
  email: string
  iat?: number
  exp?: number
}

export type AuthenticatedRequest = Request & {
  user?: AuthPayload
}
