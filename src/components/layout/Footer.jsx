import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiLinkedin, FiHeart } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>CodeSage AI</h3>
          <p>
            Elevate your code quality with AI-powered reviews and build an
            impressive developer portfolio.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/code-review">Code Review</a>
            </li>
            <li>
              <a href="/portfolio">Portfolio</a>
            </li>
            <li>
              <a href="/analytics">Analytics</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="/docs">Documentation</a>
            </li>
            <li>
              <a href="/api">API Reference</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/support">Support</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a
              href="https://github.com/Hillary90"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FiTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/hillary-tanui-329a39191"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
            <li>
              <Link to="/terms">Terms</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} CodeSage AI.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
