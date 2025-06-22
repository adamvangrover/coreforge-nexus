# CoreForge Nexus: K-12 Learning Platform

**CoreForge Nexus** is an ambitious project to build a comprehensive, K-12 accredited learning platform. Our vision is to provide an engaging and effective educational experience for students, supporting them through their K-12 journey and beyond, including GED preparation, US citizenship test readiness, and ESL proficiency.

**For the best starting point to explore this project, please open the `index.html` file at the root of this repository in your web browser.**

## Project Entry Points

1.  **`index.html` (Root Project Landing Page):**
    *   **Recommended First Stop.** Provides a user-friendly overview of the project, its goals, technology stack, and how to explore its different components.
    *   Includes links to this `README.md`, the standalone curriculum browser, and instructions for running the full application.
    *   Showcases client-side rendered examples of curriculum content.
    *   **How to view:** Open `index.html` directly in your browser or view it on GitHub Pages: [https://adamvangrover.github.io/coreforge-nexus/](https://adamvangrover.github.io/coreforge-nexus/)

2.  **`public/browse_curriculum.html` (Standalone Curriculum Browser):**
    *   A lightweight HTML page that allows you to browse the curriculum structure (grade levels, subjects, lessons) and view lesson content (Markdown rendered to HTML).
    *   **Standalone & Offline Capability:** Uses `public/curriculum_manifest.json` (fetched if available) or embedded fallback data to display the curriculum structure. This allows basic structural browsing even when opened as a local file (`file:///...`) or if the manifest fails to load. Full lesson content viewing in true offline/`file:///` mode might be limited by browser security policies for fetching local `.md` files, but the structure remains accessible.
    *   **How to view:** Open `public/browse_curriculum.html` directly in your browser or view on GitHub Pages: [https://adamvangrover.github.io/coreforge-nexus/public/browse_curriculum.html](https://adamvangrover.github.io/coreforge-nexus/public/browse_curriculum.html)
    *   The `public/curriculum_manifest.json` file is primary for live data; an embedded version provides fallback. See `DEV_SUGGESTIONS.md` for notes on keeping these updated.

3.  **Full React/FastAPI Application (For Active Development & Full Features):**
    *   The main, feature-rich platform with a React frontend and FastAPI backend.
    *   This is the system intended for full interactivity, user accounts (future), and dynamic content.
    *   Requires running both frontend and backend services. See "Running the Full Application" section below.

## Vision & Mission (Detailed)

*   **Vision:** To be a leading online learning platform that empowers students of all ages and backgrounds with accessible, high-quality education.
*   **Mission:** To develop a flexible, interactive, and comprehensive curriculum delivery system that adapts to individual learning needs and prepares students for future success.

## Current Status & Key Components

*   **Curriculum Content:** Stored as Markdown files in the `/curriculum` directory. A `public/curriculum_manifest.json` provides a structured map of this content for static browsing.
*   **Standalone HTML Browsers:** `index.html` (project overview) and `public/browse_curriculum.html` (curriculum browser) for easy static viewing (e.g., on GitHub Pages).
*   **React Frontend (`/frontend`):** The main application UI, built with React, TypeScript, and Tailwind CSS. Features routing for Dashboard, My Learning, My Progress, etc.
*   **FastAPI Backend (`/backend`):** Python backend serving a curriculum API (from filesystem for now) and planned to handle user data, assessments, etc.
*   **Dockerization (`docker-compose.yml`, Dockerfiles):** For containerized development and deployment.

## Target Features (For the Full React/FastAPI Application)

*   Comprehensive K-12 curriculum, GED prep, US Citizenship, ESL modules.
*   Interactive learning modules (quizzes, simulations).
*   Personalized learning paths and progress tracking.
*   Teacher/Administrator portals.
*   (See `DEV_SUGGESTIONS.md` for a more detailed roadmap).

## Running the Full Application (React Frontend & FastAPI Backend)

This project uses Node.js for the frontend (React) and Python for the backend (FastAPI). Docker is recommended.

**Prerequisites:** Node.js, npm, Python, Pip, Docker & Docker Compose.

**1. Running with Docker (Recommended):**
    *   Clone the repository.
    *   From the root directory, run: `docker-compose up --build`
    *   **Access:**
        *   React Frontend: `http://localhost:3000` (Nginx serves the built React app).
        *   Backend API: `http://localhost:8000` (e.g., `http://localhost:8000/api/v1/curriculum/grade-levels`).
        *   The standalone HTML browsers will also be available via `http://localhost:3000/index.html` and `http://localhost:3000/public/browse_curriculum.html`.

**2. Running Manually (Frontend - React App):**
    *   `cd frontend`
    *   `npm install` (see known issues below)
    *   `npm start`
    *   Access: `http://localhost:3000`

**3. Running Manually (Backend - FastAPI):**
    *   `cd backend`
    *   Create/activate a Python virtual environment.
    *   `pip install -r requirements.txt`
    *   Run (from `backend` dir): `uvicorn main:app --host 0.0.0.0 --port 8000 --reload`
    *   Or (from project root): `uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload`

## Developer Notes & Future Work

*   **`DEV_SUGGESTIONS.md`:** This file in the root directory contains a detailed list of suggestions for future development, next steps, and areas for improvement. Please consult it for a roadmap.
*   **Curriculum Manifest (`public/curriculum_manifest.json`):**
    *   This JSON file is crucial for the standalone HTML browsers (`index.html` and `public/browse_curriculum.html`) as it maps the entire curriculum structure.
    *   **Generating the Manifest:** If you make changes to the `curriculum/` directory (add/remove/rename files or folders), you **must** regenerate this manifest. A Python script is provided for this:
        ```bash
        python scripts/generate_manifest.py
        ```
        Run this command from the root of the repository. Ensure you have Python installed.
    *   See `DEV_SUGGESTIONS.md` for more notes on this script and potential future automation.
*   **Dependencies & Environment (Known Issue):**
    *   There have been intermittent issues with `npm install` and `pip install` failing in some automated agent environments. If you encounter this, manual dependency installation or environment troubleshooting might be necessary. The `package.json` and `requirements.txt` files define the needed dependencies.

## Contributing

(Details to be added on contribution guidelines, code of conduct, etc.)

## License

(License to be determined - e.g., MIT, Apache 2.0. For now, see `LICENSE` file if it exists, or assume proprietary until specified.)
