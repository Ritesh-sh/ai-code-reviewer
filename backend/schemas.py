from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


# --- Request Schemas ---

class ReviewRequest(BaseModel):
    code: str
    language: str


class FileUploadResponse(BaseModel):
    code: str
    language: str


# --- Response Schemas ---

class BugItem(BaseModel):
    line: Optional[int] = None
    issue: str
    severity: str  # "low", "medium", "high", "critical"


class SecurityItem(BaseModel):
    issue: str
    severity: str
    recommendation: str


class PerformanceItem(BaseModel):
    issue: str
    suggestion: str


class ReviewResponse(BaseModel):
    id: int
    code: str
    language: str
    score: float
    bugs: List[BugItem]
    security_issues: List[SecurityItem]
    performance: List[PerformanceItem]
    suggestions: List[str]
    improved_code: str
    summary: str
    created_at: datetime

    class Config:
        from_attributes = True
