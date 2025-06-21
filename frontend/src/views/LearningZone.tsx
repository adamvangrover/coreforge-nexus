import React, { useState, useEffect, FormEvent } from 'react';
import { Lightbulb, CheckCircle, XCircle, AlertTriangle, RotateCw, Send } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/Card';
import { Problem, Topic } from '../types';

type ActiveView = 'dashboard' | 'learningZone' | 'progressCenter' | 'explorationZone';

interface LearningZoneProps {
  topicId: string;
  navigateTo: (view: ActiveView, topicId?: string | null) => void;
}

export const LearningZone: React.FC<LearningZoneProps> = ({ topicId, navigateTo }) => {
  const { topics, getProblemsForTopic, updateUserProgress, generateNewProblem, user } = useApp();

  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [problemsForTopic, setProblemsForTopic] = useState<Problem[]>([]);
  const [problemIndex, setProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isLoadingProblem, setIsLoadingProblem] = useState(false);
  const [errorLoadingProblem, setErrorLoadingProblem] = useState<string | null>(null);

  // Effect to load topic and initial problems
  useEffect(() => {
    const topic = topics.find(t => t.id === topicId);
    setCurrentTopic(topic || null);
    if (topic) {
      const initialProblems = getProblemsForTopic(topic.id);
      setProblemsForTopic(initialProblems);
      setProblemIndex(0); // Reset index when topic changes
      setFeedback(null);
      setUserAnswer('');
      setShowHint(false);
      setErrorLoadingProblem(null);

      // If no problems initially, try to generate one
      if (initialProblems.length === 0) {
        handleGenerateNewProblem();
      }
    }
  }, [topicId, topics, getProblemsForTopic]); // Removed handleGenerateNewProblem from deps

  const currentProblem = problemsForTopic[problemIndex];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentProblem || userAnswer.trim() === '') return;

    const isCorrect = userAnswer.toLowerCase().trim() === currentProblem.answer.toLowerCase().trim();
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    // Update progress in AppContext
    if (user && currentTopic) {
        const currentProgress = user.progress[currentTopic.id] || 0;
        await updateUserProgress(currentTopic.id, currentProgress, isCorrect);
    }
  };

  const handleNextProblem = () => {
    setFeedback(null);
    setUserAnswer('');
    setShowHint(false);
    setErrorLoadingProblem(null);
    if (problemIndex < problemsForTopic.length - 1) {
      setProblemIndex(prev => prev + 1);
    } else {
      // If at the end of current problems, try to generate a new one
      handleGenerateNewProblem();
    }
  };

  const handleGenerateNewProblem = async () => {
    if (!currentTopic) return;
    setIsLoadingProblem(true);
    setErrorLoadingProblem(null);
    const newProblem = await generateNewProblem(currentTopic.id);
    setIsLoadingProblem(false);
    if (newProblem) {
      // The new problem is already added to the context's state,
      // so we just need to update our local copy and set the index.
      const updatedProblems = getProblemsForTopic(currentTopic.id);
      setProblemsForTopic(updatedProblems);
      setProblemIndex(updatedProblems.length - 1); // Go to the newly added problem
    } else {
      setErrorLoadingProblem("Could not generate a new problem. Please try again or check back later.");
      // If no problems exist at all after failing to generate
      if (problemsForTopic.length === 0) {
        // Potentially navigate away or show a more persistent error
      }
    }
  };

  if (!currentTopic) {
    return (
      <Card title="Topic Not Found" icon={AlertTriangle}>
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-800">We couldn't find the topic you're looking for.</h2>
          <p className="text-gray-500 mt-2">Please try selecting another topic from the dashboard or progress center.</p>
          <button
            onClick={() => navigateTo('dashboard')}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Go to Dashboard
          </button>
        </div>
      </Card>
    );
  }

  if (isLoadingProblem && !currentProblem) { // Show loading only if there's no current problem to display
    return (
        <Card title={`Loading Problem for ${currentTopic.name}`} icon={RotateCw} className="animate-pulse">
            <div className="text-center p-10">
                <p className="text-lg text-gray-600">Generating a new challenge...</p>
            </div>
        </Card>
    );
  }

  if (!currentProblem && !isLoadingProblem) {
    return (
      <Card title={currentTopic.name} icon={AlertTriangle}>
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">No problems available for {currentTopic.name} right now.</h2>
          {errorLoadingProblem && <p className="text-red-500 mt-2">{errorLoadingProblem}</p>}
          <p className="text-gray-500 mt-2">You can try generating a new one, or explore other topics.</p>
          <div className="mt-6 space-x-4">
            <button
              onClick={handleGenerateNewProblem}
              disabled={isLoadingProblem}
              className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 flex items-center justify-center mx-auto">
              {isLoadingProblem ? <><RotateCw className="w-5 h-5 mr-2 animate-spin"/> Generating...</> : 'Try Generate New Problem'}
            </button>
            <button
              onClick={() => navigateTo('dashboard')}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Back to Dashboard
            </button>
          </div>
        </div>
      </Card>
    );
  }

  // Current problem definitely exists here
  const problemToShow = currentProblem!;

  return (
    <div className="max-w-2xl mx-auto">
      <Card title={currentTopic.name} icon={LucideIcons.BookOpen} contentClassName="bg-gray-50">
        <div className="p-3 sm:p-6">
          <p className="text-gray-500 text-xs sm:text-sm mb-1">
            Problem {problemIndex + 1} of {problemsForTopic.length} (Topic ID: {topicId})
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">{problemToShow.question}</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {problemToShow.type === 'mcq' && problemToShow.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {problemToShow.options.map((option: string) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => !feedback && setUserAnswer(option)} // Prevent changing answer after feedback
                    disabled={!!feedback}
                    className={`p-3 sm:p-4 rounded-lg text-left transition-all text-sm sm:text-base
                                ${userAnswer === option ? 'bg-indigo-200 ring-2 ring-indigo-500 text-indigo-800 font-semibold' : 'bg-white hover:bg-gray-100 border border-gray-300'}
                                ${feedback && userAnswer === option && feedback === 'correct' ? '!bg-green-200 !ring-green-500 !text-green-800' : ''}
                                ${feedback && userAnswer === option && feedback === 'incorrect' ? '!bg-red-200 !ring-red-500 !text-red-800' : ''}
                                ${feedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            {problemToShow.type === 'input' && (
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={!!feedback}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base disabled:bg-gray-100"
                placeholder="Type your answer here"
              />
            )}
            <button
              type="submit"
              disabled={!userAnswer.trim() || !!feedback || isLoadingProblem}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
            >
              <Send className="w-5 h-5 mr-2"/> Check Answer
            </button>
          </form>

          <div className="mt-4">
            <button onClick={() => setShowHint(!showHint)} className="text-sm text-indigo-600 hover:underline flex items-center">
              <Lightbulb className="w-4 h-4 mr-1"/>
              {showHint ? 'Hide Hint' : 'Need a hint?'}
            </button>
            {showHint && <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm animate-fadeIn">{problemToShow.hint}</div>}
          </div>

          {feedback && (
            <div className={`mt-6 p-4 rounded-lg flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 animate-fadeIn ${feedback === 'correct' ? 'bg-green-100' : 'bg-red-100'}`}>
              {feedback === 'correct' ?
                <CheckCircle className="h-8 w-8 text-green-600 shrink-0"/> :
                <XCircle className="h-8 w-8 text-red-600 shrink-0"/>
              }
              <div className="text-center sm:text-left flex-grow">
                <h4 className="font-bold text-md sm:text-lg">{feedback === 'correct' ? "That's right!" : "Not quite..."}</h4>
                {feedback === 'incorrect' && <p className="text-sm text-gray-700">The correct answer is: <strong className="font-semibold">{problemToShow.answer}</strong>.</p>}
                {feedback === 'correct' && <p className="text-sm text-green-700">Great job! Keep going.</p>}
              </div>
              <button
                onClick={handleNextProblem}
                disabled={isLoadingProblem}
                className="w-full sm:w-auto bg-white px-4 py-2 rounded-lg shadow-sm font-semibold text-sm text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 flex items-center justify-center"
              >
                {isLoadingProblem && problemIndex >= problemsForTopic.length -1 ? <><RotateCw className="w-4 h-4 mr-2 animate-spin"/> Loading...</> : 'Next Problem'}
              </button>
            </div>
          )}
          {errorLoadingProblem && !currentProblem && ( // Show error if problem loading failed and no current problem available
                <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg text-sm">
                    <AlertTriangle className="inline w-5 h-5 mr-2" /> {errorLoadingProblem}
                </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// Add a simple fadeIn animation to tailwind.config.js if you want or use a library
// In tailwind.config.js:
// theme: {
//   extend: {
//     keyframes: {
//       fadeIn: {
//         '0%': { opacity: 0 },
//         '100%': { opacity: 1 },
//       }
//     },
//     animation: {
//       fadeIn: 'fadeIn 0.5s ease-in-out',
//     }
//   }
// }
