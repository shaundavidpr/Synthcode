import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Code2, Layers, FolderPlus, Settings, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/designer', icon: <Code2 size={20} />, label: 'Language Designer' },
    { path: '/editor', icon: <Layers size={20} />, label: 'Code Editor' },
    { path: '/projects', icon: <FolderPlus size={20} />, label: 'Projects' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <Code2 size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              SynthCode
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <nav className="hidden md:block w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path 
                      ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute left-0 w-1 h-8 bg-indigo-500 rounded-r"
                      layoutId="activeNavIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex flex-col items-center py-3 ${
                location.pathname === item.path 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;