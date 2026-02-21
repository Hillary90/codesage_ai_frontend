import React from 'react';
import { FiGithub, FiExternalLink, FiEdit, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import './PortfolioCard.css';

const PortfolioCard = ({ project, onEdit, onDelete, onRegenerateDescription }) => {
  return (
    <div className="portfolio-card">
      {project.image_url && (
        <div 
          className="portfolio-image"
          style={{ backgroundImage: `url(${project.image_url})` }}
        >
          <div className="portfolio-overlay">
            <div className="portfolio-actions">
              <button 
                className="action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(project);
                }}
                title="Edit"
              >
                <FiEdit />
              </button>
              <button 
                className="action-btn delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(project.id);
                }}
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="portfolio-content">
        <div className="portfolio-header">
          <h3>{project.project_name}</h3>
          <div className="card-actions">
            <button 
              className="action-btn-small"
              onClick={() => onRegenerateDescription(project.id)}
              title="Regenerate AI Description"
            >
              <FiRefreshCw />
            </button>
            <button 
              className="action-btn-small"
              onClick={() => onEdit(project)}
              title="Edit"
            >
              <FiEdit />
            </button>
            <button 
              className="action-btn-small delete"
              onClick={() => onDelete(project.id)}
              title="Delete"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
        <p className="portfolio-description">{project.description}</p>

        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="tech-stack">
            {project.tech_stack.map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        )}

        {project.features && project.features.length > 0 && (
          <div className="features-list">
            <h4>Key Features:</h4>
            <ul>
              {project.features.slice(0, 3).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="portfolio-links">
          {project.github_url && (
            <a 
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link"
              onClick={(e) => e.stopPropagation()}
            >
              <FiGithub />
              GitHub
            </a>
          )}
          {project.live_url && (
            <a 
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link"
              onClick={(e) => e.stopPropagation()}
            >
              <FiExternalLink />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;