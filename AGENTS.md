## Project Overview

This project is a K-12 accredited learning platform. The goal is to provide a comprehensive learning experience, culminating in a GED, US citizenship test preparation, and ESL proficiency.

## Development Guidelines

*   **Frameworks:** This project uses React with Tailwind CSS.
*   **Code Style:** Follow standard JavaScript and React best practices. Use a consistent coding style.
*   **Components:** Create reusable components whenever possible.
*   **State Management:** For now, component-level state (useState, useReducer) is sufficient. As the application grows, consider a more robust state management library like Redux or Zustand if needed.
*   **Data:** Currently, mock data is used directly in `src/App.js`. In the future, this should be moved to a separate data layer or API.
*   **Testing:** Write unit tests for components and utility functions. Consider integration tests for user flows. (No tests are implemented yet).
*   **Accessibility (a11y):** Design and implement with accessibility in mind. Use semantic HTML and ARIA attributes where appropriate.
*   **ESL & Citizenship:** These are future modules. For now, the focus is on the core K-12 curriculum and GED preparation, starting with the MathQuest UI.

## Running the Project

1.  Install dependencies: `npm install`
2.  Start the development server: `npm start`

## Future Work (High Level)

*   **Curriculum Expansion:** Add content for all K-12 subjects, GED, US citizenship, and ESL.
*   **Assessment Engine:** Develop a robust system for quizzes, tests, and tracking progress.
*   **Accreditation Logic:** Implement features to meet accreditation requirements.
*   **User Authentication & Database:** Add user accounts and persist data.
*   **Admin Interface:** Create tools for managing curriculum, users, and anlytics.
*   **Deployment:** Set up CI/CD and hosting.
