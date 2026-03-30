const { runAgainstTests } = require('../services/judgeService')
const { Submission } = require('../models/submissionModel')
const { Problem } = require('../models/problemModel')
const { SEEDED_PROBLEMS } = require('../constants/problemSeed')

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

async function getProblems(_req, res) {
  try {
    await ensureProblemsSeeded()
    const problems = await Problem.find({}).sort({ problemId: 1 }).lean()
    return res.status(200).json({ problems })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function runCode(req, res) {
  try {
    const { problemId, language, code } = req.body

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
    return res.status(500).json({ error: error.message })
  }
}

async function submitCode(req, res) {
  try {
    const { problemId, language, code } = req.body

    if (!problemId || !language || !code) {
      return res.status(400).json({ error: 'problemId, language and code are required' })
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
    return res.status(500).json({ error: error.message })
  }
}

async function getMyProblemStatus(req, res) {
  try {
    const submissions = await Submission.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .lean()

    const statusByProblem = {}

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

    return res.status(200).json({
      statusByProblem,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getProblems,
  runCode,
  submitCode,
  getMyProblemStatus,
}
