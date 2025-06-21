import React from 'react';
import { BarChart2, Zap } from 'lucide-react'; // Zap for mastery
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/Card';
import { Topic } from '../types';
import { useNavigate } from 'react-router-dom';

// DEV_NOTE: navigateTo prop removed, using useNavigate from react-router-dom.

export const ProgressView: React.FC = () => { // Renamed component
  const { user, topics } = useApp();
  const navigate = useNavigate();

  if (!user) {
    return <div className="text-center p-8"><p>Loading user data...</p></div>;
  }

  const getTopicCardStyle = (progress: number): string => {
    if (progress >= 0.9) return 'border-green-500 bg-green-50 hover:shadow-green-100'; // Mastered
    if (progress >= 0.5) return 'border-blue-500 bg-blue-50 hover:shadow-blue-100';   // Proficient
    if (progress > 0) return 'border-yellow-500 bg-yellow-50 hover:shadow-yellow-100';// In Progress
    return 'border-gray-300 bg-gray-50 hover:shadow-gray-100'; // Not Started
  };

  const getProgressBarColor = (progress: number): string => {
    if (progress >= 0.9) return 'bg-green-500';
    if (progress >= 0.5) return 'bg-blue-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-indigo-600'; // Default for not started, or can be gray
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Progress</h2>

      <Card title="Skills Overview" icon={BarChart2}>
        {topics.length === 0 && <p className="text-gray-500">No topics available yet. Check back soon!</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {topics.map((topic: Topic) => {
            const progress = user.progress[topic.id] || 0;
            const percentage = (progress * 100).toFixed(0);

            return (
              <div
                key={topic.id}
                className={`p-4 sm:p-5 rounded-lg border-2 cursor-pointer hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1 ${getTopicCardStyle(progress)}`}
                // DEV_NOTE: Navigate to learning view, potentially passing topicId as a query param or part of the path
                onClick={() => navigate(`/learning?topicId=${topic.id}`)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && navigate(`/learning?topicId=${topic.id}`)}
                aria-label={`Topic: ${topic.name}, Progress: ${percentage}%`}
              >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 text-md sm:text-lg mb-1">{topic.name}</h3>
                    {progress >= 0.9 && <Zap className="w-5 h-5 text-green-500" title="Mastered"/>}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 mb-3 line-clamp-2">{topic.description}</p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-1">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ease-out ${getProgressBarColor(progress)}`}
                    style={{ width: `${percentage}%` }}
                    aria-hidden="true"
                  ></div>
                </div>
                <p className="text-right text-xs sm:text-sm font-semibold text-indigo-700">
                  {percentage}% Mastered
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Potentially add other progress-related sections here, like: */}
      {/* - Streaks */}
      {/* - Time spent learning */}
      {/* - Badges/Achievements summary (though Dashboard has details) */}
    </div>
  );
};
