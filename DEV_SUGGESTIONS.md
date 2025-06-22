# Developer Suggestions & Next Steps for CoreForge Nexus

This document outlines potential next steps and areas for future development to build CoreForge Nexus into a fully functional learning platform. Many of these points are also captured as `DEV_NOTE:` comments within the codebase.

## I. Critical Environment & Setup Issues

1.  **Resolve Dependency Installation Failures:**
    *   **Priority:** Highest. The `npm install` and `pip install` commands have been failing intermittently or consistently in the automated agent environment. This prevents proper building, testing, and running of the applications.
    *   **Action:** Thoroughly investigate the cause of these failures. It could be related to network access from the sandbox, specific package versions, OS compatibility within the agent, or how the `run_in_bash_session` tool handles paths and permissions.
    *   **Impact:** Without this, all subsequent development and testing are severely hampered.

## II. Core Backend Development (FastAPI)

1.  **User Authentication & Authorization:**
    *   Implement user registration, login (e.g., JWT-based), and password management.
    *   Define user roles (student, teacher, admin - future) and permissions.
    *   Secure API endpoints that require authentication.
2.  **Database Integration:**
    *   Choose and integrate a relational database (e.g., PostgreSQL, as suggested in planning).
    *   Define database models/schemas (e.g., using SQLAlchemy or an ORM like Tortoise ORM compatible with FastAPI) for:
        *   Users (profiles, credentials).
        *   Curriculum (GradeLevels, Subjects, Lessons, potentially storing Markdown content or structured content).
        *   UserProgress (tracking completed lessons, quiz scores, course progress).
        *   Achievements, Quizzes, Problems (as these features are built out).
    *   Implement database migrations (e.g., using Alembic).
3.  **Refine Curriculum API:**
    *   Modify curriculum API endpoints to fetch data from the database instead of scanning the filesystem. This will allow for richer metadata, versioning, and easier management.
    *   Consider adding metadata to lessons (e.g., learning objectives, estimated time, prerequisites) in the database.
4.  **Problem Generation API (`/api/generate-problem`):**
    *   The frontend `AppContext` has a placeholder call to this. Define and implement this API endpoint.
    *   It could fetch problems from a database, use a library (like `sympy` which is currently in `requirements.txt` but unused), or integrate with an external question generation service.
5.  **Assessment Engine Backend:**
    *   API endpoints for creating, fetching, and submitting quizzes/assessments.
    *   Logic for grading (auto-gradable question types) and storing results.
6.  **Robust Error Handling & Logging:**
    *   Implement centralized logging for API requests, errors, and important events.
    *   Standardize error response formats.

## III. Core Frontend Development (React)

1.  **User Authentication Flow:**
    *   Implement Login, Registration, and Logout UI components and logic.
    *   Protect routes that require authentication.
    *   Update `AppContext` to manage authenticated user state.
2.  **"My Learning" View Enhancements:**
    *   Improve styling of rendered Markdown (e.g., using `@tailwindcss/typography`).
    *   Handle navigation to specific lessons via URL parameters more robustly (e.g., `/learning/:grade/:subject/:lessonFile`).
    *   Integrate interactive elements (once backend supports them).
3.  **"Dashboard" View - Real Data:**
    *   Connect the Dashboard components (Continue Learning, Recommended, Achievements) to real data from `AppContext` once user progress and curriculum data are fetched from the backend.
4.  **"My Progress" View - Real Data:**
    *   Fetch and display actual user progress (courses completed, scores, mastery) from the backend.
    *   Implement charting/visualization for progress.
5.  **"Explore" and "Resources" Views - Content:**
    *   Populate these views with actual content or tools.
6.  **Interactive Learning Components:**
    *   Develop components for quizzes (MCQ, input), flashcards, etc.
    *   Integrate these into the `LearningView` where lessons can specify interactive blocks.
7.  **State Management Review:**
    *   As the app grows, re-evaluate if `AppContext` is sufficient or if a more feature-rich state management library (e.g., Zustand, Redux Toolkit) is needed for specific complex states.
8.  **Comprehensive Testing:**
    *   Write unit tests for components and utility functions (e.g., using React Testing Library and Jest).
    *   Develop integration tests for key user flows.

## IV. Docker & DevOps

1.  **Production-Ready Docker Images:**
    *   Optimize Dockerfiles for smaller image sizes and security.
    *   Ensure frontend Nginx configuration is robust for production (caching, security headers).
    *   Configure Gunicorn with Uvicorn workers for the FastAPI backend in production.
2.  **CI/CD Pipeline:**
    *   Set up automated testing, building, and deployment (e.g., to a staging and production environment).
3.  **Configuration Management:**
    *   Use environment variables for all configurable parameters (API URLs, database credentials, secret keys) and manage them securely.

## V. General Platform Features (Longer Term)

*   Refer to the "Target Features" in `README.md` and "Creative Ideas" from the initial planning phase. These include:
    *   GED, Citizenship, ESL modules.
    *   Teacher/Admin portals.
    *   Gamification, AI tutoring, community features.
    *   Accessibility (a11y) audit and improvements.

## VI. Standalone HTML Browsers & Curriculum Manifest (for GitHub Pages / Static Viewing)

1.  **`curriculum_manifest.json` Maintenance:**
    *   **Current State:** Manually generated based on `ls` output. This is error-prone and not scalable.
    *   **Suggestion:** Create a simple Python or Node.js script (e.g., `scripts/generate_manifest.py`) that automatically scans the `curriculum/` directory and generates/updates `public/curriculum_manifest.json`.
    *   This script should be run whenever curriculum files are added, removed, or reorganized.
    *   Consider adding this script to a pre-commit hook or as part of a build process if a more formal build system is adopted for static assets.
2.  **Enhancing Standalone Browsers (`index.html`, `public/browse_curriculum.html`):**
    *   **Search Functionality:** Add client-side search to `public/browse_curriculum.html` to filter lessons based on keywords (would search the loaded `curriculum_manifest.json`).
    *   **Improved Styling:** While basic styling is in place, further UI/UX refinements can always be made.
    *   **Error Handling:** More robust error handling for fetch operations or if the manifest is malformed.
3.  **LLM Interaction Points with Static Assets:**
    *   **Manifest as Knowledge Base:** An LLM could use `curriculum_manifest.json` as a structured input to understand the available curriculum. It could:
        *   Answer questions like "What math topics are available for Elementary K-5?".
        *   Help generate learning paths by suggesting sequences of lessons based on the manifest.
        *   Identify gaps in the curriculum based on the manifest's structure.
    *   **Content Processing:** An LLM could be tasked to process the raw Markdown content of lessons (fetched via their paths in the manifest) for summarization, question generation (for quizzes), keyword extraction, or translation.
    *   **Maintaining Consistency:** An LLM could potentially assist in validating the manifest against the actual directory structure or checking for broken links if it has filesystem access or tools to simulate it.
    *   **Generating New Content/Manifest Entries:** If an LLM helps generate new Markdown lesson content, it could also be prompted to generate the corresponding entry for `curriculum_manifest.json`.
4.  **Consideration for Large Curriculum:**
    *   If the curriculum grows very large, `curriculum_manifest.json` could become very big. For client-side performance, consider splitting the manifest (e.g., one manifest per grade level) or implementing more advanced data loading strategies if `public/browse_curriculum.html` becomes slow. For now, it's likely fine.


This list provides a solid roadmap for iterative development. Prioritization will depend on project goals and resources.
