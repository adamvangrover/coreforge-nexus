import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="mb-2">Welcome to your learning dashboard!</p>
            <p className="mb-4">From here, you can navigate to various sections of the platform.</p>
            <div className="space-y-2">
                <div><Link to="/learning" className="text-blue-500 hover:underline">Go to Learning View</Link></div>
                <div><Link to="/progress" className="text-blue-500 hover:underline">Go to Progress View</Link></div>
                <div><Link to="/explore" className="text-blue-500 hover:underline">Go to Explore View</Link></div>
                <div><Link to="/resources" className="text-blue-500 hover:underline">Go to Resources View</Link></div>
            </div>
            {/* DEV_NOTES: This is a simplified placeholder.
                The original Dashboard.tsx had more complex logic for displaying user progress,
                recommendations, and achievements. This logic will need to be reintegrated or
                moved to other components/views as the application develops with react-router.
                User data and topic data will come from AppContext or direct API calls.
            */}
        </div>
    );
};
