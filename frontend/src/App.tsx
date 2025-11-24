import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp as useAppInternal } from './contexts/AppContext';
import { MainLayout } from './components/MainLayout'; // Import MainLayout
import { DashboardView } from './views/DashboardView';
import { LearningView } from './views/LearningView';
import { ProgressView } from './views/ProgressView';
import { ExplorationView } from './views/ExplorationView';
import { ResourcesView } from './views/ResourcesView';

// DEV_NOTE: MainLayout component will be introduced in a subsequent step to wrap routes
// that share the common header/sidebar structure. For now, Header is included directly.

const AppContent: React.FC = () => {
    const { loading, user } = useAppInternal();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                    <p className="text-xl font-semibold text-indigo-600">Loading CoreForge Nexus...</p>
                    <p className="text-gray-500">Preparing your learning adventure!</p>
                </div>
            </div>
        );
    }

    // DEV_NOTE: Basic user check. Authentication flow will be more robust later.
    // If no user, we could redirect to a login page in the future.
    // For now, if no user, some views might not function correctly or show personalized data.
    if (!user && !loading) {
         return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Initialization Error</h1>
                    <p className="text-gray-700 mb-2">Could not load user data.</p>
                    <p className="text-gray-500 text-sm">This might be due to a missing Firebase configuration or network issues. The app currently relies on mock data if Firebase is not set up.</p>
                    <p className="text-gray-500 text-sm mt-2">Please check the console for more details.</p>
                    {/* DEV_NOTE: In a real app, redirect to a login page or show a more user-friendly error. */}
                </div>
            </div>
        );
    }

    return (
        // DEV_NOTE: The outer div with bg-gray-50 etc. is now handled by MainLayout for routes using it.
        // If there are routes that *don't* use MainLayout (e.g. a future full-screen Login page),
        // they would need their own root styling.
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate replace to="/dashboard" />} />
                <Route path="/dashboard" element={<DashboardView />} />

                {/* Learning Routes */}
                <Route path="/learning" element={<LearningView />} />
                <Route path="/learning/:gradeId" element={<LearningView />} />
                <Route path="/learning/:gradeId/:subjectId" element={<LearningView />} />
                <Route path="/learning/:gradeId/:subjectId/:lessonId" element={<LearningView />} />

                <Route path="/progress" element={<ProgressView />} />
                <Route path="/explore" element={<ExplorationView />} />
                <Route path="/resources" element={<ResourcesView />} />
            </Route>
            {/* DEV_NOTE: Add a 404 Not Found route later, potentially also within MainLayout or outside */}
            {/* <Route path="*" element={<NotFoundView />} /> */}
        </Routes>
    );
};

const App: React.FC = () => {
    // AppProvider is already wrapping this in index.tsx
    // BrowserRouter should wrap any components that use Link or useNavigation, etc.
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

export default App;
