import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiArrowRight, FiCode, FiCheckCircle } from 'react-icons/fi';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back! 🎉');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'AI-powered code reviews',
    'Real-time feedback',
    'Portfolio builder',
    'Progress tracking'
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
            Transform Your Code Quality with AI
          </h2>
          
          <p className="visual-subtitle">
            Join thousands of developers improving their coding skills with intelligent AI reviews and comprehensive analytics.
          </p>

          <div className="features-list">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <FiCheckCircle className="feature-icon" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="floating-card card-1">
            <div className="card-content">
              <div className="quality-badge">98</div>
              <span>Code Quality</span>
            </div>
          </div>

          <div className="floating-card card-2">
            <div className="card-content">
              <div className="stats">
                <span className="stat-label">Reviews</span>
                <span className="stat-value">1,240+</span>
              </div>
            </div>
          </div>

          <div className="floating-card card-3">
            <div className="card-content">
              <FiCheckCircle className="success-icon" />
              <span>All Tests Passed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-form-section">
        <div className="form-container">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue your coding journey</p>
          </div>

          <form onSubmit={handleSubmit} className="modern-form">
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
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="form-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="signup-link">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;