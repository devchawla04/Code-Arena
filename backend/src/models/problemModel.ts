import mongoose from 'mongoose'

export type ProblemDocument = {
  problemId: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  acceptance: string
  tags: string[]
  statement: string
  examples: Array<{ input: string; output: string }>
  constraints: string[]
  templates: {
    cpp: string
    java: string
    python: string
    javascript: string
  }
}

const problemSchema = new mongoose.Schema<ProblemDocument>(
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

export const Problem = mongoose.model<ProblemDocument>('Problem', problemSchema)
