# AI Study Planner

A production-oriented AI-enhanced study planning frontend for students. Enter subjects, topics, difficulty, deadlines, and available study hours to generate a structured study plan.

## Stack
- Next.js + TypeScript
- Tailwind CSS
- Claude API
- Vitest + React Testing Library
- axe/WAVE for accessibility
- Vercel for deployment

## Features
- Add and manage subjects/topics
- Record difficulty and deadlines
- Generate a personalized AI study plan
- Review, edit, and complete sessions
- Progress tracking
- Loading, validation, retry, and AI failure states
- Keyboard-accessible responsive interface

## Local setup
```bash
npm install
npm run dev
```

Create `.env.local`:
```env
ANTHROPIC_API_KEY=your_key_here
```

Never commit API keys.

## Architecture
The browser UI communicates with a server-side Next.js route. The server calls the LLM, validates structured output, and returns only valid planner data to the UI.

## Testing
```bash
npm test
npm run test:coverage
```

Replace this README's audit, deployment, and repository evidence with actual project results before submission.

## Deployment
Deploy to Vercel or another supported host. Configure `ANTHROPIC_API_KEY` as a server-side environment variable.

## Rollback
Redeploy the last known-good production commit or revert the faulty commit and redeploy.
