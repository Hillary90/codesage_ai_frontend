import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiUser, FiArrowRight, FiCode, FiCheckCircle, FiGithub } from 'react-icons/fi';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    github_username: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.name, formData.github_username);
      toast.success('Account created successfully! 🎉');
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.response?.data?.error || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    'Unlimited code reviews',
    'AI-powered insights',
    'Portfolio showcase',
    'Progress analytics'
  ];

  return (
    <div className="auth-page-modern">
      {/* Left Side - Visual/Brand Section */}
      <div className="auth-visual">
        <div className="visual-content">
          <div className="brand-header">
            <FiCode className="brand-icon" />
            <h1>CodeSage AI</h1>
          </div>
          
          <h2 className="visual-title">
            Start Your Journey to Better Code
          </h2>
          
          <p className="visual-subtitle">
            Join our community of developers and take your coding skills to the next level with AI-powered reviews.
          </p>

          <div className="features-list">
            {benefits.map((benefit, index) => (
              <div key={index} className="feature-item">
                <FiCheckCircle className="feature-icon" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="floating-card card-1">
            <div className="card-content">
              <div className="quality-badge">A+</div>
              <span>Code Grade</span>
            </div>
          </div>

          <div className="floating-card card-2">
            <div className="card-content">
              <div className="stats">
                <span className="stat-label">Developers</span>
                <span className="stat-value">10K+</span>
              </div>
            </div>
          </div>

          <div className="floating-card card-3">
            <div className="card-content">
              <FiCheckCircle className="success-icon" />
              <span>Trusted by Teams</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="auth-form-section">
        <div className="form-container">
          <div className="form-header">
            <h2>Create Your Account</h2>
            <p>Get started with CodeSage AI today</p>
          </div>

          <form onSubmit={handleSubmit} className="modern-form">
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="github_username">GitHub Username (Optional)</label>
              <div className="input-wrapper">
                <FiGithub className="input-icon" />
                <input
                  type="text"
                  id="github_username"
                  name="github_username"
                  placeholder="your-github-username"
                  value={formData.github_username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="form-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="signup-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;