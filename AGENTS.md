## Project Overview

This project is a K-12 accredited learning platform. The goal is to provide a comprehensive learning experience, culminating in a GED, US citizenship test preparation, and ESL proficiency.

## Development Guidelines

*   **Frameworks:** This project uses React with Tailwind CSS (Frontend) and FastAPI (Backend).
*   **Code Style:**
    *   **JS/TS:** Follow standard JavaScript and React best practices. Use a consistent coding style.
    *   **Python:** Follow PEP 8.
*   **Components:** Create reusable components whenever possible.
*   **State Management:** For now, component-level state (useState, useReducer) is sufficient. As the application grows, consider a more robust state management library like Redux or Zustand if needed.
*   **Data:**
    *   Frontend currently uses `src/contexts/AppContext.tsx` which can toggle between mock data and API calls.
    *   Backend APIs provide dynamic problem generation and curriculum serving.
*   **Testing:** Write unit tests for components and utility functions. Consider integration tests for user flows.
*   **Accessibility (a11y):** Design and implement with accessibility in mind. Use semantic HTML and ARIA attributes where appropriate.
*   **ESL & Citizenship:** These are future modules. For now, the focus is on the core K-12 curriculum and GED preparation.

## Running the Project

### Automatic Setup
Run `./setup_env.sh` from the root to install all dependencies.

### Manual Setup
1.  **Backend:**
    *   `cd backend`
    *   `python3 -m venv venv`
    *   `source venv/bin/activate`
    *   `pip install -r requirements.txt`
    *   `uvicorn main:app --reload`
2.  **Frontend:**
    *   `cd frontend`
    *   `npm install`
    *   `npm start`

## Implemented Features

*   **Curriculum API:** Serves structured markdown content from the `curriculum/` directory.
*   **Problem Generator:** Dynamic math problem generation for Algebra and Geometry via `/api/generate-problem`.
*   **Authentication:** JWT-based authentication system (`/auth/token`, `/users/me`).
*   **Assessment:** API endpoints for submitting assessments (stubbed for future database integration).
*   **Manifest Generation:** `scripts/generate_manifest.py` automates the creation of the curriculum index.

## Future Work (High Level)

*   **Database Integration:** Replace in-memory/mock data in Backend with a real database (PostgreSQL recommended).
*   **Curriculum Expansion:** Continue adding content for all K-12 subjects.
*   **Deployment:** Set up CI/CD and hosting.
