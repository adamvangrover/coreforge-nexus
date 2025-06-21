import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Topic, Achievement } from '../types';
import { Star, Award, Zap } from 'lucide-react'; // Example icons

interface ProgressCenterProps {
  navigateTo: (view: string, topicId?: string) => void;
}

const AchievementIcon: React.FC<{iconName: string, className?: string}> = ({ iconName, className="w-6 h-6" }) => {
    switch(iconName) {
        case 'Star': return <Star className={className} />;
        case 'Award': return <Award className={className} />;
        case 'Zap': return <Zap className={className} />;
        default: return <Star className={className} />; // Default icon
    }
};

export const ProgressCenter: React.FC<ProgressCenterProps> = ({ navigateTo }) => {
  const { user, topics } = useApp();

  if (!user) return <p>Loading user data...</p>;

  const overallProgress = topics.reduce((acc, topic) => acc + (user.progress[topic.id] || 0), 0) / topics.length;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Your Progress Center</h1>

      {/* Overall Progress Section */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-3">Overall Learning Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${overallProgress * 100}%` }}
          ></div>
        </div>
        <p className="text-right text-lg font-medium text-green-600">{(overallProgress * 100).toFixed(1)}% Complete</p>
      </section>

      {/* Progress by Topic Section */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Progress by Topic</h2>
        <div className="space-y-4">
          {topics.map((topic: Topic) => (
            <div key={topic.id}>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-gray-700">{topic.name}</span>
                <span className="text-sm font-medium text-blue-700">{( (user.progress[topic.id] || 0) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(user.progress[topic.id] || 0) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Achievements</h2>
        {user.achievements.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {user.achievements.map((achievement: Achievement) => (
              <div key={achievement.id} className="flex flex-col items-center p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-center">
                <AchievementIcon iconName={achievement.icon} className="w-12 h-12 text-yellow-500 mb-2" />
                <h3 className="text-lg font-semibold text-yellow-700">{achievement.name}</h3>
                <p className="text-xs text-gray-500">Earned: {new Date(achievement.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No achievements yet. Keep learning to unlock them!</p>
        )}
      </section>

      <div className="text-center mt-8">
          <button
            onClick={() => navigateTo('dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out"
          >
            Back to Dashboard
          </button>
      </div>
    </div>
  );
};
