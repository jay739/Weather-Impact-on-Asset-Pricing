// src/frontend/components/Sidebar/index.tsx
import React from 'react';
import { motion } from 'framer-motion';
import './Sidebar.css';
import { Dispatch, SetStateAction } from 'react';

// Define the props interface
interface SidebarProps {
  activePage: string;
  onPageChange: Dispatch<SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'analysis', icon: '📈', label: 'Analysis' },
    { id: 'weather', icon: '🌤', label: 'Weather Impact' },
    { id: 'predictions', icon: '🎯', label: 'Predictions' }
  ];

  return (
    <motion.div 
      className="sidebar"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="sidebar-header">
        <h1>Weather Finance</h1>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => onPageChange(item.id)}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </motion.button>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;