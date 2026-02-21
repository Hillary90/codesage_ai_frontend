import React from "react";
import { Link } from "react-router-dom";
import {
  FiCode,
  FiBriefcase,
  FiTrendingUp,
  FiZap,
  FiCheckCircle,
  FiGithub,
  FiStar,
  FiUsers,
  FiArrowRight,
  FiShield,
  FiClock,
  FiAward,
} from "react-icons/fi";
import "./Landing.css";

const Landing = () => {
  const features = [
    {
      icon: <FiCode />,
      title: "AI Code Review",
      description:
        "Get instant, intelligent feedback on code quality, security, and performance using GPT-4",
      color: "blue",
    },
    {
      icon: <FiBriefcase />,
      title: "Portfolio Builder",
      description:
        "Showcase your projects with AI-generated descriptions and GitHub integration",
      color: "purple",
    },
    {
      icon: <FiTrendingUp />,
      title: "Analytics Dashboard",
      description:
        "Track your coding progress and quality improvements over time",
      color: "green",
    },
    {
      icon: <FiZap />,
      title: "Fast & Easy",
      description:
        "Submit code in seconds and receive comprehensive feedback instantly",
      color: "orange",
    },
  ];

  const benefits = [
    "Quality scores for every code submission",
    "Security vulnerability detection",
    "Best practice recommendations",
    "Refactoring suggestions with examples",
    "Multi-language support (Python, JavaScript, Java, C++, Go, Rust, PHP)",
    "GitHub repository import",
    "Real-time code analysis",
    "Detailed performance metrics",
  ];

  const stats = [
    { id: "users", icon: <FiUsers />, value: "10K+", label: "Developers" },
    { id: "reviews", icon: <FiCode />, value: "50K+", label: "Code Reviews" },
    { id: "rating", icon: <FiStar />, value: "4.9/5", label: "Rating" },
    {
      id: "satisfaction",
      icon: <FiAward />,
      value: "99%",
      label: "Satisfaction",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior Developer",
      avatar: "S",
      text: "CodeSage AI has transformed how I write code. The instant feedback helps me catch issues early and learn best practices.",
    },
    {
      name: "Michael Chen",
      role: "Full Stack Engineer",
      avatar: "M",
      text: "The portfolio builder is fantastic! It helped me showcase my projects professionally and land my dream job.",
    },
    {
      name: "Emily Rodriguez",
      role: "Software Architect",
      avatar: "E",
      text: "Best code review tool I've used. The AI suggestions are incredibly accurate and have improved my team's code quality.",
    },
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <FiCode className="nav-logo" />
            <span>CodeSage AI</span>
          </div>
          <div className="nav-links">
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="btn-primary">
              Sign Up Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <FiZap /> Powered by GPT-4
          </div>
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">CodeSage AI</span>
          </h1>
          <p className="hero-subtitle">
            AI-Powered Code Review and Developer Portfolio Builder
          </p>
          <p className="hero-description">
            Transform your code quality with intelligent AI reviews, build an
            impressive developer portfolio, and track your progress—all in one
            powerful platform.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary btn-large">
              Get Started Free
              <FiArrowRight />
            </Link>
            <Link to="/login" className="btn-secondary btn-large">
              Sign In
            </Link>
          </div>
          <div className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.id} className="hero-stat">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-mockup">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="mockup-title">code_review.py</span>
            </div>
            <div className="mockup-content">
              <div className="code-line">
                <span className="line-number">1</span>
                <span className="code-keyword">def</span>
                <span className="code-function"> analyze_code</span>
                <span className="code-text">(code):</span>
              </div>
              <div className="code-line">
                <span className="line-number">2</span>
                <span className="code-indent"> </span>
                <span className="code-comment"># AI-powered analysis</span>
              </div>
              <div className="code-line">
                <span className="line-number">3</span>
                <span className="code-indent"> </span>
                <span className="code-keyword">return</span>
                <span className="code-text"> feedback</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Why Choose CodeSage AI?</h2>
          <p>Everything you need to become a better developer</p>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`feature-card ${feature.color}`}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="benefits-content">
          <div className="benefits-text">
            <h2>What You Get</h2>
            <p className="section-subtitle">
              Comprehensive tools and insights to elevate your coding skills
            </p>
            <ul className="benefits-list">
              {benefits.map((benefit) => (
                <li key={benefit}>
                  <FiCheckCircle className="check-icon" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Link to="/signup" className="btn-primary btn-large">
              Start Free Trial
              <FiArrowRight />
            </Link>
          </div>
          <div className="benefits-visual">
            <div className="benefit-card">
              <div className="benefit-icon green">
                <FiShield />
              </div>
              <h4>Secure & Private</h4>
              <p>
                Your code is analyzed securely and never stored without
                permission
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon blue">
                <FiClock />
              </div>
              <h4>Lightning Fast</h4>
              <p>Get instant feedback in seconds, not hours</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon purple">
                <FiAward />
              </div>
              <h4>Industry Standard</h4>
              <p>Learn best practices used by top tech companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="section-header">
          <h2>Loved by Developers Worldwide</h2>
          <p>See what our users have to say</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="testimonial-card">
              <div className="testimonial-rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <FiStar key={`star-${i}`} className="star-filled" />
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Level Up Your Code?</h2>
          <p>
            Join thousands of developers improving their code quality with AI
          </p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn-primary btn-large">
              Start Free Today
              <FiArrowRight />
            </Link>
            <a
              href="https://github.com/Derrickkoome/codesage-ai"
              className="btn-secondary btn-large"
            >
              <FiGithub />
              View on GitHub
            </a>
          </div>
          <p className="cta-note">No credit card required • Free forever</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <FiCode className="footer-logo" />
            <span>CodeSage AI</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CodeSage AI. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
