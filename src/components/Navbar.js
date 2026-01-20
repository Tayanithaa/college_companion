import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-logo">🎓</span>
        <span className="brand-name">College Companion</span>
      </div>
      
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/assignments">Assignments</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/timetable">Timetable</Link>
        <Link to="/pomodoro">Pomodoro</Link>
        <Link to="/exam-countdown">Exam Countdown</Link>
        <Link to="/habit-tracker">Habit Tracker</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <div className="navbar-actions">
        {currentUser && (
          <span className="user-name">👤 {currentUser.name}</span>
        )}
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
