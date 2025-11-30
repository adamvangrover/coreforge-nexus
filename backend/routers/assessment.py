from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/assessment",
    tags=["Assessment"],
)

class QuizSubmission(BaseModel):
    quiz_id: str
    answers: dict[str, str] # question_id: answer

class QuizResult(BaseModel):
    quiz_id: str
    score: float
    passed: bool

@router.post("/submit-quiz", response_model=QuizResult)
async def submit_quiz(submission: QuizSubmission):
    """
    Submit a full quiz for grading.
    DEV_NOTE: This is a placeholder. Future implementation should fetch quiz key
    from database and grade the submission.
    """
    return QuizResult(
        quiz_id=submission.quiz_id,
        score=85.0,
        passed=True
    )
