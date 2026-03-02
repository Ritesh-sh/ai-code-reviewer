# Architecture Document — AI Code Reviewer

## 1. Overview

AI Code Reviewer is a web-based system that analyzes source code using LLMs and provides structured feedback including bugs, security issues, performance improvements, and improved code suggestions.

The system follows a modular microservice-friendly architecture.

---

## 2. High-Level Architecture

Client → API Gateway → Backend Service → AI Service → Database → Cache

---

## 3. Components

### 3.1 Frontend

Responsibilities:

- Code input
- File upload
- Display review results
- Authentication

Tech:

- React.js
- TailwindCSS

---

### 3.2 Backend Service

Responsibilities:

- Handle API requests
- Validate input
- Call AI service
- Store results

Tech:

- FastAPI

---

### 3.3 AI Service

Responsibilities:

- Prompt engineering
- Call Gemini/OpenAI API
- Parse response

---

### 3.4 Database

Responsibilities:

- Store:

  - Users
  - Reviews
  - Files
  - Scores

Tech:

- PostgreSQL

---

### 3.5 Cache Layer

Responsibilities:

- Cache frequent reviews

Tech:

- Redis

---

## 4. Architecture Diagram

Frontend
↓
Backend
↓
AI Service
↓
Gemini API

Backend
↓
PostgreSQL

Backend
↓
Redis

---

## 5. Deployment Architecture

Frontend → Vercel

Backend → AWS EC2

Database → AWS RDS

Cache → Redis Cloud

---

## 6. Scalability

Horizontal scaling supported.

Stateless backend.

---

## 7. Security

HTTPS

JWT Authentication

Input validation

Rate limiting