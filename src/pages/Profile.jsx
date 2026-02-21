import React from 'react';
import { useAuth } from '../hooks/useAuth';  // Changed from ../../hooks/useAuth
import { Link } from 'react-router-dom';
import { 
  FiUser, 
  FiMail, 
  FiGithub, 
  FiCalendar, 
  FiEdit,
  FiCode,
  FiBriefcase,
  FiTrendingUp
} from 'react-icons/fi';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: <FiCode />,
      label: 'Total Reviews',
      value: '0',
      color: 'blue'
    },
    {
      icon: <FiBriefcase />,
      label: 'Portfolio Projects',
      value: '0',
      color: 'purple'
    },
    {
      icon: <FiTrendingUp />,
      label: 'Avg Quality Score',
      value: '0%',
      color: 'green'
    }
  ];

  return (
    <div className="profile-page">
      <header className="page-header">
        <h1>My Profile</h1>
        <Link to="/settings" className="btn-primary">
          <FiEdit />
          Edit Profile
        </Link>
      </header>

      <div className="profile-container">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h2>{user?.name}</h2>
              <p className="profile-email">
                <FiMail /> {user?.email}
              </p>
              {user?.github_username && (
                <a 
                  href={`https://github.com/${user.github_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  <FiGithub /> @{user.github_username}
                </a>
              )}
            </div>
          </div>

          {user?.bio && (
            <div className="profile-bio">
              <h3>About</h3>
              <p>{user.bio}</p>
            </div>
          )}

          <div className="profile-meta">
            <div className="meta-item">
              <FiCalendar />
              <span>
                Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                }) : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="profile-stats">
          <h3>Statistics</h3>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className={`stat-icon ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <Link to="/code-review" className="action-card">
              <FiCode />
              <span>Submit Code Review</span>
            </Link>
            <Link to="/portfolio" className="action-card">
              <FiBriefcase />
              <span>Manage Portfolio</span>
            </Link>
            <Link to="/analytics" className="action-card">
              <FiTrendingUp />
              <span>View Analytics</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;