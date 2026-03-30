import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

export type UserDocument = {
  email: string
  fullName: string
  password: string
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const User = mongoose.model<UserDocument>('User', userSchema)

export async function createUser(email: string, password: string, fullName: string) {
  const hashedPassword = bcrypt.hashSync(password, 10)
  const user = new User({
    email,
    fullName,
    password: hashedPassword,
  })
  return user.save()
}

export async function findUserByEmail(email: string) {
  return User.findOne({ email })
}

export async function findUserById(userId: string) {
  return User.findById(userId)
}

export function validatePassword(plainPassword: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(plainPassword, hashedPassword)
}
