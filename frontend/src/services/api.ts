import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios'
import type { AuthResponse, Problem, SubmissionStatus } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5001'

type ProblemsResponse = {
  problems: Array<Problem & { problemId: number }>
}

type ProblemStatusResponse = {
  statusByProblem: Record<string, SubmissionStatus>
}

type JudgeResultResponse = {
  status: string
  passed: number
  total: number
  runtime: string
  memory: string
  error?: string
}

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders()
      }
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  },
  (error) => Promise.reject(error),
)

export const authAPI = {
  signup: (email: string, password: string, fullName: string) =>
    api.post<AuthResponse>('/auth/signup', { email, password, fullName }),
  signin: (email: string, password: string) => api.post<AuthResponse>('/auth/signin', { email, password }),
  getProfile: () => api.get<{ user: AuthResponse['user'] }>('/auth/profile'),
}

export const problemsAPI = {
  getProblems: () => api.get<ProblemsResponse>('/api/problems'),
  getMyProblemStatus: () => api.get<ProblemStatusResponse>('/api/problems/status/me'),
  runCode: (problemId: number, code: string, language: string) =>
    api.post<JudgeResultResponse>('/api/problems/run', { problemId, code, language }),
  submitCode: (problemId: number, code: string, language: string) =>
    api.post<JudgeResultResponse>('/api/problems/submit', { problemId, code, language }),
}

export default api
