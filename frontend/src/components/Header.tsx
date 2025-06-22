import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Target, BarChart2, BrainCircuit, Menu, X, BookMarked, TrendingUp, Info } from 'lucide-react';

// DEV_NOTE: NavItem interface updated for react-router-dom NavLink
interface NavItem {
    to: string; // Path for NavLink
    label: string;
    icon: React.ElementType; // Lucide icons are components
}

// DEV_NOTE: HeaderProps removed as activeView/setActiveView are no longer needed.
export const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const navItems: NavItem[] = [
        { to: '/dashboard', label: 'Dashboard', icon: Target },
        { to: '/learning', label: 'My Learning', icon: BookMarked },
        { to: '/progress', label: 'My Progress', icon: TrendingUp }, // Or BarChart2
        { to: '/explore', label: 'Explore', icon: BrainCircuit },
        { to: '/resources', label: 'Resources', icon: Info }, // Or FileText
    ];

    const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
        return `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
            isActive
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
        }`;
    };

    const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
        return `flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ease-in-out ${
            isActive
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
        }`;
    };


    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Title */}
                    <NavLink to="/dashboard" className="flex items-center space-x-2 group">
                        <BookOpen className="h-8 w-8 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                        <h1 className="text-xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">CoreForge Nexus</h1>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-1">
                        {navItems.map(item => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={getNavLinkClass}
                                onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)} // Close mobile menu if open
                            >
                                <item.icon className="h-5 w-5 mr-2 shrink-0" />
                                {item.label}
                            </NavLink>
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
                <div className="md:hidden absolute top-16 inset-x-0 z-40 bg-white shadow-lg" id="mobile-menu">
                    <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map(item => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={getMobileNavLinkClass}
                                onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on navigation
                            >
                                <item.icon className="h-6 w-6 mr-3 shrink-0" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};
