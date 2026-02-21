import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { 
  FiTrendingUp, 
  FiCode, 
  FiAlertCircle,
  FiCheckCircle 
} from 'react-icons/fi';
import './Analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.get('/reviews/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="analytics-page loading">
        <div className="spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (!stats || stats.total_reviews === 0) {
    return (
      <div className="analytics-page empty">
        <FiTrendingUp size={48} />
        <h2>No Analytics Available</h2>
        <p>Submit code reviews to see your analytics and insights</p>
      </div>
    );
  }

  // Language distribution chart
  const languageData = {
    labels: Object.keys(stats.languages || {}),
    datasets: [{
      label: 'Reviews by Language',
      data: Object.values(stats.languages || {}),
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(244, 63, 94, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(14, 165, 233, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="analytics-page">
      <header className="page-header">
        <h1>Analytics & Insights</h1>
        <p>Track your code quality improvements over time</p>
      </header>

      {/* Summary Cards */}
      <div className="analytics-summary">
        <div className="summary-card">
          <div className="summary-icon blue">
            <FiCode />
          </div>
          <div className="summary-content">
            <h3>{stats.total_reviews}</h3>
            <p>Total Reviews</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon green">
            <FiCheckCircle />
          </div>
          <div className="summary-content">
            <h3>{stats.avg_quality_score}%</h3>
            <p>Average Quality</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon orange">
            <FiAlertCircle />
          </div>
          <div className="summary-content">
            <h3>{stats.total_issues}</h3>
            <p>Total Issues</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon purple">
            <FiTrendingUp />
          </div>
          <div className="summary-content">
            <h3>{stats.most_used_language || 'N/A'}</h3>
            <p>Top Language</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h2>Language Distribution</h2>
          <div className="chart-wrapper">
            <Doughnut data={languageData} options={doughnutOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h2>Quality Metrics</h2>
          <div className="metrics-list">
            <div className="metric-item">
              <span className="metric-label">Average Quality Score</span>
              <div className="metric-bar">
                <div 
                  className="metric-fill"
                  style={{ width: `${stats.avg_quality_score}%` }}
                ></div>
              </div>
              <span className="metric-value">{stats.avg_quality_score}%</span>
            </div>

            <div className="metric-item">
              <span className="metric-label">Issues per Review</span>
              <div className="metric-bar">
                <div 
                  className="metric-fill orange"
                  style={{ 
                    width: `${Math.min((stats.total_issues / stats.total_reviews) * 10, 100)}%` 
                  }}
                ></div>
              </div>
              <span className="metric-value">
                {(stats.total_issues / stats.total_reviews).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="insights-section">
        <h2>Key Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3> Code Quality Trend</h3>
            <p>
              Your average code quality score is <strong>{stats.avg_quality_score}%</strong>.
              {(() => {
                if (stats.avg_quality_score >= 80) return " Excellent work! Keep it up.";
                if (stats.avg_quality_score >= 60) return " Good progress. Focus on addressing common issues.";
                return " There's room for improvement. Review the AI suggestions carefully.";
              })()}
            </p>
          </div>

          <div className="insight-card">
            <h3> Top Language</h3>
            <p>
              You've submitted the most reviews in <strong>{stats.most_used_language}</strong>.
              Consider diversifying your portfolio with other languages to expand your skills.
            </p>
          </div>

          <div className="insight-card">
            <h3> Issue Analysis</h3>
            <p>
              You've identified <strong>{stats.total_issues}</strong> issues across all reviews.
              On average, that's <strong>{(stats.total_issues / stats.total_reviews).toFixed(1)}</strong> issues per review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;