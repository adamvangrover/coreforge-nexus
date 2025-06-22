# CoreForge Nexus Learning Platform

CoreForge Nexus is a developing learning platform aimed at providing comprehensive educational content and tools. This repository focuses on building a K-12 curriculum browser with future extensions towards GED preparation, US citizenship tests, and ESL proficiency.

## Project Goals

- Deliver a flexible and adaptable K-12 curriculum.
- Provide tools for professional development and modular LMS infrastructure.
- Eventually support GED, US Citizenship, and ESL learning modules.

## Current Status & Features (as of this update)

- **Frontend**:
    - Built with React, TypeScript, and Tailwind CSS.
    - Interactive curriculum browsing:
        - **Learning View (`/learning`)**: Step-by-step selection of grade, subject, and lesson.
        - **Tree View (`/curriculum-tree`)**: Hierarchical, collapsible tree of all curriculum content.
        - **List View (`/curriculum-list`)**: Searchable and filterable flat list of all curriculum items.
    - Markdown rendering for lesson content using `react-markdown` and `@tailwindcss/typography`.
    - Placeholder views for Dashboard (`/dashboard`), Progress (`/progress`), Explore (`/explore`), and Resources (`/resources`).
    - Basic user context mocked (user name, some progress data).
- **Backend**:
    - Built with FastAPI (Python).
    - Serves curriculum data from Markdown files located in the `curriculum/` directory.
    - Key API Endpoints:
        - `/api/curriculum/grade-levels`: Lists available grade levels.
        - `/api/curriculum/subject-areas/{grade_level}`: Lists subject areas for a grade.
        - `/api/curriculum/lessons/{grade_level}/{subject_area}`: Lists lessons for a subject.
        - `/api/curriculum/lesson-content/{grade_level}/{subject_area}/{lesson_filename}`: Retrieves Markdown content for a lesson.
        - `/api/curriculum/full-structure`: Provides the entire curriculum hierarchy in a single JSON response for tree/list views.
- **Data**:
    - Curriculum content is sourced directly from Markdown files.
    - User-specific data (e.g., progress, achievements) is currently mocked in the frontend's `AppContext`.

## Project Structure

-   `frontend/`: Contains the React/TypeScript frontend application.
    -   `frontend/src/views/`: Main page components corresponding to routes.
    -   `frontend/src/components/`: Reusable UI components.
    -   `frontend/src/contexts/`: React context for global state (e.g., `AppContext`).
-   `backend/`: Contains the FastAPI backend application.
    -   `backend/routers/`: Defines API route modules (e.g., `curriculum.py`).
    -   `backend/main.py`: Main FastAPI application setup.
-   `curriculum/`: Stores educational content as Markdown files, organized by grade level and subject area.
-   `AGENTS.md`: Specific guidelines and notes for AI agent development on this project. (This file may need updates to reflect the current focus on `frontend/` and `backend/` rather than root-level JS project).
-   `coreforge-nexus/`: Appears to be a separate, possibly legacy or parallel module. Development has primarily focused on the main `frontend/` and `backend/` directories.

## Getting Started

To set up and run the project locally, you'll need Node.js (for the frontend) and Python (for the backend).

### 1. Backend Setup

The backend server provides the API for curriculum content.

```bash
# Navigate to the backend directory
cd backend

# (Recommended) Create and activate a Python virtual environment
python -m venv venv
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI development server
# It will typically run on http://localhost:8000
uvicorn main:app --reload --port 8000
```
The backend API documentation (Swagger UI) will be available at `http://localhost:8000/docs` when the server is running.

### 2. Frontend Setup

The frontend application provides the user interface.

```bash
# Navigate to the frontend directory (from the repository root)
cd frontend

# Install dependencies
npm install
# or if you prefer yarn:
# yarn install

# Run the React development server
# It will typically run on http://localhost:3000 and open in your browser
npm start
# or if you prefer yarn:
# yarn start
```

Once both servers are running, you can access the application, usually at `http://localhost:3000`.

## Future Work

This project is under active development. High-level goals for future work include:
- Curriculum expansion for all K-12 subjects, GED, US citizenship, and ESL.
- User authentication and database integration for persistent user data.
- A robust assessment engine for quizzes, tests, and progress tracking.
- Admin interface for content and user management.
- Deployment setup (CI/CD, hosting).
- Comprehensive testing (unit, integration, E2E).

(Refer to `AGENTS.md` for more context on original project goals.)

## Contributing

Contributions are welcome! Please consider the following:
- Open an issue to discuss any significant changes or new features.
- Follow existing coding styles and conventions.
- Ensure new frontend components are responsive and accessible.
- Write clear and concise commit messages.
- Update documentation as needed.

---

*This README was last updated by an AI agent.*
