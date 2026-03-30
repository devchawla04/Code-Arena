export type ProblemExample = {
  input: string
  output: string
}

export type ProblemTemplate = {
  cpp: string
  java: string
  python: string
  javascript: string
}

export type Problem = {
  id: number
  problemId?: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  acceptance: string
  tags: string[]
  statement: string
  examples: ProblemExample[]
  constraints: string[]
  templates: ProblemTemplate
}

export type EvaluationResult = {
  type: 'run' | 'submit'
  status: string
  tests: string
  runtime: string
  memory: string
  title: string
  language?: string
  timestamp: string
  reason: string
}

export type User = {
  userId: string
  email: string
  fullName: string
}

export type AuthResponse = {
  token: string
  user: User
  message: string
}

export type SubmissionStatus = {
  problemId: number
  solved: boolean
  submissions: number
  lastStatus: string
  lastSubmittedAt?: string
}
