import React, { useState, useEffect } from 'react';
import api from '../services/api';
import PortfolioCard from '../components/PortfolioCard';
import toast from 'react-hot-toast';
import { 
  FiPlus, 
  FiGithub
} from 'react-icons/fi';
import './Portfolio.css';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tech_stack: '',
    github_url: '',
    live_url: '',
    features: '',
    image_url: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/portfolio');
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load portfolio projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      tech_stack: formData.tech_stack.split(',').map(t => t.trim()).filter(Boolean),
      features: formData.features.split(',').map(f => f.trim()).filter(Boolean)
    };

    try {
      if (editingProject) {
        await api.put(`/portfolio/${editingProject.id}`, projectData);
        toast.success('Project updated successfully');
      } else {
        await api.post('/portfolio', projectData);
        toast.success('Project added to portfolio');
      }

      setShowModal(false);
      setEditingProject(null);
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error(error.response?.data?.error || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      tech_stack: project.tech_stack.join(', '),
      github_url: project.github_url || '',
      live_url: project.live_url || '',
      features: project.features.join(', '),
      image_url: project.image_url || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (projectId) => {
    if (!globalThis.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await api.delete(`/portfolio/${projectId}`);
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleImportGithub = async () => {
    const username = prompt('Enter your GitHub username:');
    if (!username) return;

    try {
      const response = await api.post('/portfolio/import-github', {
        github_username: username
      });
      toast.success(response.data.message);
      fetchProjects();
    } catch (error) {
      console.error('Error importing from GitHub:', error);
      toast.error('Failed to import from GitHub');
    }
  };

  const handleRegenerateDescription = async (projectId) => {
    try {
      toast.loading('Generating AI description...');
      const response = await api.post(`/portfolio/${projectId}/regenerate-description`);
      toast.dismiss();
      toast.success('Description regenerated!');
      fetchProjects();
    } catch (error) {
      toast.dismiss();
      console.error('Error regenerating description:', error);
      toast.error('Failed to regenerate description');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      tech_stack: '',
      github_url: '',
      live_url: '',
      features: '',
      image_url: ''
    });
  };

  if (loading) {
    return (
      <div className="portfolio-page loading">
        <div className="spinner"></div>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <header className="page-header">
        <div>
          <h1>My Portfolio</h1>
          <p>Showcase your best projects and achievements</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn-secondary"
            onClick={handleImportGithub}
          >
            <FiGithub />
            Import from GitHub
          </button>
          <button 
            className="btn-primary"
            onClick={() => {
              setEditingProject(null);
              resetForm();
              setShowModal(true);
            }}
          >
            <FiPlus />
            Add Project
          </button>
        </div>
      </header>

      {projects.length === 0 ? (
        <div className="empty-state">
          <FiGithub size={48} />
          <h3>No portfolio projects yet</h3>
          <p>Start building your portfolio by adding your best projects</p>
          <button 
            className="btn-primary"
            onClick={() => setShowModal(true)}
          >
            <FiPlus />
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="portfolio-grid">
          {projects.map(project => (
            <PortfolioCard 
              key={project.id} 
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRegenerateDescription={handleRegenerateDescription}
            />
          ))}
        </div>
      )}

      {/* Modal for Add/Edit Project */}
      {showModal && (
        <div 
          className="modal-overlay" 
          onClick={() => setShowModal(false)}
          onKeyDown={(e) => e.key === 'Escape' && setShowModal(false)}
          role="button"
          tabIndex={0}
        >
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="dialog"
            tabIndex={-1}
          >
            <div className="modal-header">
              <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="project-form">
              <div className="form-group">
                <label htmlFor="name">Project Name *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="E-Commerce Platform"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="A full-stack e-commerce solution..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="tech_stack">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  id="tech_stack"
                  value={formData.tech_stack}
                  onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                  placeholder="React, Node.js, MongoDB, AWS"
                />
              </div>

              <div className="form-group">
                <label htmlFor="features">Key Features (comma-separated)</label>
                <input
                  type="text"
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Payment integration, Real-time chat, Analytics"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="github_url">GitHub URL</label>
                  <input
                    type="url"
                    id="github_url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="live_url">Live Demo URL</label>
                  <input
                    type="url"
                    id="live_url"
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    placeholder="https://project-demo.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="image_url">Project Image URL</label>
                <input
                  type="url"
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingProject ? 'Update Project' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;