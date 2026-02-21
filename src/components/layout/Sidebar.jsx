import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiCode,
  FiBriefcase,
  FiBarChart2,
  FiSettings,
  FiGithub,
  FiZap
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    {
      path: '/dashboard',
      icon: <FiHome />,
      label: 'Dashboard',
      badge: null
    },
    {
      path: '/code-review',
      icon: <FiCode />,
      label: 'Code Review',
      badge: 'AI'
    },
    {
      path: '/portfolio',
      icon: <FiBriefcase />,
      label: 'Portfolio',
      badge: null
    },
    {
      path: '/analytics',
      icon: <FiBarChart2 />,
      label: 'Analytics',
      badge: null
    },
    {
      path: '/settings',
      icon: <FiSettings />,
      label: 'Settings',
      badge: null
    }
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar modern ${isOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-content">
      <div className="sidebar-header">
        <FiZap className="sidebar-logo" />
        <h2>CodeSage</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link modern ${isActive ? 'active' : ''}`
            }
            onClick={onClose}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
            {item.badge && <span className="sidebar-badge">{item.badge}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <a
          href="https://github.com/Hillary90/codesage_ai_frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link modern"
        >
          <FiGithub />
          <span>Star on GitHub</span>
        </a>
      </div>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;