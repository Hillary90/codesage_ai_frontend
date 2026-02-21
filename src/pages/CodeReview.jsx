import React, { useState } from 'react';
import api from '../services/api';
import CodeEditor from '../components/CodeEditor';
import toast from 'react-hot-toast';
import { 
  FiSend, 
  FiCheckCircle, 
  FiAlertCircle,
  FiInfo,
  FiTrendingUp 
} from 'react-icons/fi';
import './CodeReview.css';

const CodeReview = () => {
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    language: 'python'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.code.trim()) {
      toast.error('Please enter some code to review');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await api.post('/reviews', formData);
      
      setResult({
        review: response.data.review,
        analysis: response.data.analysis,
        ai_feedback: response.data.ai_feedback
      });

      toast.success('Code review completed!');
    } catch (error) {
      console.error('Error submitting code:', error);
      toast.error(error.response?.data?.error || 'Failed to review code');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (value) => {
    setFormData({ ...formData, code: value });
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <FiAlertCircle className="severity-icon high" />;
      case 'medium':
        return <FiInfo className="severity-icon medium" />;
      case 'low':
        return <FiCheckCircle className="severity-icon low" />;
      default:
        return <FiInfo className="severity-icon" />;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    return 'poor';
  };

  return (
    <div className="code-review-page">
      <header className="page-header">
        <h1>AI Code Review</h1>
        <p>Submit your code for intelligent analysis and improvement suggestions</p>
      </header>

      <div className="review-container">
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label htmlFor="title">Review Title (Optional)</label>
            <input
              type="text"
              id="title"
              placeholder="e.g., User Authentication Module"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="language">Programming Language</label>
            <select
              id="language"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="code">Code to Review</label>
            <CodeEditor
              value={formData.code}
              onChange={handleCodeChange}
              language={formData.language}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary btn-large"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-small" />
                Analyzing...
              </>
            ) : (
              <>
                <FiSend />
                Submit for Review
              </>
            )}
          </button>
        </form>

        {result && (
          <div className="review-results">
            <div className="results-header">
              <h2>Review Results</h2>
              <div className={`quality-score ${getScoreColor(result.analysis.quality_score)}`}>
                <FiTrendingUp />
                <span>{result.analysis.quality_score}/100</span>
              </div>
            </div>

            {/* AI Feedback Summary */}
            {result.ai_feedback.summary && (
              <div className="feedback-section">
                <h3>AI Summary</h3>
                <p className="summary-text">{result.ai_feedback.summary}</p>
              </div>
            )}

            {/* Code Metrics */}
            <div className="metrics-grid">
              <div className="metric-card">
                <h4>Lines of Code</h4>
                <p className="metric-value">{result.analysis.code_lines}</p>
              </div>
              <div className="metric-card">
                <h4>Complexity</h4>
                <p className="metric-value">{result.analysis.complexity}</p>
              </div>
              <div className="metric-card">
                <h4>Issues Found</h4>
                <p className="metric-value">{result.analysis.issues_count}</p>
              </div>
              <div className="metric-card">
                <h4>Comments</h4>
                <p className="metric-value">{result.analysis.comment_lines}</p>
              </div>
            </div>

            {/* Issues */}
            {result.ai_feedback.issues && result.ai_feedback.issues.length > 0 && (
              <div className="feedback-section">
                <h3>Issues Found</h3>
                <div className="issues-list">
                  {result.ai_feedback.issues.map((issue) => (
                    <div key={`${issue.line}-${issue.issue}`} className={`issue-item ${issue.severity}`}>
                      {getSeverityIcon(issue.severity)}
                      <div className="issue-content">
                        <div className="issue-header">
                          <span className="issue-line">Line {issue.line}</span>
                          <span className={`severity-badge ${issue.severity}`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="issue-description">{issue.issue}</p>
                        {issue.suggestion && (
                          <p className="issue-suggestion">
                            <strong>Suggestion:</strong> {issue.suggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Best Practices */}
            {result.ai_feedback.best_practices && result.ai_feedback.best_practices.length > 0 && (
              <div className="feedback-section">
                <h3>Best Practices</h3>
                <ul className="suggestions-list">
                  {result.ai_feedback.best_practices.map((practice) => (
                    <li key={practice}>{practice}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Refactoring Suggestions */}
            {result.ai_feedback.refactoring && result.ai_feedback.refactoring.length > 0 && (
              <div className="feedback-section">
                <h3>Refactoring Suggestions</h3>
                <ul className="suggestions-list">
                  {result.ai_feedback.refactoring.map((suggestion) => (
                    <li key={suggestion}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Security & Performance */}
            <div className="two-column-section">
              {result.ai_feedback.security && result.ai_feedback.security.length > 0 && (
                <div className="feedback-section">
                  <h3>Security Concerns</h3>
                  <ul className="suggestions-list">
                    {result.ai_feedback.security.map((concern) => (
                      <li key={concern}>{concern}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.ai_feedback.performance && result.ai_feedback.performance.length > 0 && (
                <div className="feedback-section">
                  <h3>Performance Tips</h3>
                  <ul className="suggestions-list">
                    {result.ai_feedback.performance.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button 
              className="btn-secondary"
              onClick={() => {
                setResult(null);
                setFormData({ ...formData, code: '', title: '' });
              }}
            >
              Submit Another Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeReview;