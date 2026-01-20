import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

function Navbar() {
  const { theme, toggleTheme } = useTheme();

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

      <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </nav>
  );
}

export default Navbar;
