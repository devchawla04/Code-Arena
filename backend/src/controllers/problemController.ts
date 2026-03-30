import type { Request, Response } from 'express'
import { SEEDED_PROBLEMS } from '../constants/problemSeed'
import { Problem } from '../models/problemModel'
import { Submission } from '../models/submissionModel'
import { runAgainstTests } from '../services/judgeService'
import type { AuthenticatedRequest } from '../types/auth'

type SubmissionStatusShape = {
  problemId: number
  solved: boolean
  submissions: number
  lastStatus: string
  lastSubmittedAt?: Date
}

async function ensureProblemsSeeded() {
  const count = await Problem.countDocuments()
  if (count === 0) {
    await Problem.insertMany(SEEDED_PROBLEMS)
    return
  }

  const updates = SEEDED_PROBLEMS.map((problem) => ({
    updateOne: {
      filter: { problemId: problem.problemId },
      update: {
        $set: {
          title: problem.title,
          difficulty: problem.difficulty,
          acceptance: problem.acceptance,
          tags: problem.tags,
          statement: problem.statement,
          examples: problem.examples,
          constraints: problem.constraints,
          templates: problem.templates,
        },
      },
      upsert: true,
    },
  }))

  if (updates.length > 0) {
    await Problem.bulkWrite(updates)
  }
}

export async function getProblems(_req: Request, res: Response) {
  try {
    await ensureProblemsSeeded()
    const problems = await Problem.find({}).sort({ problemId: 1 }).lean()
    return res.status(200).json({ problems })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch problems'
    return res.status(500).json({ error: message })
  }
}

export async function runCode(req: Request, res: Response) {
  try {
    const { problemId, language, code } = req.body as {
      problemId?: number | string
      language?: string
      code?: string
    }

    if (!problemId || !language || !code) {
      return res.status(400).json({ error: 'problemId, language and code are required' })
    }

    const result = await runAgainstTests({
      problemId: Number(problemId),
      language,
      code,
      mode: 'run',
    })

    return res.status(200).json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to run code'
    return res.status(500).json({ error: message })
  }
}

export async function submitCode(req: AuthenticatedRequest, res: Response) {
  try {
    const { problemId, language, code } = req.body as {
      problemId?: number | string
      language?: string
      code?: string
    }

    if (!problemId || !language || !code) {
      return res.status(400).json({ error: 'problemId, language and code are required' })
    }

    if (!req.user?.userId) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const result = await runAgainstTests({
      problemId: Number(problemId),
      language,
      code,
      mode: 'submit',
    })

    await Submission.create({
      userId: req.user.userId,
      problemId: Number(problemId),
      language,
      status: result.status,
      passed: result.passed,
      total: result.total,
      runtime: String(result.runtime ?? 'N/A'),
      memory: String(result.memory ?? 'N/A'),
      code,
    })

    return res.status(200).json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to submit code'
    return res.status(500).json({ error: message })
  }
}

export async function getMyProblemStatus(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const submissions = await Submission.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .lean()

    const statusByProblem: Record<string, SubmissionStatusShape> = {}

    for (const submission of submissions) {
      const key = String(submission.problemId)
      if (!statusByProblem[key]) {
        statusByProblem[key] = {
          problemId: submission.problemId,
          solved: false,
          submissions: 0,
          lastStatus: submission.status,
          lastSubmittedAt: submission.createdAt,
        }
      }

      statusByProblem[key].submissions += 1
      if (submission.status === 'Accepted') {
        statusByProblem[key].solved = true
      }
    }

    return res.status(200).json({ statusByProblem })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch status'
    return res.status(500).json({ error: message })
  }
}
