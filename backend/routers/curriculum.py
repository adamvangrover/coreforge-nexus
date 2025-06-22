from fastapi import APIRouter, HTTPException, Path as FastApiPath
from pydantic import BaseModel
from pathlib import Path
from typing import List, Optional

CURRICULUM_BASE_DIR = Path(__file__).resolve().parent.parent / "curriculum"

router = APIRouter(
    prefix="/api/curriculum",
    tags=["Curriculum"],
    responses={404: {"description": "Not found"}},
)

# --- Pydantic Models ---
class LessonFile(BaseModel):
    name: str
    path: str

class LessonContent(BaseModel):
    title: str
    path: str
    content: str

class CurriculumNode(BaseModel):
    id: str
    name: str
    type: str  # "grade-level", "subject-area", "lesson"
    path: Optional[str] = None # Relative path for lessons, used to fetch content
    children: Optional[List['CurriculumNode']] = None # Recursive definition

# To handle forward reference for Pydantic v1
# For Pydantic v2, this might not be strictly necessary if using List['CurriculumNode'] = []
# but it's good practice for clarity or older Pydantic versions.
CurriculumNode.update_forward_refs()


# --- Helper Functions ---
def sanitize_path_component(component: str, is_filename: bool = False) -> str:
    if ".." in component or component.startswith("/"):
        raise HTTPException(status_code=400, detail=f"Invalid characters in path component: {component}")
    if is_filename and "/" in component: # Filenames themselves should not contain slashes
        raise HTTPException(status_code=400, detail=f"Filename cannot contain slashes: {component}")
    return component

def get_human_readable_name_from_filename(filename: str) -> str:
    """Converts a filename like 'Algebra1_NYSNextGen.md' to 'Algebra1 NYSNextGen'."""
    return filename.replace(".md", "").replace("_", " ").replace("-", " - ").title()

def get_human_readable_name_from_dirname(dirname: str) -> str:
    """Converts a directory name like 'High_9-12' or 'ComputerScience'."""
    return dirname.replace("_", " ").replace("-", " - ").title()

# --- API Endpoints (Existing) ---
@router.get("/grade-levels", response_model=List[str])
async def get_grade_levels_endpoint():
    if not CURRICULUM_BASE_DIR.exists() or not CURRICULUM_BASE_DIR.is_dir():
        raise HTTPException(status_code=500, detail="Curriculum directory not found.")
    grade_levels = [d.name for d in CURRICULUM_BASE_DIR.iterdir() if d.is_dir() and not d.name.startswith('.')]
    return sorted(grade_levels)

@router.get("/subject-areas/{grade_level}", response_model=List[str])
async def get_subject_areas_endpoint(
    grade_level: str = FastApiPath(..., description="The name of the grade level directory")
):
    s_grade_level = sanitize_path_component(grade_level)
    grade_level_path = CURRICULUM_BASE_DIR / s_grade_level
    if not grade_level_path.exists() or not grade_level_path.is_dir():
        raise HTTPException(status_code=404, detail=f"Grade level '{s_grade_level}' not found.")
    subject_areas = [d.name for d in grade_level_path.iterdir() if d.is_dir() and not d.name.startswith('.')]
    return sorted(subject_areas)

@router.get("/lessons/{grade_level}/{subject_area}", response_model=List[LessonFile])
async def get_lessons_endpoint(
    grade_level: str = FastApiPath(..., description="Grade Level directory name"),
    subject_area: str = FastApiPath(..., description="Subject Area directory name")
):
    s_grade_level = sanitize_path_component(grade_level)
    s_subject_area = sanitize_path_component(subject_area)
    lessons_dir = CURRICULUM_BASE_DIR / s_grade_level / s_subject_area
    if not lessons_dir.exists() or not lessons_dir.is_dir():
        raise HTTPException(status_code=404, detail=f"Directory not found: {s_grade_level}/{s_subject_area}")

    lesson_files_data = []
    for item in sorted(lessons_dir.iterdir()):
        if item.is_file() and item.name.endswith(".md") and not item.name.startswith('.'):
            relative_path = f"{s_grade_level}/{s_subject_area}/{item.name}"
            lesson_files_data.append(LessonFile(name=get_human_readable_name_from_filename(item.name), path=relative_path))
    return lesson_files_data

@router.get("/lesson-content/{grade_level}/{subject_area}/{lesson_filename}", response_model=LessonContent)
async def get_lesson_content_endpoint(
    grade_level: str = FastApiPath(..., description="Grade Level directory name"),
    subject_area: str = FastApiPath(..., description="Subject Area directory name"),
    lesson_filename: str = FastApiPath(..., description="The .md filename of the lesson")
):
    s_grade_level = sanitize_path_component(grade_level)
    s_subject_area = sanitize_path_component(subject_area)
    s_lesson_filename = sanitize_path_component(lesson_filename, is_filename=True)

    if not s_lesson_filename.endswith(".md"):
        raise HTTPException(status_code=400, detail="Lesson filename must be a .md file.")

    file_path = CURRICULUM_BASE_DIR / s_grade_level / s_subject_area / s_lesson_filename
    if not file_path.exists() or not file_path.is_file():
        raise HTTPException(status_code=404, detail=f"Lesson not found: {s_grade_level}/{s_subject_area}/{s_lesson_filename}")

    try:
        content = file_path.read_text(encoding="utf-8")
        relative_path = f"{s_grade_level}/{s_subject_area}/{s_lesson_filename}"
        return LessonContent(title=get_human_readable_name_from_filename(s_lesson_filename), path=relative_path, content=content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not read lesson content: {e}")

# --- Endpoint for Full Curriculum Structure ---
def build_curriculum_tree(current_scan_path: Path, relative_path_str: str, item_type: str) -> CurriculumNode:
    """
    Recursively builds a node in the curriculum tree.
    current_scan_path: pathlib.Path object for the current directory/file being scanned.
    relative_path_str: Relative path string from CURRICULUM_BASE_DIR to current_scan_path.
    item_type: "grade-level", "subject-area", or "lesson".
    """
    node_id = relative_path_str
    children_nodes: List[CurriculumNode] = []
    lesson_fetch_path: Optional[str] = None

    if item_type == "lesson":
        # For lessons, current_scan_path is a file.
        node_name = get_human_readable_name_from_filename(current_scan_path.name)
        lesson_fetch_path = relative_path_str # This is the path used to fetch content
    else: # For directories (grade-level or subject-area)
        node_name = get_human_readable_name_from_dirname(current_scan_path.name)
        if current_scan_path.is_dir():
            for item in sorted(current_scan_path.iterdir()):
                if item.name.startswith('.'):  # Skip hidden files/dirs
                    continue

                child_relative_path_str = f"{relative_path_str}/{item.name}"
                child_item_type = ""

                if item_type == "grade-level":
                    if item.is_dir(): # Expect subject area directories
                        child_item_type = "subject-area"
                    # Files directly under grade-level are ignored for now
                elif item_type == "subject-area":
                    if item.is_file() and item.name.endswith(".md"): # Expect lesson files
                        child_item_type = "lesson"
                    # Directories or other files under subject-area are ignored for now

                if child_item_type:
                    children_nodes.append(build_curriculum_tree(item, child_relative_path_str, child_item_type))

    return CurriculumNode(
        id=node_id,
        name=node_name,
        type=item_type,
        path=lesson_fetch_path,
        children=children_nodes if children_nodes else None
    )

@router.get("/full-structure", response_model=List[CurriculumNode])
async def get_full_curriculum_structure_endpoint():
    """
    Retrieves the entire curriculum structure as a nested list of nodes,
    following GradeLevel -> SubjectArea -> Lesson.md hierarchy.
    """
    if not CURRICULUM_BASE_DIR.exists() or not CURRICULUM_BASE_DIR.is_dir():
        raise HTTPException(status_code=500, detail="Curriculum directory not found.")

    full_structure: List[CurriculumNode] = []
    for item in sorted(CURRICULUM_BASE_DIR.iterdir()):
        if item.is_dir() and not item.name.startswith('.'):
            # Top-level items are assumed to be grade levels
            full_structure.append(build_curriculum_tree(item, item.name, "grade-level"))

    return full_structure
