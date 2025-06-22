import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, LayoutDashboard, GraduationCap, BarChart3, Compass, Library, Menu, X, ListTree, List } from 'lucide-react';
// DEV_NOTES: Renamed some icons for clarity (BarChart2 -> BarChart3, Target -> LayoutDashboard, BrainCircuit -> Compass, etc.)
// Also added GraduationCap for Learning, Library for Resources.
// Added ListTree and List for new curriculum views.

interface NavItemConfig {
    to: string;
    label: string;
    icon: React.ElementType;
}

// No props needed for Header anymore as active state is handled by NavLink
export const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const navItems: NavItemConfig[] = [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/learning', label: 'Learning', icon: GraduationCap },
        { to: '/curriculum-tree', label: 'Tree View', icon: ListTree },
        { to: '/curriculum-list', label: 'List View', icon: List },
        { to: '/progress', label: 'Progress', icon: BarChart3 },
        { to: '/explore', label: 'Explore', icon: Compass },
        { to: '/resources', label: 'Resources', icon: Library },
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
                    {/* Logo and Title - Link to Dashboard */}
                    <NavLink to="/dashboard" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <BookOpen className="h-8 w-8 text-indigo-600" />
                        {/* DEV_NOTES: Project title "MathQuest" is hardcoded. Consider making this configurable or dynamic if platform name changes. */}
                        <h1 className="text-xl font-bold text-gray-800">MathQuest</h1>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-1">
                        {navItems.map(item => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={getNavLinkClass}
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
                                onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
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
