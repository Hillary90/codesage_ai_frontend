import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiGithub, FiSave } from 'react-icons/fi';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    github_username: user?.github_username || '',
    bio: user?.bio || ''
  });
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalReviews: 0,
    totalProjects: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [reviewsRes, projectsRes] = await Promise.all([
          api.get('/reviews'),
          api.get('/portfolio')
        ]);
        console.log('Reviews response:', reviewsRes.data);
        console.log('Projects response:', projectsRes.data);
        
        const reviewsData = Array.isArray(reviewsRes.data) ? reviewsRes.data : reviewsRes.data.reviews || [];
        const projectsData = Array.isArray(projectsRes.data) ? projectsRes.data : projectsRes.data.projects || [];
        
        setStats({
          totalReviews: reviewsData.length || 0,
          totalProjects: projectsData.length || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put('/auth/update-profile', formData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <header className="page-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </header>

      <div className="settings-container">
        <div className="settings-card">
          <h2>Profile Information</h2>
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="form-group">
              <label htmlFor="name">
                <FiUser /> Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FiMail /> Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                placeholder="your@email.com"
              />
              <small>Email cannot be changed</small>
            </div>

            <div className="form-group">
              <label htmlFor="github_username">
                <FiGithub /> GitHub Username
              </label>
              <input
                type="text"
                id="github_username"
                name="github_username"
                value={formData.github_username}
                onChange={handleChange}
                placeholder="your-github-username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-small" />
                  {' '}Saving...
                </>
              ) : (
                <>
                  <FiSave />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>

        <div className="settings-card">
          <h2>Account Statistics</h2>
          <div className="stats-list">
            <div className="stat-item">
              <span className="stat-label">Member Since</span>
              <span className="stat-value">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Reviews</span>
              <span className="stat-value">{stats.totalReviews}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Portfolio Projects</span>
              <span className="stat-value">{stats.totalProjects}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;