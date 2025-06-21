import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Problem } from '../types';

interface LearningZoneProps {
  topicId: string;
  navigateTo: (view: string, topicId?: string) => void;
}

export const LearningZone: React.FC<LearningZoneProps> = ({ topicId, navigateTo }) => {
  const { getProblemsForTopic, generateNewProblem, updateUserProgress, topics, user } = useApp();
  const [currentProblems, setCurrentProblems] = useState<Problem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isLoadingProblem, setIsLoadingProblem] = useState(false);

  const topic = topics.find(t => t.id === topicId);

  useEffect(() => {
    const initialProblems = getProblemsForTopic(topicId);
    setCurrentProblems(initialProblems);
    setCurrentProblemIndex(0); // Reset to first problem when topic changes
    setUserAnswer('');
    setFeedback('');
    setShowHint(false);
  }, [topicId, getProblemsForTopic]);

  const currentProblem = currentProblems[currentProblemIndex];

  const handleAnswerSubmit = async () => {
    if (!currentProblem) return;
    if (userAnswer.toLowerCase() === currentProblem.answer.toLowerCase()) {
      setFeedback('Correct! Great job!');
      // Update progress - simple logic: 10% progress per correct answer in this topic
      const currentTopicProgress = user?.progress[topicId] || 0;
      await updateUserProgress(topicId, currentTopicProgress + 0.1);
      // Potentially load next problem or offer to generate new one
    } else {
      setFeedback(`Not quite. The correct answer is ${currentProblem.answer}. Keep trying!`);
    }
    setShowHint(false);
  };

  const handleNextProblem = () => {
    setFeedback('');
    setUserAnswer('');
    setShowHint(false);
    if (currentProblemIndex < currentProblems.length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
    } else {
      // Optionally, prompt to generate a new problem if at the end of the list
      setFeedback("You've completed all available problems for now. Try generating a new one!");
    }
  };

  const handleGenerateProblem = async () => {
    setIsLoadingProblem(true);
    setFeedback('');
    setUserAnswer('');
    setShowHint(false);
    const newProblem = await generateNewProblem(topicId);
    if (newProblem) {
      setCurrentProblems(prev => [...prev, newProblem]);
      setCurrentProblemIndex(currentProblems.length); // Index of the new problem
    } else {
      setFeedback("Sorry, couldn't generate a new problem at this time.");
    }
    setIsLoadingProblem(false);
  };

  if (!topic) return <p>Topic not found.</p>;
  if (!currentProblem && !isLoadingProblem && currentProblems.length === 0) {
    return (
        <div className="text-center p-8 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No problems for {topic.name} yet.</h2>
            <button
                onClick={handleGenerateProblem}
                disabled={isLoadingProblem}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out disabled:opacity-50"
            >
                {isLoadingProblem ? 'Generating...' : `Generate First Problem for ${topic.name}`}
            </button>
        </div>
    );
  }
  if (isLoadingProblem && !currentProblem) {
    return <p className="text-lg text-indigo-600">Generating a new problem for {topic.name}...</p>;
  }
  if (!currentProblem) {
      // This case might happen if generation fails and there were no problems initially
      return (
          <div className="text-center p-8 bg-white rounded-lg shadow-xl">
              <p className="text-xl text-red-500 mb-4">Could not load a problem.</p>
              <button
                  onClick={() => navigateTo('dashboard')}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
              >
                  Back to Dashboard
              </button>
          </div>
      );
  }


  return (
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto">
      <button
        onClick={() => navigateTo('dashboard')}
        className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md text-sm"
      >
        &larr; Back to Dashboard
      </button>
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">Learning: {topic.name}</h1>
      <p className="text-gray-600 mb-6">{topic.description}</p>

      <div className="bg-gray-50 p-6 rounded-md shadow-inner">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Problem {currentProblemIndex + 1} of {currentProblems.length}:</h2>
        <p className="text-lg text-gray-700 mb-4 whitespace-pre-wrap">{currentProblem.question}</p>

        {currentProblem.type === 'mcq' && currentProblem.options && (
          <div className="space-y-2 mb-4">
            {currentProblem.options.map(option => (
              <button
                key={option}
                onClick={() => setUserAnswer(option)}
                className={`block w-full text-left p-3 rounded-md border-2 ${userAnswer === option ? 'border-indigo-500 bg-indigo-100' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentProblem.type === 'input' && (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 mb-4"
            placeholder="Your answer here"
          />
        )}

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-4">
            <button
                onClick={handleAnswerSubmit}
                disabled={!userAnswer}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-50"
            >
                Submit Answer
            </button>
            <button
                onClick={() => setShowHint(true)}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out"
            >
                Show Hint
            </button>
        </div>

        {showHint && <p className="text-sm text-yellow-700 bg-yellow-100 p-3 rounded-md mb-4">Hint: {currentProblem.hint}</p>}
        {feedback && <p className={`text-md p-3 rounded-md ${feedback.startsWith('Correct') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{feedback}</p>}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
        <button
          onClick={handleNextProblem}
          disabled={currentProblemIndex >= currentProblems.length - 1 && feedback === "You've completed all available problems for now. Try generating a new one!"}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-150 ease-in-out disabled:opacity-50"
        >
          Next Problem &rarr;
        </button>
        <button
            onClick={handleGenerateProblem}
            disabled={isLoadingProblem}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-md transition duration-150 ease-in-out disabled:opacity-50"
        >
            {isLoadingProblem ? 'Generating...' : 'Generate New Problem ✨'}
        </button>
      </div>
    </div>
  );
};
