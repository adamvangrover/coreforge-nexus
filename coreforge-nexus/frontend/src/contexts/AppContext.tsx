import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as AuthUser, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { User, Topic, Problem } from '../types';
// import { db as firestoreDb, auth as firebaseAuth } from '../services/firebase'; // Real imports

const MOCK_USER: User = { id: 'dev_user', name: 'Alex', progress: {'algebra-basics': 0.8, 'geometry-intro': 0.5}, achievements: [{id: '1', name: 'Algebra Adept', icon: 'Star', date: '2024-07-21'}]};
const MOCK_TOPICS: Topic[] = [
    { id: 'algebra-basics', name: 'Algebra Basics', description: 'Intro to variables.', subtopics: ['Variables'] },
    { id: 'geometry-intro', name: 'Geometry Intro', description: 'Exploring shapes and space.', subtopics: ['Angles', 'Triangles'] },
    { id: 'calculus-1', name: 'Calculus I', description: 'The study of change.', subtopics: ['Limits', 'Derivatives'] },
];
const MOCK_PROBLEMS: { [key: string]: Problem[] } = { 'algebra-basics': [{ id: 'ab-1', type: 'mcq', question: 'What is x if 2x + 5 = 15?', options: ['3','5','10', '-5'], answer: '5', hint: 'Subtract 5 from both sides first.' }] };

interface AppContextType {
  user: User | null;
  topics: Topic[];
  getProblemsForTopic: (topicId: string) => Problem[];
  loading: boolean;
  updateUserProgress: (topicId: string, newProgress: number) => Promise<void>;
  generateNewProblem: (topicId: string) => Promise<Problem | null>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [problems, setProblems] = useState<{ [key: string]: Problem[] }>({});
  const [loading, setLoading] = useState(true);

  // In a real app, this logic would live inside the onAuthStateChanged listener
  useEffect(() => {
    const bootstrap = async () => {
        setLoading(true);
        // Using mock data as Firebase isn't configured
        setUser(MOCK_USER);
        setTopics(MOCK_TOPICS);
        setProblems(MOCK_PROBLEMS);
        setLoading(false);
    };
    bootstrap();
  }, []);

  const updateUserProgress = async (topicId: string, newProgress: number) => {
    if (!user) return;
    const updatedProgress = { ...user.progress, [topicId]: Math.min(1, Math.max(0, newProgress)) };
    setUser({ ...user, progress: updatedProgress });
    // Real Firebase logic: await updateDoc(doc(firestoreDb, "users", user.id), { progress: updatedProgress });
  };

  const getProblemsForTopic = (topicId: string) => problems[topicId] || [];

  const generateNewProblem = async (topicId: string): Promise<Problem | null> => {
      try {
        // Nginx proxies /api to the backend container
        const response = await fetch(`/api/generate-problem?topic=${topicId}`);
        if (!response.ok) throw new Error("Failed to fetch new problem");
        const newProblem: Problem = await response.json();
        // Add the new problem to our state
        setProblems(prev => ({...prev, [topicId]: [...(prev[topicId] || []), newProblem]}));
        return newProblem;
      } catch (error) {
        console.error("Error generating problem:", error);
        return null;
      }
  };

  return (
    <AppContext.Provider value={{ user, topics, loading, getProblemsForTopic, updateUserProgress, generateNewProblem }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within an AppProvider');
  return context;
};
