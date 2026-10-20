# SkillScan.AI

SkillScan.AI helps you prepare for a job interview by comparing your profile
with a job description. Provide a PDF resume, a self-description, or both; the
app uses Google Gemini to create a personalized interview report with a profile
match score, technical and behavioral questions, skill gaps, and a preparation
plan.

## Live demo

- **Application:** [d-skill-scan-ai.netlify.app](https://d-skill-scan-ai.netlify.app/)
- **Backend API:** [skillscan-ai-n3ii.onrender.com](https://skillscan-ai-n3ii.onrender.com)

## Features

- Register and sign in with an account.
- Generate an interview plan from a job description and your resume or
  self-description.
- Review suggested technical and behavioral questions, their intent, and
  example answers.
- See identified skill gaps and a day-by-day preparation plan.
- Revisit your saved interview reports.

## Technology

- **Frontend:** React, Vite, React Router, Sass, and Axios
- **Backend:** Node.js, Express, and MongoDB with Mongoose
- **AI:** Google Gemini through the Google GenAI SDK

## Requirements

- Node.js 20.19 or newer
- npm
- A MongoDB database
- A Google Gemini API key

## Run locally

### 1. Configure the backend

Create `Backend/.env` with the following values:

```env
MONGO_URI
JWT_SECRET
SKILLSCAN_GENAI_API_KEY
CLIENT_URL=http://localhost:5173
```

### 2. Start the backend

```sh
cd Backend
npm install
npm run dev
```

The API starts on `http://localhost:3000` by default. Set `PORT` to change the
port.

### 3. Start the frontend

In a separate terminal:

```sh
cd Frontend
npm install
npm run dev
```

Vite prints the local frontend URL when it starts (normally
`http://localhost:5173`). The frontend uses `http://localhost:3000` as its
default API URL. To use another backend URL, create `Frontend/.env.local`:

```env
VITE_API_URL
```

For a different frontend origin, set the backend's `CLIENT_URL` to that origin.

## Using the app

1. Register or log in.
2. Enter the target job description.
3. Upload a text-based PDF resume, enter a self-description, or provide both.
   Resume PDFs must be no larger than 5 MB.
4. Generate the report, then explore the questions, skill gaps, and preparation
   plan. Reports are saved to your account for later review.

## API overview

The backend provides these endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create an account |
| `POST` | `/api/auth/login` | Sign in |
| `GET` | `/api/auth/logout` | Sign out |
| `GET` | `/api/auth/get-me` | Get the current user's details |
| `POST` | `/api/interview/` | Generate a report; accepts multipart form data with `jobDescription`, optional `selfDescription`, and optional PDF field `resume` |
| `GET` | `/api/interview/` | List the current user's reports |
| `GET` | `/api/interview/report/:interviewID` | Fetch one of the current user's reports |

Interview endpoints and the current-user endpoint require authentication. The
backend uses an HTTP-only cookie for the login token, so API requests from the
frontend include credentials.

## Development checks

Run each command from its project directory:

```sh
# Backend
cd Backend
npm test

# Frontend (run from a separate terminal)
cd Frontend
npm run lint
npm run build
```

## Author

[Divyanshu Sahu](https://divyanshu-sahu.netlify.app/)
