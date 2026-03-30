import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined')
    }

    const conn = await mongoose.connect(mongoUri)
    console.log(`MongoDB connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown database error'
    console.error(`MongoDB connection error: ${message}`)
    process.exit(1)
  }
}

export default connectDB
