import React, { useState, useEffect } from 'react';
import { 
  FiCode, 
  FiCalendar, 
  FiTrendingUp,
  FiAlertCircle
} from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTime = () => {
      if (review.created_at) {
        setTimeAgo(formatDistanceToNow(new Date(review.created_at), { addSuffix: true }));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [review.created_at]);

  const getScoreClass = (score) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    return 'poor';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="review-card">
      {/* Header with Title and Score */}
      <div className="review-header">
        <div className="review-title-section">
          <FiCode className="review-icon" />
          <div className="title-content">
            <h3>{review.title}</h3>
            <div className="review-meta">
              <span className="language-badge">{review.language}</span>
              <span className="review-date">
                <FiCalendar size={12} />
                {timeAgo}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Score Badge - Now inside card */}
      <div className="score-container">
        <div className={`quality-badge ${getScoreClass(review.quality_score)}`}>
          <FiTrendingUp />
          <span className="score-value">{review.quality_score}/100</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="review-stats">
        <div className="stat-item">
          <span className="stat-label">Complexity</span>
          <span className="stat-value complexity">
            {review.complexity_score > 0 ? review.complexity_score : 'Low'}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Issues</span>
          <span className="stat-value issues">
            <FiAlertCircle size={14} />
            {review.issues_found}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Quality</span>
          <span className={`stat-value quality ${getScoreClass(review.quality_score)}`}>
            {getScoreLabel(review.quality_score)}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="review-footer">
        <span className="view-details">
          Code Review Completed
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;