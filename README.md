# AI Code Reviewer

An AI-powered code review tool that analyzes your source code using **Google Gemini API** and provides structured feedback including bugs, security issues, performance improvements, and improved code suggestions.

---

## Tech Stack

| Layer     | Technology       |
| --------- | ---------------- |
| Frontend  | React + Tailwind |
| Backend   | FastAPI (Python) |
| AI Engine | Gemini API       |
| Database  | SQLite (MVP)     |

---

## Project Structure

```
ai-code-reviewer/
├── backend/
│   ├── main.py            # FastAPI app + routes
│   ├── ai_service.py      # Gemini API integration
│   ├── models.py          # SQLAlchemy models
│   ├── schemas.py         # Pydantic schemas
│   ├── database.py        # Database setup
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api/reviewApi.js
│   │   └── components/
│   │       ├── Header.jsx
│   │       ├── CodeInput.jsx
│   │       └── ReviewResult.jsx
│   ├── package.json
│   └── tailwind.config.js
├── architecture.md
├── system-design.md
├── mvp-tech-doc.md
├── prod.md
└── README.md
```

---

## Setup Instructions

### Prerequisites

- Python 3.10+
- Node.js 18+
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env and add your Gemini API key

# Start the server
uvicorn main:app --reload --port 8000
```

The API will be running at `http://localhost:8000`

API docs available at `http://localhost:8000/docs`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint          | Description               |
| ------ | ----------------- | ------------------------- |
| POST   | `/review`         | Submit code for review    |
| POST   | `/review/upload`  | Upload file for review    |
| GET    | `/review/{id}`    | Get review by ID          |
| GET    | `/reviews`        | List all reviews          |

### Example Request

```json
POST /review
{
  "code": "def add(a, b):\n  return a + b",
  "language": "python"
}
```

### Example Response

```json
{
  "id": 1,
  "score": 7,
  "bugs": [],
  "security_issues": [],
  "performance": [],
  "suggestions": ["Add type hints", "Add docstring"],
  "improved_code": "def add(a: int, b: int) -> int:\n    \"\"\"Add two numbers.\"\"\"\n    return a + b",
  "summary": "Clean and simple function. Could benefit from type hints and documentation."
}
```

---

## Features

- **Paste code** and select language for instant AI review
- **Upload files** — auto-detects language from file extension
- **Quality score** (1-10) with color-coded display
- **Bug detection** with severity levels and line numbers
- **Security analysis** with fix recommendations
- **Performance suggestions** for optimization
- **Improved code** — AI-generated corrected version

---

## Deployment

| Component | Platform     |
| --------- | ------------ |
| Frontend  | Vercel       |
| Backend   | Render / AWS |

---

## License

MIT
