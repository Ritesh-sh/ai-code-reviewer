import json
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db, Base
from models import Review
from schemas import ReviewRequest, ReviewResponse, BugItem, SecurityItem, PerformanceItem
from ai_service import review_code

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Code Reviewer",
    description="Analyze source code using Gemini AI and get structured feedback",
    version="1.0.0",
)

# CORS — allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ───────────────────────── ROUTES ─────────────────────────


@app.get("/")
def health_check():
    return {"status": "ok", "message": "AI Code Reviewer API is running"}


@app.post("/review", response_model=ReviewResponse)
async def create_review(req: ReviewRequest, db: Session = Depends(get_db)):
    """Submit code for AI review."""
    if not req.code.strip():
        raise HTTPException(status_code=400, detail="Code cannot be empty")

    # Call Gemini AI
    result = await review_code(req.code, req.language)

    # Save to database
    review = Review(
        code=req.code,
        language=req.language,
        score=result["score"],
        bugs=json.dumps(result["bugs"]),
        security_issues=json.dumps(result["security_issues"]),
        performance=json.dumps(result["performance"]),
        suggestions=json.dumps(result["suggestions"]),
        improved_code=result["improved_code"],
        summary=result["summary"],
    )
    db.add(review)
    db.commit()
    db.refresh(review)

    return _format_review(review)


@app.post("/review/upload", response_model=ReviewResponse)
async def upload_and_review(
    file: UploadFile = File(...),
    language: str = Form("auto"),
    db: Session = Depends(get_db),
):
    """Upload a file for AI review."""
    contents = await file.read()
    code = contents.decode("utf-8")

    if not code.strip():
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    # Auto-detect language from extension
    if language == "auto":
        ext_map = {
            ".py": "python", ".js": "javascript", ".ts": "typescript",
            ".java": "java", ".cpp": "cpp", ".c": "c", ".cs": "csharp",
            ".go": "go", ".rs": "rust", ".rb": "ruby", ".php": "php",
            ".swift": "swift", ".kt": "kotlin", ".html": "html",
            ".css": "css", ".sql": "sql", ".sh": "bash",
        }
        ext = "." + file.filename.rsplit(".", 1)[-1] if "." in file.filename else ""
        language = ext_map.get(ext.lower(), "text")

    result = await review_code(code, language)

    review = Review(
        code=code,
        language=language,
        score=result["score"],
        bugs=json.dumps(result["bugs"]),
        security_issues=json.dumps(result["security_issues"]),
        performance=json.dumps(result["performance"]),
        suggestions=json.dumps(result["suggestions"]),
        improved_code=result["improved_code"],
        summary=result["summary"],
    )
    db.add(review)
    db.commit()
    db.refresh(review)

    return _format_review(review)


@app.get("/review/{review_id}", response_model=ReviewResponse)
def get_review(review_id: int, db: Session = Depends(get_db)):
    """Get a review by ID."""
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return _format_review(review)


@app.get("/reviews")
def list_reviews(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    """List recent reviews."""
    reviews = (
        db.query(Review)
        .order_by(Review.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return [_format_review(r) for r in reviews]


# ───────────────────────── HELPERS ─────────────────────────


def _format_review(review: Review) -> dict:
    """Convert DB model to response dict with parsed JSON fields."""
    return {
        "id": review.id,
        "code": review.code,
        "language": review.language,
        "score": review.score or 0,
        "bugs": json.loads(review.bugs or "[]"),
        "security_issues": json.loads(review.security_issues or "[]"),
        "performance": json.loads(review.performance or "[]"),
        "suggestions": json.loads(review.suggestions or "[]"),
        "improved_code": review.improved_code or "",
        "summary": review.summary or "",
        "created_at": review.created_at,
    }
