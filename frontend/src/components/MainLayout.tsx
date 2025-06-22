import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const MainLayout: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                <Outlet /> {/* Routed components will render here */}
            </main>
            {/* DEV_NOTES: A Footer component could be added here if needed in the future. */}
            {/* <Footer /> */}
        </div>
    );
};
