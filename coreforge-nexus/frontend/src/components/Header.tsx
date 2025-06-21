import React from 'react';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  // TODO: Implement Header component
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">CoreForge Nexus</div>
        <div>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${activeView === 'dashboard' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('progressCenter')}
            className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${activeView === 'progressCenter' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
          >
            Progress Center
          </button>
          <button
            onClick={() => setActiveView('explorationZone')}
            className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${activeView === 'explorationZone' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
          >
            Exploration Zone
          </button>
        </div>
      </nav>
    </header>
  );
};
