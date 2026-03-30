const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
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

const User = mongoose.model('User', userSchema)

async function createUser(email, password, fullName) {
  const hashedPassword = bcrypt.hashSync(password, 10)
  const user = new User({
    email,
    fullName,
    password: hashedPassword,
  })
  return await user.save()
}

async function findUserByEmail(email) {
  return await User.findOne({ email })
}

async function findUserById(userId) {
  return await User.findById(userId)
}

function validatePassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = {
  User,
  createUser,
  findUserByEmail,
  findUserById,
  validatePassword,
}
