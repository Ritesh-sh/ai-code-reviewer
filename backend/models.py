from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from sqlalchemy.sql import func
from database import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    code = Column(Text, nullable=False)
    language = Column(String(50), nullable=False)
    score = Column(Float, nullable=True)
    bugs = Column(Text, nullable=True)           # JSON string
    security_issues = Column(Text, nullable=True) # JSON string
    performance = Column(Text, nullable=True)     # JSON string
    suggestions = Column(Text, nullable=True)     # JSON string
    improved_code = Column(Text, nullable=True)
    summary = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
