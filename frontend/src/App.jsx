import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { useAuth } from './hooks/useAuth'
import { Signup, Signin } from './pages/Auth'
import { problemsAPI } from './services/api'
import AppFooter from './components/AppFooter'
import './App.css'

const LANGUAGE_OPTIONS = [
  { label: 'C++', value: 'cpp', monaco: 'cpp' },
  { label: 'Java', value: 'java', monaco: 'java' },
  { label: 'Python', value: 'python', monaco: 'python' },
  { label: 'JavaScript', value: 'javascript', monaco: 'javascript' },
]

function getStarterCode(problems, problemId, language) {
  const problem = problems.find((item) => item.id === problemId)
  return problem?.templates?.[language] ?? ''
}

function getDifficultyClass(difficulty) {
  if (difficulty === 'Easy') return 'difficulty-easy'
  if (difficulty === 'Medium') return 'difficulty-medium'
  return 'difficulty-hard'
}

function ProblemBoard() {
  const [problems, setProblems] = useState([])
  const [loadingProblems, setLoadingProblems] = useState(true)
  const [selectedProblemId, setSelectedProblemId] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [solutions, setSolutions] = useState({})
  const [result, setResult] = useState(null)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [editorNonce, setEditorNonce] = useState(0)
  const [statusByProblem, setStatusByProblem] = useState({})
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

  const openProblem = (problemId) => {
    setSelectedProblemId(problemId)
    setResult(null)
    setEditorNonce((previous) => previous + 1)
  }

  const updateCode = (newCode) => {
    if (!selectedProblem) return

    setSolutions((previous) => ({
      ...previous,
      [selectedProblem.id]: {
        ...(previous[selectedProblem.id] ?? {}),
        [selectedLanguage]: newCode ?? '',
      },
    }))
  }

  const changeLanguage = (language) => {
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

  const evaluate = async (type) => {
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
      setResult({
        type,
        status: 'Execution Error',
        tests: '0 / 0 testcases passed',
        runtime: 'Runtime: N/A',
        memory: 'Memory: N/A',
        title: selectedProblem.title,
        language: LANGUAGE_OPTIONS.find((option) => option.value === selectedLanguage)?.label,
        timestamp: new Date().toLocaleTimeString(),
        reason: error.response?.data?.error || 'Failed to execute code. Try again.',
      })
    } finally {
      setIsEvaluating(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  const goToSignin = () => {
    navigate('/signin')
  }

  const goToSignup = () => {
    navigate('/signup')
  }

  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoadingProblems(true)
        const response = await problemsAPI.getProblems()
        const nextProblems = (response.data?.problems ?? []).map((problem) => ({
          ...problem,
          id: problem.problemId,
        }))
        setProblems(nextProblems)
      } catch {
        setProblems([])
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
                <button className="ghost-btn" onClick={goToSignin}>
                  Sign In
                </button>
                <button className="submit-btn" onClick={goToSignup}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </header>

        <section className="problem-table">
          <div className="table-head">
            <span>Title</span>
            <span>Difficulty</span>
            <span>Acceptance</span>
            <span>Topics</span>
          </div>

          {problems.map((problem) => (
            <button
              key={problem.id}
              className="table-row"
              onClick={() => openProblem(problem.id)}
            >
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
          <h2>{selectedProblem.id}. {selectedProblem.title}</h2>
          <p className={getDifficultyClass(selectedProblem.difficulty)}>{selectedProblem.difficulty}</p>
        </div>
        {user ? (
          <button className="ghost-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="ghost-btn" onClick={goToSignin}>
              Sign In
            </button>
            <button className="submit-btn" onClick={goToSignup}>
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
              onChange={(event) => changeLanguage(event.target.value)}
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
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: '#9eb0cb' }}>Loading...</div>
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
