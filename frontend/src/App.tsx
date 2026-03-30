import Editor from '@monaco-editor/react'
import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import AppFooter from './components/AppFooter'
import { useAuth } from './hooks/useAuth'
import { Signin, Signup } from './pages/Auth'
import { problemsAPI } from './services/api'
import type { EvaluationResult, Problem, SubmissionStatus } from './types'
import './App.css'

type LanguageOption = {
  label: string
  value: 'cpp' | 'java' | 'python' | 'javascript'
  monaco: string
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { label: 'C++', value: 'cpp', monaco: 'cpp' },
  { label: 'Java', value: 'java', monaco: 'java' },
  { label: 'Python', value: 'python', monaco: 'python' },
  { label: 'JavaScript', value: 'javascript', monaco: 'javascript' },
]

const LOCAL_FALLBACK_PROBLEMS: Problem[] = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    acceptance: 'N/A',
    tags: ['Array', 'Hash Table'],
    statement: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
    examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
    templates: {
      cpp: 'class Solution { public: vector<int> twoSum(vector<int>& nums, int target) { return {}; } };',
      java: 'class Solution { public int[] twoSum(int[] nums, int target) { return new int[]{}; } }',
      python: 'class Solution:\n    def twoSum(self, nums, target):\n        return []',
      javascript:
        '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n  // TODO\n};',
    },
  },
  {
    id: 2,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    acceptance: 'N/A',
    tags: ['String', 'Stack'],
    statement: 'Given a string s containing just the characters ()[]{} determine if the input string is valid.',
    examples: [{ input: 's = "()[]{}"', output: 'true' }],
    constraints: ['1 <= s.length <= 10^4'],
    templates: {
      cpp: 'class Solution { public: bool isValid(string s) { return false; } };',
      java: 'class Solution { public boolean isValid(String s) { return false; } }',
      python: 'class Solution:\n    def isValid(self, s):\n        return False',
      javascript:
        '/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n  // TODO\n};',
    },
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    acceptance: 'N/A',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    statement: 'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [{ input: 's = "abcabcbb"', output: '3' }],
    constraints: ['0 <= s.length <= 5 * 10^4'],
    templates: {
      cpp: 'class Solution { public: int lengthOfLongestSubstring(string s) { return 0; } };',
      java: 'class Solution { public int lengthOfLongestSubstring(String s) { return 0; } }',
      python: 'class Solution:\n    def lengthOfLongestSubstring(self, s):\n        return 0',
      javascript:
        '/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n  // TODO\n};',
    },
  },
]

function getStarterCode(problems: Problem[], problemId: number, language: string) {
  const problem = problems.find((item) => item.id === problemId)
  return problem?.templates?.[language as keyof Problem['templates']] ?? ''
}

function getDifficultyClass(difficulty: string) {
  if (difficulty === 'Easy') return 'difficulty-easy'
  if (difficulty === 'Medium') return 'difficulty-medium'
  return 'difficulty-hard'
}

type ApiError = {
  response?: {
    data?: {
      error?: string
    }
  }
}

function ProblemBoard() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [loadingProblems, setLoadingProblems] = useState(true)
  const [problemLoadError, setProblemLoadError] = useState<string | null>(null)
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption['value']>('javascript')
  const [solutions, setSolutions] = useState<Record<number, Record<string, string>>>({})
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [editorNonce, setEditorNonce] = useState(0)
  const [statusByProblem, setStatusByProblem] = useState<Record<string, SubmissionStatus>>({})
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  const submitLocked = !token

  const selectedProblem = useMemo(
    () => problems.find((problem) => problem.id === selectedProblemId) ?? null,
    [problems, selectedProblemId],
  )

  const currentCode = useMemo(() => {
    if (!selectedProblem) return ''
    const saved = solutions[selectedProblem.id]?.[selectedLanguage]
    return saved ?? getStarterCode(problems, selectedProblem.id, selectedLanguage)
  }, [problems, selectedLanguage, selectedProblem, solutions])

  const openProblem = (problemId: number) => {
    setSelectedProblemId(problemId)
    setResult(null)
    setEditorNonce((previous) => previous + 1)
  }

  const updateCode = (newCode: string | undefined) => {
    if (!selectedProblem) return

    setSolutions((previous) => ({
      ...previous,
      [selectedProblem.id]: {
        ...(previous[selectedProblem.id] ?? {}),
        [selectedLanguage]: newCode ?? '',
      },
    }))
  }

  const changeLanguage = (language: LanguageOption['value']) => {
    setSelectedLanguage(language)
    if (!selectedProblem) return

    setSolutions((previous) => {
      const problemSolutions = previous[selectedProblem.id] ?? {}
      if (problemSolutions[language]) return previous

      return {
        ...previous,
        [selectedProblem.id]: {
          ...problemSolutions,
          [language]: getStarterCode(problems, selectedProblem.id, language),
        },
      }
    })
    setEditorNonce((previous) => previous + 1)
  }

  const resetCode = () => {
    if (!selectedProblem) return

    setSolutions((previous) => ({
      ...previous,
      [selectedProblem.id]: {
        ...(previous[selectedProblem.id] ?? {}),
        [selectedLanguage]: getStarterCode(problems, selectedProblem.id, selectedLanguage),
      },
    }))
    setResult(null)
    setEditorNonce((previous) => previous + 1)
  }

  const evaluate = async (type: EvaluationResult['type']) => {
    if (!selectedProblem) return

    if (type === 'submit' && !token) {
      setResult({
        type,
        status: 'Login Required',
        tests: '0 / 0 testcases passed',
        runtime: 'Runtime: N/A',
        memory: 'Memory: N/A',
        title: selectedProblem.title,
        language: LANGUAGE_OPTIONS.find((option) => option.value === selectedLanguage)?.label,
        timestamp: new Date().toLocaleTimeString(),
        reason: 'Please sign in or sign up to submit your solution.',
      })
      return
    }

    const starterCode = getStarterCode(problems, selectedProblem.id, selectedLanguage)
    const normalizedCurrent = (currentCode ?? '').trim()
    const normalizedStarter = (starterCode ?? '').trim()
    const hasTodoMarker = /TODO:\s*Implement/i.test(normalizedCurrent)

    if (!normalizedCurrent || normalizedCurrent === normalizedStarter || hasTodoMarker) {
      setResult({
        type,
        status: 'Rejected',
        tests: '0 / 13 testcases passed',
        runtime: 'Runtime: N/A',
        memory: 'Memory: N/A',
        title: selectedProblem.title,
        language: LANGUAGE_OPTIONS.find((option) => option.value === selectedLanguage)?.label,
        timestamp: new Date().toLocaleTimeString(),
        reason: '',
      })
      return
    }

    setIsEvaluating(true)

    try {
      const response =
        type === 'run'
          ? await problemsAPI.runCode(selectedProblem.id, normalizedCurrent, selectedLanguage)
          : await problemsAPI.submitCode(selectedProblem.id, normalizedCurrent, selectedLanguage)

      const data = response.data
      if (type === 'submit' && data.status === 'Accepted') {
        setStatusByProblem((previous) => ({
          ...previous,
          [String(selectedProblem.id)]: {
            problemId: selectedProblem.id,
            solved: true,
            submissions: (previous[String(selectedProblem.id)]?.submissions ?? 0) + 1,
            lastStatus: data.status,
            lastSubmittedAt: new Date().toISOString(),
          },
        }))
      }
      setResult({
        type,
        status: data.status,
        tests: `${data.passed} / ${data.total} testcases passed`,
        runtime: `Runtime: ${data.runtime}`,
        memory: `Memory: ${data.memory}`,
        title: selectedProblem.title,
        language: LANGUAGE_OPTIONS.find((option) => option.value === selectedLanguage)?.label,
        timestamp: new Date().toLocaleTimeString(),
        reason: data.error || '',
      })
    } catch (error) {
      const apiError = error as ApiError
      setResult({
        type,
        status: 'Execution Error',
        tests: '0 / 0 testcases passed',
        runtime: 'Runtime: N/A',
        memory: 'Memory: N/A',
        title: selectedProblem.title,
        language: LANGUAGE_OPTIONS.find((option) => option.value === selectedLanguage)?.label,
        timestamp: new Date().toLocaleTimeString(),
        reason: apiError.response?.data?.error || 'Failed to execute code. Try again.',
      })
    } finally {
      setIsEvaluating(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoadingProblems(true)
        setProblemLoadError(null)
        const response = await problemsAPI.getProblems()
        const nextProblems = (response.data?.problems ?? []).map((problem) => ({
          ...problem,
          id: problem.problemId,
        }))
        setProblems(nextProblems)
      } catch {
        // Keep the app usable even when backend is not running.
        setProblems(LOCAL_FALLBACK_PROBLEMS)
        setProblemLoadError('Backend is unreachable. Showing local practice set.')
      } finally {
        setLoadingProblems(false)
      }
    }

    loadProblems()
  }, [])

  useEffect(() => {
    const loadMyStatus = async () => {
      if (!token) {
        setStatusByProblem({})
        return
      }

      try {
        const response = await problemsAPI.getMyProblemStatus()
        setStatusByProblem(response.data?.statusByProblem ?? {})
      } catch {
        setStatusByProblem({})
      }
    }

    loadMyStatus()
  }, [token])

  if (loadingProblems) {
    return (
      <main className="problemset-page">
        <header className="problemset-header">
          <h1>Problemset</h1>
          <p>Loading problems...</p>
        </header>
        <AppFooter />
      </main>
    )
  }

  if (!selectedProblem) {
    return (
      <main className="problemset-page">
        <header className="problemset-header">
          <div>
            <p className="eyebrow">Code Arena</p>
            <h1>Problems</h1>
            <p>
              Pick a challenge and jump into a split coding workspace with multi-language starter
              templates.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {user ? (
              <>
                <span style={{ color: '#9eb0cb', fontSize: '0.9rem' }}>Hi, {user.fullName}</span>
                <button className="ghost-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="ghost-btn" onClick={() => navigate('/signin')}>
                  Sign In
                </button>
                <button className="submit-btn" onClick={() => navigate('/signup')}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </header>

        <section className="problem-table">
          {problemLoadError && (
            <div
              style={{
                margin: '0 0 14px',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid rgba(234, 179, 8, 0.35)',
                background: 'rgba(234, 179, 8, 0.08)',
                color: '#facc15',
                fontSize: '0.9rem',
              }}
            >
              {problemLoadError}
            </div>
          )}
          <div className="table-head">
            <span>Title</span>
            <span>Difficulty</span>
            <span>Acceptance</span>
            <span>Topics</span>
          </div>

          {!problems.length && (
            <div
              style={{
                padding: '16px',
                color: '#9eb0cb',
              }}
            >
              No problems available right now.
            </div>
          )}

          {problems.map((problem) => (
            <button key={problem.id} className="table-row" onClick={() => openProblem(problem.id)}>
              <span className="title-cell">
                {problem.id}. {problem.title}
                {statusByProblem[String(problem.id)]?.solved && (
                  <span className="solved-badge">Solved</span>
                )}
              </span>
              <span className={getDifficultyClass(problem.difficulty)}>{problem.difficulty}</span>
              <span>{problem.acceptance}</span>
              <span className="tags-cell">{problem.tags.join(' • ')}</span>
            </button>
          ))}
        </section>
        <AppFooter />
      </main>
    )
  }

  return (
    <main className="workspace-page">
      <header className="workspace-header">
        <button className="ghost-btn" onClick={() => setSelectedProblemId(null)}>
          Back to Problems
        </button>
        <div>
          <h2>
            {selectedProblem.id}. {selectedProblem.title}
          </h2>
          <p className={getDifficultyClass(selectedProblem.difficulty)}>{selectedProblem.difficulty}</p>
        </div>
        {user ? (
          <button className="ghost-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="ghost-btn" onClick={() => navigate('/signin')}>
              Sign In
            </button>
            <button className="submit-btn" onClick={() => navigate('/signup')}>
              Sign Up
            </button>
          </div>
        )}
      </header>

      <section className="workspace-grid">
        <article className="problem-pane">
          <h3>Description</h3>
          <p>{selectedProblem.statement}</p>

          <h3>Examples</h3>
          {selectedProblem.examples.map((example) => (
            <div className="example-card" key={example.input}>
              <p>
                <strong>Input:</strong> {example.input}
              </p>
              <p>
                <strong>Output:</strong> {example.output}
              </p>
            </div>
          ))}

          <h3>Constraints</h3>
          <ul>
            {selectedProblem.constraints.map((constraint) => (
              <li key={constraint}>{constraint}</li>
            ))}
          </ul>
        </article>

        <section className="editor-pane">
          <div className="editor-toolbar">
            <select
              value={selectedLanguage}
              onChange={(event) => changeLanguage(event.target.value as LanguageOption['value'])}
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="editor-actions">
              <button className="ghost-btn" onClick={resetCode}>
                Reset
              </button>
              <button className="run-btn" onClick={() => evaluate('run')} disabled={isEvaluating}>
                {isEvaluating ? 'Running...' : 'Run'}
              </button>
              <div className="submit-lock-wrapper">
                <button
                  className="submit-btn"
                  onClick={() => evaluate('submit')}
                  disabled={isEvaluating || submitLocked}
                  title={submitLocked ? 'Sign in to unlock submit' : 'Submit solution'}
                >
                  {submitLocked ? 'Submit (Locked)' : isEvaluating ? 'Submitting...' : 'Submit'}
                </button>
                {submitLocked && <span className="submit-lock-tooltip">Login to unlock submit</span>}
              </div>
            </div>
          </div>

          <div className="editor-shell">
            <Editor
              key={`${selectedProblem.id}-${selectedLanguage}-${editorNonce}`}
              height="100%"
              language={LANGUAGE_OPTIONS.find((option) => option.value === selectedLanguage)?.monaco}
              value={currentCode}
              onChange={updateCode}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'IBM Plex Mono, monospace',
                padding: { top: 14 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>

          <div className="result-panel">
            {!result && <p>Run or submit your code to see execution details.</p>}
            {result && (
              <>
                <p className="result-title">
                  {result.type.toUpperCase()} • {result.status}
                </p>
                {result.reason && <p>{result.reason}</p>}
                <p>{result.tests}</p>
                <p>{result.runtime}</p>
                <p>{result.memory}</p>
                <p>
                  Problem: {result.title} • Language: {result.language} • Time: {result.timestamp}
                </p>
              </>
            )}
          </div>
        </section>
      </section>
      <AppFooter />
    </main>
  )
}

function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          color: '#9eb0cb',
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/problems" element={<ProblemBoard />} />
        <Route path="/" element={<Navigate to="/problems" replace />} />
        <Route path="*" element={<Navigate to="/problems" replace />} />
      </Routes>
    </Router>
  )
}

export default App
