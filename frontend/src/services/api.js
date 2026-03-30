import axios from 'axios'

const API_BASE_URL = 'http://localhost:5001'

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export const authAPI = {
  signup: (email, password, fullName) =>
    api.post('/auth/signup', { email, password, fullName }),
  signin: (email, password) => api.post('/auth/signin', { email, password }),
  getProfile: () => api.get('/auth/profile'),
}

export const problemsAPI = {
  getProblems: () => api.get('/api/problems'),
  getMyProblemStatus: () => api.get('/api/problems/status/me'),
  runCode: (problemId, code, language) =>
    api.post('/api/problems/run', { problemId, code, language }),
  submitCode: (problemId, code, language) =>
    api.post('/api/problems/submit', { problemId, code, language }),
}

export default api
