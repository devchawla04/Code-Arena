# LeetCode Clone

A full-stack coding practice platform inspired by LeetCode.

## Project Overview

This project includes:

- Frontend: React + Vite + Monaco Editor
- Backend: Node.js + Express + MongoDB
- Auth: JWT-based signup/signin
- Code execution: Judge0 integration for Run/Submit
- Submission tracking: Stores user submissions and solved status

## Folder Structure

- `frontend/` - React client app
- `backend/` - Express API server

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB connection string (Atlas or local)
- Internet access for Judge0 API (`https://ce.judge0.com`)

## Backend Setup

1. Go to backend:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update `.env` values:

```env
PORT=5001
JWT_SECRET=your-super-secret-jwt-key-change-in-production-12345
MONGO_URI=your-mongodb-connection-string
JUDGE0_URL=https://ce.judge0.com
```

5. Run backend in development:

```bash
npm run dev
```

Backend will start at:

- `http://localhost:5001`

Useful endpoint check:

- `GET http://localhost:5001/health`

## Frontend Setup

1. Open a new terminal and go to frontend:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run frontend:

```bash
npm run dev
```

Frontend will start on an available Vite port, typically:

- `http://localhost:5173`

## Running Frontend and Backend Together

Use two terminals:

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

## Available Scripts

### Backend

- `npm run dev` - Start backend with nodemon
- `npm start` - Start backend in normal mode

### Frontend

- `npm run dev` - Start Vite dev server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Core Features

- Problem list with acceptance rate and metadata
- Split layout (problem description + code editor)
- Multi-language editor support (JS, Python, Java, C++)
- Run code without login
- Submit locked for guest users
- Signup/signin required for submission
- Submission history tracking per user
- Solved badges for accepted problems

## Notes

- Problems are seeded and served from MongoDB by backend API.
- If backend is not running, frontend cannot fetch live problem data.
- Judge0 availability affects Run/Submit execution responses.

## Author

Built by Dev Chawla.
