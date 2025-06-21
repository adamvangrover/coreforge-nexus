// Defines the core data structures for the application.

export interface User {
  id: string; // Unique identifier for the user (e.g., Firebase Auth UID)
  name: string;
  progress: { [topicId: string]: number }; // Key: topicId, Value: progress (0.0 to 1.0)
  achievements: Achievement[];
}

export interface Achievement {
  id: string; // Unique identifier for the achievement
  name: string; // e.g., "Algebra Adept"
  icon: string; // Name of the Lucide icon to use (e.g., "Star", "Award")
  date: string; // Date earned, e.g., "YYYY-MM-DD"
}

export interface Topic {
  id: string; // Unique identifier for the topic (e.g., "algebra-basics")
  name: string; // e.g., "Algebra Basics"
  description: string;
  subtopics: string[]; // Array of subtopic names or IDs
}

export interface Problem {
  id: string; // Unique identifier for the problem
  type: 'mcq' | 'input'; // Multiple Choice Question or Text Input
  question: string;
  options?: string[]; // Only for 'mcq' type
  answer: string; // The correct answer
  hint: string;
}

// You can add more types here as the application grows, for example:
// export interface QuizResult { ... }
// export interface StudySession { ... }
