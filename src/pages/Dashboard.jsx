import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ReviewCard from '../components/ReviewCard';
import { 
  FiCode, 
  FiTrendingUp, 
  FiBriefcase, 
  FiActivity,
  FiArrowRight 
} from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    totalReviews: 0,
    avgScore: 0,
    portfolioProjects: 0,
    totalIssues: 0
  });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [reviewsRes, statsRes, portfolioRes] = await Promise.all([
        api.get('/reviews?per_page=5'),
        api.get('/reviews/stats'),
        api.get('/portfolio')
      ]);
      
      setReviews(reviewsRes.data.reviews || []);
      setStats({
        totalReviews: statsRes.data.total_reviews || 0,
        avgScore: statsRes.data.avg_quality_score || 0,
        portfolioProjects: portfolioRes.data.projects?.length || 0,
        totalIssues: statsRes.data.total_issues || 0
      });

      // Prepare chart data
      if (reviewsRes.data.reviews && reviewsRes.data.reviews.length > 0) {
        const labels = reviewsRes.data.reviews.map((r, i) => `Review ${i + 1}`);
        const scores = reviewsRes.data.reviews.map(r => r.quality_score);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Code Quality Score',
              data: scores,
              borderColor: 'rgb(99, 102, 241)',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              fill: true,
              tension: 0.4
            }
          ]
        });
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  if (loading) {
    return (
      <div className="dashboard loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name}!</h1>
          <p>Your code quality journey with CodeSage AI</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => navigate('/code-review')}
        >
          <FiCode />
          New Review
        </button>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FiCode />
          </div>
          <div className="stat-info">
            <h3>{stats.totalReviews}</h3>
            <p>Total Reviews</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <FiTrendingUp />
          </div>
          <div className="stat-info">
            <h3>{stats.avgScore}%</h3>
            <p>Avg Code Quality</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <FiBriefcase />
          </div>
          <div className="stat-info">
            <h3>{stats.portfolioProjects}</h3>
            <p>Portfolio Projects</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <FiActivity />
          </div>
          <div className="stat-info">
            <h3>{stats.totalIssues}</h3>
            <p>Issues Found</p>
          </div>
        </div>
      </div>

      {chartData && (
        <div className="chart-section">
          <h2>Quality Score Trend</h2>
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      <section className="recent-reviews">
        <div className="section-header">
          <h2>Recent Code Reviews</h2>
          <button 
            className="btn-link"
            onClick={() => navigate('/code-review')}
          >
            View All <FiArrowRight />
          </button>
        </div>

        {reviews.length === 0 ? (
          <div className="empty-state">
            <FiCode size={48} />
            <h3>No reviews yet</h3>
            <p>Start your code quality journey by submitting your first review</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/code-review')}
            >
              Submit Code for Review
            </button>
          </div>
        ) : (
          <div className="reviews-list">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;