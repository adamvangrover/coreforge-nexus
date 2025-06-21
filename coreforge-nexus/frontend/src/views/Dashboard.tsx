import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Topic } from '../types';

interface DashboardProps {
  navigateTo: (view: string, topicId?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ navigateTo }) => {
  const { user, topics } = useApp();

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic: Topic) => (
          <div key={topic.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">{topic.name}</h2>
            <p className="text-gray-600 mb-3">{topic.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${(user.progress[topic.id] || 0) * 100}%` }}
              ></div>
            </div>
            <button
              onClick={() => navigateTo('learningZone', topic.id)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              Learn {topic.name}
            </button>
          </div>
        ))}
      </div>
      {/* Placeholder for other dashboard elements like recent achievements or daily challenges */}
    </div>
  );
};
