import React from 'react';
import { Target, BarChart2, BookOpen, BrainCircuit, Menu, X } from 'lucide-react'; // Added Menu and X for mobile

type NavViewId = 'dashboard' | 'progressCenter' | 'explorationZone';

interface NavItem {
    id: NavViewId;
    label: string;
    icon: React.ElementType; // Lucide icons are components
}

interface HeaderProps {
    activeView: NavViewId | string; // Allow string for flexibility if other views are added dynamically
    setActiveView: (viewId: NavViewId) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const navItems: NavItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: Target },
        { id: 'progressCenter', label: 'Progress', icon: BarChart2 },
        { id: 'explorationZone', label: 'Explore', icon: BrainCircuit },
    ];

    const handleNavClick = (viewId: NavViewId) => {
        setActiveView(viewId);
        setIsMobileMenuOpen(false); // Close mobile menu on navigation
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50"> {/* Increased z-index */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-2">
                        <BookOpen className="h-8 w-8 text-indigo-600" />
                        <h1 className="text-xl font-bold text-gray-800">MathQuest</h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-1"> {/* Reduced space for tighter packing if needed */}
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
                                    activeView === item.id
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                }`}
                                aria-current={activeView === item.id ? 'page' : undefined}
                            >
                                <item.icon className="h-5 w-5 mr-2 shrink-0" /> {/* Added shrink-0 */}
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 inset-x-0 z-40 bg-white shadow-lg" id="mobile-menu"> {/* Added absolute positioning and z-index */}
                    <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ease-in-out ${
                                    activeView === item.id
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                }`}
                                aria-current={activeView === item.id ? 'page' : undefined}
                            >
                                <item.icon className="h-6 w-6 mr-3 shrink-0" />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};
