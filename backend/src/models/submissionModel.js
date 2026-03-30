const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    problemId: {
      type: Number,
      required: true,
      index: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    passed: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    runtime: {
      type: String,
      default: 'N/A',
    },
    memory: {
      type: String,
      default: 'N/A',
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Submission = mongoose.model('Submission', submissionSchema)

module.exports = {
  Submission,
}
