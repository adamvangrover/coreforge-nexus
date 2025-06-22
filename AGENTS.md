## Project Overview

This project is a K-12 accredited learning platform. The goal is to provide a comprehensive learning experience, culminating in a GED, US citizenship test preparation, and ESL proficiency.

## Development Guidelines

*   **Frameworks:** This project uses React with Tailwind CSS.
*   **Code Style:** Follow standard JavaScript and React best practices. Use a consistent coding style.
*   **Components:** Create reusable components whenever possible.
*   **State Management:** The frontend (`frontend/`) uses React Context (`AppContext.tsx`) for some global state (user, loading, topics from mock data) and component-level state (useState, useReducer). `react-router-dom` handles navigation.
*   **Data:**
    *   Curriculum content is served by the FastAPI backend (`backend/`) from Markdown files in `curriculum/` via the `/api/curriculum/*` endpoints.
    *   User-specific data (profile, progress, achievements) is currently mocked in `frontend/src/contexts/AppContext.tsx`. This will be replaced by backend APIs and a database in the future.
    *   The old note about `src/App.js` referred to a root-level JavaScript project that is not the current focus.
*   **Testing:** Write unit tests for components and utility functions. Consider integration tests for user flows. (No tests are implemented yet).
*   **Accessibility (a11y):** Design and implement with accessibility in mind. Use semantic HTML and ARIA attributes where appropriate.
*   **ESL & Citizenship:** These are future modules. For now, the focus is on the core K-12 curriculum and GED preparation. The "MathQuest UI" mentioned previously is evolving into the current React/FastAPI application.

## Running the Project

The project consists of a separate frontend and backend. Both need to be running concurrently.

**1. Backend (FastAPI - Python):**
   - Navigate to the `backend/` directory.
   - Set up a Python virtual environment (e.g., `python -m venv venv && source venv/bin/activate`).
   - Install dependencies: `pip install -r requirements.txt`.
   - Start the server: `uvicorn main:app --reload --port 8000`.
   - The API will be available at `http://localhost:8000`.

**2. Frontend (React - TypeScript):**
   - Navigate to the `frontend/` directory.
   - Install dependencies: `npm install` (or `yarn install`).
   - Start the development server: `npm start` (or `yarn start`).
   - The application will typically open at `http://localhost:3000`.

**Note:** Ensure the backend is running before starting the frontend if the frontend makes API calls on load (though current curriculum views fetch on interaction).

## Future Work (High Level)

*   **Curriculum Expansion:** Add content for all K-12 subjects, GED, US citizenship, and ESL.
*   **Assessment Engine:** Develop a robust system for quizzes, tests, and tracking progress.
*   **Accreditation Logic:** Implement features to meet accreditation requirements.
*   **User Authentication & Database:** Add user accounts and persist data.
*   **Admin Interface:** Create tools for managing curriculum, users, and anlytics.
*   **Deployment:** Set up CI/CD and hosting.
