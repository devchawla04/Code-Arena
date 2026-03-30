import mongoose from 'mongoose'

export type SubmissionDocument = {
  userId: mongoose.Types.ObjectId
  problemId: number
  language: string
  status: string
  passed: number
  total: number
  runtime: string
  memory: string
  code: string
  createdAt: Date
}

const submissionSchema = new mongoose.Schema<SubmissionDocument>(
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

export const Submission = mongoose.model<SubmissionDocument>('Submission', submissionSchema)
