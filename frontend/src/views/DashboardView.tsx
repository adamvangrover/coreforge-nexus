import React from 'react';
import * as LucideIcons from 'lucide-react'; // Import all icons
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/Card';
import { ProgressRing } from '../components/ProgressRing';
import { Topic, Achievement } from '../types';
import { useNavigate } from 'react-router-dom';

// DEV_NOTE: ActiveView prop is removed as navigation is handled by react-router-dom

// Helper function to safely get a Lucide icon component by name
const getIconComponent = (iconName: string): React.ElementType => {
    const IconComponent = (LucideIcons as any)[iconName];
    // DEV_NOTE: Ensure LucideIcons are available or provide a more robust default.
    return IconComponent || LucideIcons.HelpCircle; // Default icon if not found
};

export const DashboardView: React.FC = () => {
    const { user, topics } = useApp();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="text-center p-8">
                <p className="text-xl text-gray-600">Loading user data or user not found...</p>
            </div>
        );
    }

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    // Determine topics for "Continue Learning" and "Recommended"
    // This logic can be adjusted based on requirements.
    // For example, "Continue Learning" could be topics with progress > 0 and < 0.9
    // "Recommended" could be topics with 0 progress or new topics.

    const inProgressTopics = topics
        .filter(topic => (user.progress[topic.id] || 0) > 0 && (user.progress[topic.id] || 0) < 1)
        .sort((a, b) => (user.progress[b.id] || 0) - (user.progress[a.id] || 0)) // Show highest progress first
        .slice(0, 2); // Max 2

    const recommendedTopics = topics
        .filter(topic => !(user.progress[topic.id] || 0) || (user.progress[topic.id] || 0) === 0)
        .slice(0, 2); // Max 2

    // If not enough in-progress, fill "Continue Learning" with recommended (if any)
    const continueLearningTopics = [...inProgressTopics];
    if (continueLearningTopics.length < 2 && recommendedTopics.length > 0) {
        recommendedTopics.slice(0, 2 - continueLearningTopics.length).forEach(t => {
            if (!continueLearningTopics.find(clt => clt.id === t.id)) {
                continueLearningTopics.push(t);
            }
        });
    }

    const finalRecommendedTopics = topics
        .filter(t => !continueLearningTopics.find(clt => clt.id === t.id)) // Exclude topics already in "Continue"
        .slice(0, 2);


    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Greeting */}
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{getGreeting()}, {user.name}!</h2>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">Ready to expand your math knowledge?</p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Left Column: Learning Sections */}
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                    {/* Continue Learning Section */}
                    {continueLearningTopics.length > 0 && (
                        <Card title="Continue Learning" icon={LucideIcons.PlayCircle}>
                            <div className="space-y-4">
                                {continueLearningTopics.map((topic: Topic) => (
                                    <div key={topic.id} className="flex flex-col sm:flex-row items-start sm:items-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-150">
                                        <div className="flex-grow mb-3 sm:mb-0">
                                            <h3 className="font-semibold text-gray-800 text-md sm:text-lg">{topic.name}</h3>
                                            <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{topic.description}</p>
                                            <div className="mt-2 sm:hidden"> {/* Progress Ring for mobile, shown below text */}
                                                <ProgressRing progress={user.progress[topic.id] || 0} size={50} strokeWidth={4} />
                                            </div>
                                        </div>
                                        <div className="hidden sm:block sm:mx-4"> {/* Progress Ring for desktop */}
                                            <ProgressRing progress={user.progress[topic.id] || 0} size={60} strokeWidth={5} />
                                        </div>
                                        <button
                                            // DEV_NOTE: Navigation to specific topic will be handled inside LearningView or via query/path params.
                                            onClick={() => navigate('/learning')}
                                            className="w-full sm:w-auto mt-2 sm:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                                            { (user.progress[topic.id] || 0) > 0 ? 'Continue' : 'Start' }
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* Recommended For You Section */}
                    {finalRecommendedTopics.length > 0 && (
                        <Card title="Recommended For You" icon={LucideIcons.Lightbulb}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {finalRecommendedTopics.map((topic: Topic) => (
                                    <div
                                        key={topic.id}
                                        className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white hover:border-indigo-300"
                                        // DEV_NOTE: Navigation to specific topic will be handled inside LearningView or via query/path params.
                                        onClick={() => navigate('/learning')}
                                        role="button"
                                        tabIndex={0}
                                        onKeyPress={(e) => e.key === 'Enter' && navigate('/learning')}
                                    >
                                        <h3 className="font-semibold text-gray-800 text-md sm:text-lg">{topic.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-3">{topic.description}</p>
                                        {/* Optionally, add a small "Start" button or icon here too */}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                     {continueLearningTopics.length === 0 && finalRecommendedTopics.length === 0 && (
                        <Card title="Explore Topics" icon={LucideIcons.Search}>
                            <p className="text-gray-600">It looks like you've mastered all available topics or there are no recommendations right now! Why not explore all topics in the Progress Center?</p>
                            <button
                                onClick={() => navigate('/progress')}
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-green-700 transition-colors">
                                Go to Progress Center
                            </button>
                        </Card>
                    )}
                </div>

                {/* Right Column: Achievements */}
                {user.achievements && user.achievements.length > 0 && (
                    <div className="lg:col-span-1">
                        <Card title="Achievements" icon={LucideIcons.Star}>
                            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2"> {/* Added max-height and scroll */}
                                {user.achievements.map((ach: Achievement) => {
                                    const AchIcon = getIconComponent(ach.icon);
                                    return (
                                        <li key={ach.id} className="flex items-center space-x-3 p-2 hover:bg-yellow-50 rounded-md">
                                            <div className="bg-yellow-100 p-2 rounded-full">
                                                <AchIcon className="h-6 w-6 text-yellow-500" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm sm:text-base">{ach.name}</p>
                                                <p className="text-xs text-gray-400">Earned on {new Date(ach.date).toLocaleDateString()}</p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};
