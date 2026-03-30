const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema(
  {
    problemId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard'],
    },
    acceptance: {
      type: String,
      default: 'N/A',
    },
    tags: {
      type: [String],
      default: ['JavaScript', '30 Days of JS'],
    },
    statement: {
      type: String,
      required: true,
    },
    examples: {
      type: [
        {
          input: { type: String, required: true },
          output: { type: String, required: true },
        },
      ],
      default: [],
    },
    constraints: {
      type: [String],
      default: [],
    },
    templates: {
      cpp: { type: String, required: true },
      java: { type: String, required: true },
      python: { type: String, required: true },
      javascript: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  },
)

const Problem = mongoose.model('Problem', problemSchema)

module.exports = {
  Problem,
}
