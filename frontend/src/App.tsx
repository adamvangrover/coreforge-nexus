import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp as useAppInternal } from './contexts/AppContext';
import { MainLayout } from './components/MainLayout'; // Import MainLayout

// View Components
import { Dashboard } from './views/Dashboard';
import { LearningView } from './views/LearningView';
import { ProgressView } from './views/ProgressView';
import { ExploreView } from './views/ExploreView';
import { ResourcesView } from './views/ResourcesView';
import { CurriculumTreeView } from './views/CurriculumTreeView'; // Import Tree View
import { CurriculumListPage } from './views/CurriculumListPage'; // Import List View
// DEV_NOTES: Placeholder for a NotFoundView
// import { NotFoundView } from './views/NotFoundView';


const AppContent: React.FC = () => {
    const { loading, user } = useAppInternal();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                    <p className="text-xl font-semibold text-indigo-600">Loading Platform...</p>
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
                    <p className="text-gray-700 mb-2">Could not load user data or user not found.</p>
                    <p className="text-gray-500 text-sm">Please ensure the application is correctly configured (e.g., Firebase setup if applicable).</p>
                    {/* DEV_NOTES: Consider a "Retry" button or link to a help page. */}
                </div>
            </div>
        );
    }

    // If user is loaded, render the main application layout and routes
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/learning" element={<LearningView />} />
                {/* <Route path="/learning/:lessonId" element={<LessonDetailView />} /> */}
                <Route path="/progress" element={<ProgressView />} />
                <Route path="/explore" element={<ExploreView />} />
                <Route path="/resources" element={<ResourcesView />} />
                <Route path="/curriculum-tree" element={<CurriculumTreeView />} />
                <Route path="/curriculum-list" element={<CurriculumListPage />} />
                {/* <Route path="*" element={<NotFoundView />} /> */}
            </Route>
            {/* DEV_NOTES: Routes outside MainLayout could be for things like Login, Register, full-page error displays, etc. */}
            {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
    );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

export default App;
