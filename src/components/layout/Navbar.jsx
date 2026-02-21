import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  FiCode, 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiUser, 
  FiSettings,
  FiBell,
  FiSearch
} from 'react-icons/fi';
import api from '../../services/api';
import './Navbar.css';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState({ reviews: [], portfolios: [] });
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const [notifRes, countRes] = await Promise.all([
        api.get('/notifications'),
        api.get('/notifications/unread-count')
      ]);
      setNotifications(notifRes.data);
      setUnreadCount(countRes.data.count);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await api.put(`/notifications/${notificationId}/read`);
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
    }
    setShowNotifications(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setShowSearchResults(false);
      return;
    }

    try {
      const [reviewsRes, portfoliosRes] = await Promise.all([
        api.get('/reviews'),
        api.get('/portfolio')
      ]);
      
      const reviews = Array.isArray(reviewsRes.data) ? reviewsRes.data : reviewsRes.data.reviews || [];
      const portfolios = Array.isArray(portfoliosRes.data) ? portfoliosRes.data : portfoliosRes.data.projects || [];
      
      const filteredReviews = reviews.filter(r => 
        r.title?.toLowerCase().includes(query.toLowerCase()) ||
        r.language?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3);
      
      const filteredPortfolios = portfolios.filter(p => 
        p.project_name?.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3);
      
      setSearchResults({ reviews: filteredReviews, portfolios: filteredPortfolios });
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const closeMenus = () => {
    setShowUserMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserMenu && !e.target.closest('.navbar-user')) {
        setShowUserMenu(false);
      }
      if (showSearchResults && !e.target.closest('.search-bar')) {
        setShowSearchResults(false);
      }
      if (showNotifications && !e.target.closest('.notification-container')) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu, showSearchResults, showNotifications]);

  return (
    <nav className="navbar modern">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="mobile-menu-toggle" onClick={onToggleSidebar}>
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>

          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search reviews and portfolios..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {showSearchResults && (
              <div className="search-results">
                {searchResults.reviews.length > 0 && (
                  <div className="search-section">
                    <h4>Reviews</h4>
                    {searchResults.reviews.map(review => (
                      <div key={review.id} className="search-item" onClick={() => { navigate('/code-review'); setShowSearchResults(false); setSearchQuery(''); }}>
                        <span>{review.title}</span>
                        <span className="search-meta">{review.language}</span>
                      </div>
                    ))}
                  </div>
                )}
                {searchResults.portfolios.length > 0 && (
                  <div className="search-section">
                    <h4>Portfolio</h4>
                    {searchResults.portfolios.map(portfolio => (
                      <div key={portfolio.id} className="search-item" onClick={() => { navigate('/portfolio'); setShowSearchResults(false); setSearchQuery(''); }}>
                        <span>{portfolio.project_name}</span>
                      </div>
                    ))}
                  </div>
                )}
                {searchResults.reviews.length === 0 && searchResults.portfolios.length === 0 && (
                  <div className="search-empty">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="navbar-right">
          <div className="notification-container">
            <button className="icon-button" onClick={() => setShowNotifications(!showNotifications)}>
              <FiBell />
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h4>Notifications</h4>
                  {unreadCount > 0 && (
                    <button className="mark-all-read" onClick={async () => {
                      await api.put('/notifications/mark-all-read');
                      fetchNotifications();
                    }}>Mark all read</button>
                  )}
                </div>
                <div className="notification-list">
                  {notifications.length > 0 ? (
                    notifications.slice(0, 5).map(notif => (
                      <div 
                        key={notif.id} 
                        className={`notification-item ${!notif.read ? 'unread' : ''}`}
                        onClick={() => handleNotificationClick(notif)}
                      >
                        <div className="notification-content">
                          <p>{notif.message}</p>
                          <span className="notification-time">
                            {new Date(notif.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="notification-empty">No notifications</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {user && (
            <div className="navbar-user">
              <div 
                className="user-info"
                onClick={toggleUserMenu}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleUserMenu()}
              >
                <div className="user-avatar modern">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">Developer</span>
                </div>
              </div>

              {showUserMenu && (
                <div className="user-dropdown modern">
                  <Link to="/profile" className="dropdown-item" onClick={closeMenus}>
                    <FiUser /> Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item" onClick={closeMenus}>
                    <FiSettings /> Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
