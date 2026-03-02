# MVP Technical Document

## 1. Goal

Build Minimum Viable Product of AI Code Reviewer.

---

## 2. MVP Features

Must Have:

- Paste code
- Select language
- Click Review
- Show feedback

Nice to Have:

- File upload
- Score

Not in MVP:

- GitHub integration
- Authentication

---

## 3. Tech Stack

Frontend:

React

Backend:

FastAPI

AI:

Gemini API

Database:

SQLite

---

## 4. API Design

POST /review

Request:

{
"code": "string",
"language": "java"
}

Response:

{
"score": 8,
"bugs": []
}

---

## 5. MVP Architecture

Frontend → Backend → Gemini API

---

## 6. Deployment

Frontend:

Vercel

Backend:

Render

---

## 7. Timeline

Week 1:

Backend

Week 2:

Frontend

Week 3:

Deploy