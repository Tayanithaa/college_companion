import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingAssignments: 0,
    upcomingExams: 0,
    habitStreak: 0
  });
  
  const [userName, setUserName] = useState('Student');
  const [quote, setQuote] = useState('');

  const motivationalQuotes = [
    "Success is the sum of small efforts repeated day in and day out.",
    "Don't watch the clock; do what it does. Keep going.",
    "The secret to getting ahead is getting started.",
    "Education is the passport to the future.",
    "Study while others are sleeping; work while others are loafing.",
    "Your limitation—it's only your imagination.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn't just find you. You have to go out and get it.",
    "The harder you work for something, the greater you'll feel when you achieve it."
  ];

  useEffect(() => {
    // Load user name
    const savedName = localStorage.getItem('name');
    if (savedName) setUserName(savedName);

    // Load tasks stats
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completedCount = tasks.filter(t => t.completed).length;
    
    // Load assignments
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    const pendingAssignments = assignments.filter(a => a.status === 'Pending').length;

    // Load habits
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    const habitStreak = habits.reduce((total, habit) => {
      return total + habit.tracking.filter(Boolean).length;
    }, 0);

    setStats({
      totalTasks: tasks.length,
      completedTasks: completedCount,
      pendingAssignments: pendingAssignments,
      upcomingExams: 0, // Can be enhanced later
      habitStreak: habitStreak
    });

    // Random quote
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const taskCompletionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>{getGreeting()}, {userName}! 🏫</h1>
        <p className="subtitle">Ready to conquer your day?</p>
      </div>

      <div className="quote-card">
        <p className="quote-text">"{quote}"</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card tasks-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{stats.totalTasks}</h3>
            <p>Total Tasks</p>
            <span className="stat-detail">{stats.completedTasks} completed</span>
          </div>
        </div>

        <div className="stat-card assignments-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{stats.pendingAssignments}</h3>
            <p>Pending Assignments</p>
            <span className="stat-detail">Stay on track!</span>
          </div>
        </div>

        <div className="stat-card habits-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3>{stats.habitStreak}</h3>
            <p>Habit Checkmarks</p>
            <span className="stat-detail">This week</span>
          </div>
        </div>

        <div className="stat-card progress-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{taskCompletionRate}%</h3>
            <p>Task Completion</p>
            <span className="stat-detail">Keep it up!</span>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/tasks" className="action-btn">
            <span className="btn-icon">✅</span>
            <span>Add Task</span>
          </Link>
          <Link to="/assignments" className="action-btn">
            <span className="btn-icon">📖</span>
            <span>New Assignment</span>
          </Link>
          <Link to="/pomodoro" className="action-btn">
            <span className="btn-icon">⏱️</span>
            <span>Start Focus</span>
          </Link>
          <Link to="/timetable" className="action-btn">
            <span className="btn-icon">📅</span>
            <span>View Schedule</span>
          </Link>
          <Link to="/habit-tracker" className="action-btn">
            <span className="btn-icon">✨</span>
            <span>Track Habits</span>
          </Link>
          <Link to="/exam-countdown" className="action-btn">
            <span className="btn-icon">⏰</span>
            <span>Exam Timer</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
  