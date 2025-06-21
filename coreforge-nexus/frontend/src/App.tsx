import React, { useState } from 'react';
import { AppProvider, useApp as useAppInternal } from './contexts/AppContext'; // Renamed to avoid conflict
import { Header } from './components/Header';
import { Dashboard } from './views/Dashboard';
import { LearningZone } from './views/LearningZone';
import { ProgressCenter } from './views/ProgressCenter';
import { ExplorationZone } from './views/ExplorationZone';

const AppContent: React.FC = () => {
    const [activeView, setActiveView] = useState('dashboard');
    const [currentTopicId, setCurrentTopicId] = useState<string | null>(null);
    const { loading } = useAppInternal();

    const navigateTo = (view: string, topicId: string | null = null) => {
        setActiveView(view);
        setCurrentTopicId(topicId);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen font-bold text-2xl">Loading CoreForge Nexus...</div>;
    }

    const renderView = () => {
        switch (activeView) {
            case 'dashboard': return <Dashboard navigateTo={navigateTo} />;
            case 'learningZone': return <LearningZone topicId={currentTopicId!} navigateTo={navigateTo}/>;
            case 'progressCenter': return <ProgressCenter navigateTo={navigateTo} />;
            case 'explorationZone': return <ExplorationZone />;
            default: return <Dashboard navigateTo={navigateTo} />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Header activeView={activeView} setActiveView={setActiveView} />
            <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                {renderView()}
            </main>
        </div>
    );
};

const App: React.FC = () => (
    <AppProvider>
        <AppContent />
    </AppProvider>
);

export default App;
