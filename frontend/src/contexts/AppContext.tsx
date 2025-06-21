import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Firebase imports - these would be used if Firebase is configured
// import { User as AuthUser, onAuthStateChanged, signInAnonymously } from "firebase/auth";
// import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from "firebase/firestore";
// import { db as firestoreDb, auth as firebaseAuth } from '../services/firebase';

import { User, Topic, Problem, Achievement } from '../types';

// --- Mock Data ---
// Used if Firebase is not configured or for development
const MOCK_ACHIEVEMENTS: Achievement[] = [
    { id: 'ach1', name: 'Algebra Adept', icon: 'Star', date: '2024-06-20' },
    { id: 'ach2', name: 'Fraction Fanatic', icon: 'Star', date: '2024-06-18' },
    { id: 'ach3', name: 'First Steps', icon: 'PlayCircle', date: '2024-06-15' },
];

const MOCK_USER: User = {
  id: 'dev-user-01',
  name: 'Alex',
  progress: {
    'algebra-basics': 0.8,
    'geometry-intro': 0.5,
    'fractions': 0.95,
    'calculus-1': 0.2,
  },
  achievements: MOCK_ACHIEVEMENTS,
};

const MOCK_TOPICS: Topic[] = [
  { id: 'algebra-basics', name: 'Algebra Basics', description: 'Introduction to variables and equations.', subtopics: ['Variables', 'Linear Equations', 'Inequalities'] },
  { id: 'geometry-intro', name: 'Geometry Intro', description: 'Exploring shapes, angles, and space.', subtopics: ['Points & Lines', 'Angles', 'Triangles', 'Circles'] },
  { id: 'fractions', name: 'Fractions', description: 'Understanding parts of a whole.', subtopics: ['What is a Fraction?', 'Adding Fractions', 'Multiplying Fractions'] },
  { id: 'calculus-1', name: 'Calculus I', description: 'The study of continuous change.', subtopics: ['Limits', 'Derivatives', 'Integration'] },
  { id: 'trigonometry', name: 'Trigonometry', description: 'Relationships between side lengths and angles of triangles.', subtopics: ['Sine', 'Cosine', 'Tangent'] },
];

const MOCK_PROBLEMS: { [key: string]: Problem[] } = {
  'algebra-basics': [
    { id: 'ab-1', type: 'mcq', question: 'What is the value of x in the equation 2x + 5 = 15?', options: ['3', '5', '10', '-5'], answer: '5', hint: 'Try subtracting 5 from both sides first.' },
    { id: 'ab-2', type: 'input', question: 'Solve for y: 3y - 7 = 14', answer: '7', hint: 'Add 7 to both sides, then divide by 3.' },
  ],
  'geometry-intro': [
    { id: 'gi-1', type: 'mcq', question: 'How many degrees are in a right angle?', options: ['45', '90', '180', '360'], answer: '90', hint: 'A right angle is like the corner of a square.' },
  ],
};
// --- End Mock Data ---

interface AppContextType {
  user: User | null;
  topics: Topic[];
  getProblemsForTopic: (topicId: string) => Problem[];
  loading: boolean;
  updateUserProgress: (topicId: string, newProgress: number, problemCorrect: boolean) => Promise<void>;
  generateNewProblem: (topicId: string) => Promise<Problem | null>;
  addAchievement: (achievement: Achievement) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [problems, setProblems] = useState<{ [key: string]: Problem[] }>({});
  const [loading, setLoading] = useState(true);

  // Effect to initialize data (mock or Firebase)
  useEffect(() => {
    const bootstrapAppData = async () => {
        setLoading(true);
        // TODO: Implement Firebase initialization here if firebaseAuth and firestoreDb are available
        // For now, we'll use mock data.
        // Example of Firebase auth listener:
        /*
        if (firebaseAuth && firestoreDb) {
            const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
                if (firebaseUser) {
                    const userRef = doc(firestoreDb, "users", firebaseUser.uid);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        setUser({ id: firebaseUser.uid, ...userSnap.data() } as User);
                    } else {
                        // Create new user if not exists
                        const newUser: Omit<User, 'id'> = { name: firebaseUser.displayName || 'New User', progress: {}, achievements: [] };
                        await setDoc(userRef, newUser);
                        setUser({ id: firebaseUser.uid, ...newUser });
                    }
                    // Fetch topics and problems from Firestore
                    // ... (similar logic as in the original multi-file example)
                } else {
                    // No user signed in, could attempt anonymous sign-in or show login
                    // await signInAnonymously(firebaseAuth);
                    setUser(null); // Or set to a guest user profile
                }
                setLoading(false);
            });
            return () => unsubscribe();
        } else {
        */
            // Fallback to mock data if Firebase is not configured/initialized
            console.log("Using mock data for AppContext.");
            setUser(MOCK_USER);
            setTopics(MOCK_TOPICS);
            setProblems(MOCK_PROBLEMS);
            setLoading(false);
        /*
        }
        */
    };
    bootstrapAppData();
  }, []);

  const updateUserProgress = async (topicId: string, currentProgress: number, problemCorrect: boolean) => {
    if (!user) return;

    // Increment progress by a small amount if correct, ensure it doesn't exceed 1
    // This is a simple progress update logic, can be made more sophisticated
    const progressIncrement = problemCorrect ? 0.05 : 0; // Only increment if correct
    const newProgressValue = Math.min(1, currentProgress + progressIncrement);

    const updatedProgress = { ...user.progress, [topicId]: newProgressValue };

    // Mock update
    setUser(prevUser => prevUser ? { ...prevUser, progress: updatedProgress } : null);

    // TODO: Firebase update logic
    /*
    if (firestoreDb && user) {
        const userRef = doc(firestoreDb, "users", user.id);
        await updateDoc(userRef, { progress: updatedProgress });
    }
    */
  };

  const getProblemsForTopic = (topicId: string): Problem[] => {
    return problems[topicId] || [];
  };

  const generateNewProblem = async (topicId: string): Promise<Problem | null> => {
      try {
        // Nginx proxies /api to the backend container, so relative path is fine
        const response = await fetch(`/api/generate-problem?topic=${encodeURIComponent(topicId)}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch new problem (status: ${response.status})`);
        }
        const newProblem: Problem = await response.json();

        // Add the new problem to our local state if it's valid
        if (newProblem && newProblem.id) {
            setProblems(prevProblems => ({
                ...prevProblems,
                [topicId]: [...(prevProblems[topicId] || []), newProblem]
            }));
            return newProblem;
        }
        return null;
      } catch (error) {
        console.error("Error generating problem via API:", error);
        // Fallback: return a generic local problem or null
        // For now, just returning null
        return null;
      }
  };

  const addAchievement = (achievement: Achievement) => {
    if (!user) return;
    // Avoid adding duplicate achievements by ID
    if (user.achievements.find(ach => ach.id === achievement.id)) return;

    const updatedAchievements = [...user.achievements, achievement];
    setUser(prevUser => prevUser ? { ...prevUser, achievements: updatedAchievements } : null);

    // TODO: Firebase update logic
    /*
    if (firestoreDb && user) {
        const userRef = doc(firestoreDb, "users", user.id);
        await updateDoc(userRef, { achievements: updatedAchievements });
    }
    */
  };

  return (
    <AppContext.Provider value={{ user, topics, loading, getProblemsForTopic, updateUserProgress, generateNewProblem, addAchievement }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
