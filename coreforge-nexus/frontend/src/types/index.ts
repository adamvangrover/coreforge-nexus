export interface User {
  id: string;
  name: string;
  progress: { [topicId: string]: number };
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  icon: string; // Using string for icon name from lucide-react
  date: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  subtopics: string[];
}

export interface Problem {
  id: string;
  type: 'mcq' | 'input';
  question: string;
  options?: string[];
  answer: string;
  hint: string;
}
