import os
import re
from fastapi import APIRouter, HTTPException, Path
from fastapi.responses import PlainTextResponse
import aiofiles
from typing import List

# DEV_NOTE: Define the base path to the curriculum directory.
# This should ideally be configurable or determined more robustly.
CURRICULUM_BASE_PATH = "./curriculum"
# DEV_NOTE: In a Docker container, this path is relative to the WORKDIR /app

router = APIRouter(
    prefix="/api/v1/curriculum",
    tags=["Curriculum"],
    responses={404: {"description": "Not found"}},
)

def sanitize_slug(slug: str) -> str:
    """Helper to prevent directory traversal and clean slugs."""
    # Remove any non-alphanumeric, underscore, or hyphen characters.
    # Specifically disallow '..' to prevent path traversal.
    if ".." in slug:
        raise HTTPException(status_code=400, detail="Invalid path component '..'")
    slug = re.sub(r'[^a-zA-Z0-9_/-]+', '', slug)
    return slug.strip('/') # Ensure no leading/trailing slashes from slug itself

@router.get("/grade-levels", response_model=List[str])
async def get_grade_levels():
    """
    Lists available grade levels by scanning the curriculum directory.
    Each subdirectory in CURRICULUM_BASE_PATH is considered a grade level.
    """
    try:
        # DEV_NOTE: Ensure CURRICULUM_BASE_PATH exists
        if not os.path.exists(CURRICULUM_BASE_PATH) or not os.path.isdir(CURRICULUM_BASE_PATH):
            raise HTTPException(status_code=500, detail="Curriculum directory not configured or found.")

        grade_levels = [
            name for name in os.listdir(CURRICULUM_BASE_PATH)
            if os.path.isdir(os.path.join(CURRICULUM_BASE_PATH, name)) and not name.startswith('.')
        ]
        if not grade_levels:
            # DEV_NOTE: This could also be a 404 if no grade levels are considered "not found" for the resource.
            # However, an empty list is a valid response if the directory is empty.
            # For now, let's assume an empty list is acceptable.
            pass
        return grade_levels
    except Exception as e:
        # DEV_NOTE: Log the exception e for server-side debugging
        print(f"Error listing grade levels: {e}")
        raise HTTPException(status_code=500, detail="Error listing grade levels.")


@router.get("/{grade_level_slug}/subjects", response_model=List[str])
async def get_subjects_for_grade_level(
    grade_level_slug: str = Path(..., title="Grade Level Slug", description="The slug identifying the grade level (directory name).")
):
    """
    Lists available subjects for a given grade level.
    """
    safe_grade_level_slug = sanitize_slug(grade_level_slug)
    grade_level_path = os.path.join(CURRICULUM_BASE_PATH, safe_grade_level_slug)

    if not os.path.exists(grade_level_path) or not os.path.isdir(grade_level_path):
        raise HTTPException(status_code=404, detail=f"Grade level '{safe_grade_level_slug}' not found.")

    try:
        subjects = [
            name for name in os.listdir(grade_level_path)
            if os.path.isdir(os.path.join(grade_level_path, name)) and not name.startswith('.')
        ]
        return subjects
    except Exception as e:
        print(f"Error listing subjects for {safe_grade_level_slug}: {e}")
        raise HTTPException(status_code=500, detail=f"Error listing subjects for grade level '{safe_grade_level_slug}'.")


@router.get("/{grade_level_slug}/{subject_slug}/lessons", response_model=List[str])
async def get_lessons_for_subject(
    grade_level_slug: str = Path(..., title="Grade Level Slug"),
    subject_slug: str = Path(..., title="Subject Slug")
):
    """
    Lists available .md lesson files for a given subject within a grade level.
    """
    safe_grade_level_slug = sanitize_slug(grade_level_slug)
    safe_subject_slug = sanitize_slug(subject_slug)
    subject_path = os.path.join(CURRICULUM_BASE_PATH, safe_grade_level_slug, safe_subject_slug)

    if not os.path.exists(subject_path) or not os.path.isdir(subject_path):
        raise HTTPException(status_code=404, detail=f"Subject '{safe_subject_slug}' in grade level '{safe_grade_level_slug}' not found.")

    try:
        lessons = [
            name for name in os.listdir(subject_path)
            if os.path.isfile(os.path.join(subject_path, name)) and name.endswith('.md') and not name.startswith('.')
        ]
        return lessons
    except Exception as e:
        print(f"Error listing lessons for {safe_grade_level_slug}/{safe_subject_slug}: {e}")
        raise HTTPException(status_code=500, detail="Error listing lessons.")


@router.get("/{grade_level_slug}/{subject_slug}/{lesson_filename}", response_class=PlainTextResponse)
async def get_lesson_content(
    grade_level_slug: str = Path(..., title="Grade Level Slug"),
    subject_slug: str = Path(..., title="Subject Slug"),
    lesson_filename: str = Path(..., title="Lesson Filename", description="The .md filename of the lesson.")
):
    """
    Retrieves the plain text content of a specific Markdown lesson file.
    DEV_NOTE: Ensure lesson_filename is also sanitized, especially if it might contain path elements.
    For now, assuming it's just a filename.
    """
    safe_grade_level_slug = sanitize_slug(grade_level_slug)
    safe_subject_slug = sanitize_slug(subject_slug)

    # Basic sanitization for filename: only allow typical filename characters and .md extension
    if not re.match(r'^[a-zA-Z0-9_.-]+\.md$', lesson_filename) or ".." in lesson_filename:
        raise HTTPException(status_code=400, detail="Invalid lesson filename format.")

    lesson_path = os.path.join(CURRICULUM_BASE_PATH, safe_grade_level_slug, safe_subject_slug, lesson_filename)

    if not os.path.exists(lesson_path) or not os.path.isfile(lesson_path):
        raise HTTPException(status_code=404, detail=f"Lesson '{lesson_filename}' not found.")

    try:
        async with aiofiles.open(lesson_path, mode='r', encoding='utf-8') as f:
            content = await f.read()
        return PlainTextResponse(content=content)
    except Exception as e:
        print(f"Error reading lesson {lesson_path}: {e}")
        raise HTTPException(status_code=500, detail=f"Error reading lesson content for '{lesson_filename}'.")

# DEV_NOTE: Consider adding response models for list endpoints for better OpenAPI documentation,
# e.g. using Pydantic models like:
# class GradeLevelList(BaseModel):
#     grade_levels: List[str]
# and then response_model=GradeLevelList in the decorator. For simple lists of strings, List[str] is fine.
