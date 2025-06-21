import React, { useState } from 'react';
import { useApp as useAppInternal } from './contexts/AppContext'; // Renamed to avoid conflict if needed locally
import { Header } from './components/Header';
import { Dashboard } from './views/Dashboard';
import { LearningZone } from './views/LearningZone';
import { ProgressCenter } from './views/ProgressCenter';
import { ExplorationZone } from './views/ExplorationZone';
// Ensure all view components are created/imported

// Define view names for type safety
type ActiveView = 'dashboard' | 'learningZone' | 'progressCenter' | 'explorationZone';

const AppContent: React.FC = () => {
    const [activeView, setActiveView] = useState<ActiveView>('dashboard');
    const [currentTopicId, setCurrentTopicId] = useState<string | null>(null);
    const { loading, user } = useAppInternal(); // useAppInternal is the hook from AppContext

    const navigateTo = (view: ActiveView, topicId: string | null = null) => {
        setActiveView(view);
        setCurrentTopicId(topicId);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                    {/* You can add a spinner or a more elaborate loading animation here */}
                    <p className="text-xl font-semibold text-indigo-600">Loading MathQuest...</p>
                    <p className="text-gray-500">Preparing your learning adventure!</p>
                </div>
            </div>
        );
    }

    if (!user && !loading) {
         return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Initialization Error</h1>
                    <p className="text-gray-700 mb-2">Could not load user data.</p>
                    <p className="text-gray-500 text-sm">This might be due to a missing Firebase configuration or network issues if using a live backend. The app currently relies on mock data if Firebase is not set up.</p>
                    <p className="text-gray-500 text-sm mt-2">Please check the console for more details.</p>
                </div>
            </div>
        );
    }


    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard navigateTo={navigateTo} />;
            case 'learningZone':
                if (!currentTopicId) {
                    // Fallback if learningZone is active but no topicId is set
                    // This could redirect to dashboard or show an error/selection message
                    return <Dashboard navigateTo={navigateTo} />;
                }
                return <LearningZone topicId={currentTopicId} navigateTo={navigateTo} />;
            case 'progressCenter':
                return <ProgressCenter navigateTo={navigateTo} />;
            case 'explorationZone':
                return <ExplorationZone />;
            default:
                // Fallback to dashboard for any unknown view state
                return <Dashboard navigateTo={navigateTo} />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Header activeView={activeView} setActiveView={(viewId) => setActiveView(viewId as ActiveView)} />
            <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                {renderView()}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    // AppProvider is already wrapping this in index.tsx
    return <AppContent />;
};

export default App;
