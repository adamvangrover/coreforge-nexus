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


**CoreForge Nexus** (formerly conceptualized as CoreLoop, FoundryEdu, EduNexus, LMS-Core-Kit) is an ambitious project to build a comprehensive, K-12 accredited learning platform. Our vision is to provide an engaging and effective educational experience for students, ultimately supporting them through their K-12 journey and beyond, including GED preparation, US citizenship test readiness, and ESL (English as a Second Language) proficiency.

## Vision & Mission


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

*   **Curriculum Manifest:** `public/curriculum_manifest.json` is key for the standalone HTML browsers. It should be regenerated if the `curriculum/` directory changes (see `DEV_SUGGESTIONS.md` for automation ideas).
*   **Dependencies & Environment (Known Issue):**
    *   There have been intermittent issues with `npm install` and `pip install` failing in some automated agent environments. If you encounter this, manual dependency installation or environment troubleshooting might be necessary. The `package.json` and `requirements.txt` files define the needed dependencies.
=======
## Current Status

The platform is currently under active development. We are focusing on:

1.  **Core Curriculum Integration:** Structuring and integrating K-12 curriculum materials (currently in Markdown format) across various subjects and grade levels. The backend now provides an API to browse this structure.
2.  **Frontend Development (React App):** Building an intuitive and engaging user interface using React, TypeScript, and Tailwind CSS. Current views include a Dashboard, My Learning, My Progress, Exploration Zone, and Resources. This is the main, feature-rich application.
3.  **Backend Infrastructure (FastAPI):** Developing a Python-based backend using FastAPI to manage data, user authentication (future), and learning logic, including serving curriculum content.
4.  **Interactive Learning:** Laying the groundwork for interactive modules, quizzes, and progress tracking within the React application.

## Target Features (Future Goals for React App)

*   **Comprehensive K-12 Curriculum:** Full coverage of all core subjects.
*   **GED Preparation Module:** Dedicated resources and practice for the GED exam.
*   **US Citizenship Test Prep:** Interactive lessons and mock tests.
*   **ESL Program:** Structured courses for English language learners.
*   **Accreditation Compliance:** Meeting standards for educational accreditation.
*   **Personalized Learning Paths:** Adapting content delivery to individual student needs.
*   **Teacher & Administrator Portals:** Tools for educators to manage classes, content, and student progress.
*   **Robust Assessment Engine:** Quizzes, tests, and assignments with automated and manual grading.
*   **Gamification & Engagement:** Features like points, badges, and leaderboards to motivate learners.
*   **Community & Collaboration:** Forums, study groups, and project-based learning.

## Getting Started: Running the Platform

This project uses Node.js for the frontend (React) and Python for the backend (FastAPI). Docker is recommended for a consistent development environment.

**Prerequisites:**

*   Node.js (v16 or later recommended)
*   npm (usually comes with Node.js)
*   Python (v3.8 or later recommended)
*   Pip (Python package installer)
*   Docker & Docker Compose (recommended)

**Running with Docker (Recommended for Full Platform):**

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```
2.  **Build and run the services using Docker Compose:**
    *(Ensure you are in the root directory where `docker-compose.yml` is located.)*
    ```bash
    docker-compose up --build
    ```
    This will build the frontend and backend images and start the containers.
3.  **Access the platform:**
    *   React Frontend: Open your browser and navigate to `http://localhost:3000` (this port is mapped to Nginx serving the built React app on port 80 in its container).
    *   Backend API: Typically available on `http://localhost:8000`. The API base is `/api/v1`.
    *   Simple HTML Curriculum Browser: `http://localhost:3000/browse_curriculum.html` (served by the same Nginx instance in the frontend container).

**Running Manually (Frontend - React App):**

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *DEV_NOTE: There have been intermittent issues with `npm install` in some automated environments. Ensure dependencies in `package.json` are installed. If issues persist, you may need to resolve them manually (e.g., by removing problematic devDependencies or ensuring your npm registry is accessible).*
3.  **Start the development server:**
    ```bash
    npm start
    ```
4.  **Access the frontend:**
    *   Open your browser and navigate to `http://localhost:3000`.

**Running Manually (Backend - FastAPI):**

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Run the backend application (using Uvicorn from the project root or backend directory):**
    If in `backend` directory:
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    If in project root:
    ```bash
    uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
    ```
    *(The `backend.main:app` path might need adjustment based on your Python path. `--reload` is for development.)*

## Navigating the Platform (React Application)

Once the React application is running (and the backend API is accessible), you can use the main application:

*   **Dashboard (`/dashboard`):** Overview of learning, progress, recommendations.
*   **My Learning (`/learning`):** Browse and engage with curriculum content (grade levels, subjects, lessons). Markdown lessons are displayed here, fetched from the backend API.
*   **My Progress (`/progress`):** Track achievements and performance.
*   **Explore (`/explore`):** Discover supplemental materials, interactive tools (like the graphing calculator).
*   **Resources (`/resources`):** Access glossaries, help guides, etc. (placeholder).

## Simple HTML Curriculum Browser

For a lightweight, no-dependency way to quickly browse the curriculum structure and view lesson content (as plain text), a simple HTML interface is available at `public/browse_curriculum.html`.

*   **Purpose:** Useful for a quick look at the curriculum content if the backend API is running, without needing to build/run the full React application. It directly uses the `/api/v1/curriculum/...` endpoints.
*   **Access:**
    *   If running the frontend dev server (`npm start`), it's usually available at `http://localhost:3000/browse_curriculum.html`.
    *   If running via Docker (with `docker-compose up`), it's available at `http://localhost:3000/browse_curriculum.html` (served by Nginx from the frontend container).
    *   You can also open the HTML file directly from your filesystem (`file:///.../public/browse_curriculum.html`), but API calls might be subject to CORS restrictions if the backend isn't configured to allow `null` origins or `file://`. The current backend CORS setup in `backend/main.py` is primarily for `http://localhost:3000`.
*   **Functionality:** Allows you to click through Grade Levels, Subjects, and Lessons to view the raw Markdown content in a dedicated panel.

## Curriculum Structure (Example)

Our curriculum (in the `/curriculum` directory) is organized by grade levels and subjects. The API and applications access this structure.

**Example Path:** `curriculum/Elementary_K-5/Mathematics/Grade1_Math_NYSNextGen.md`

*   **Elementary School (K-5):** Covers foundational math, ELA, science, social studies. (e.g., `curriculum/Elementary_K-5/...`)
*   **Middle School (6-8):** Builds on elementary concepts with more advanced topics. (e.g., `curriculum/Middle_6-8/...`)
*   **High School (9-12):** Specialized subjects like Algebra, Geometry, Biology, Chemistry, US History, Global History. (e.g., `curriculum/High_9-12/...`)

## Developer Notes

*   **Backend API:** The FastAPI backend (in `/backend`) serves curriculum data from the `/curriculum` directory via endpoints defined in `backend/routers/curriculum.py`. The API base is `/api/v1`.
*   **Frontend Application:** The main React application (in `/frontend`) provides a rich user interface. State management uses `AppContext` for some global data, and `react-router-dom` for navigation.
*   **Dependencies & Environment:**
    *   Ensure frontend dependencies are installed (`cd frontend && npm install`).
    *   Ensure backend dependencies are installed (`cd backend && pip install -r requirements.txt`).
    *   **Known Issue:** There have been intermittent issues with `npm install` and `pip install` failing in some automated agent environments. If you encounter this, manual dependency installation or environment troubleshooting might be necessary. The `package.json` and `requirements.txt` files define the needed dependencies.
*   **Docker:** The `docker-compose.yml` file orchestrates the frontend (Nginx serving React build) and backend (FastAPI) services.

## Contributing

(Details to be added on contribution guidelines, code of conduct, etc.)

## License

(License to be determined - e.g., MIT, Apache 2.0. For now, see `LICENSE` file if it exists, or assume proprietary until specified.)
