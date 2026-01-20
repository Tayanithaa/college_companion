// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [studyGoals, setStudyGoals] = useState('');
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    totalAssignments: 0,
    totalNotes: 0,
    totalHabits: 0
  });

  useEffect(() => {
    // Load profile info
    const savedName = localStorage.getItem('name');
    const savedGoals = localStorage.getItem('studyGoals');
    const savedQuote = localStorage.getItem('motivationalQuote');
    if (savedName) setName(savedName);
    if (savedGoals) setStudyGoals(savedGoals);
    if (savedQuote) setMotivationalQuote(savedQuote);

    // Calculate stats
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const habits = JSON.parse(localStorage.getItem('habits')) || [];

    setStats({
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.completed).length,
      totalAssignments: assignments.length,
      totalNotes: notes.length,
      totalHabits: habits.length
    });
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem('name', name);
    localStorage.setItem('studyGoals', studyGoals);
    localStorage.setItem('motivationalQuote', motivationalQuote);
    alert('Profile saved successfully! ✅');
  };

  const handleExportData = () => {
    const allData = {
      profile: { name, studyGoals, motivationalQuote },
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      assignments: JSON.parse(localStorage.getItem('assignments')) || [],
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      habits: JSON.parse(localStorage.getItem('habits')) || [],
      timetable: JSON.parse(localStorage.getItem('timetable')) || {},
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `college-companion-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        if (window.confirm('This will replace all your current data. Are you sure?')) {
          // Import profile
          if (importedData.profile) {
            localStorage.setItem('name', importedData.profile.name || '');
            localStorage.setItem('studyGoals', importedData.profile.studyGoals || '');
            localStorage.setItem('motivationalQuote', importedData.profile.motivationalQuote || '');
            setName(importedData.profile.name || '');
            setStudyGoals(importedData.profile.studyGoals || '');
            setMotivationalQuote(importedData.profile.motivationalQuote || '');
          }

          // Import other data
          if (importedData.tasks) localStorage.setItem('tasks', JSON.stringify(importedData.tasks));
          if (importedData.assignments) localStorage.setItem('assignments', JSON.stringify(importedData.assignments));
          if (importedData.notes) localStorage.setItem('notes', JSON.stringify(importedData.notes));
          if (importedData.habits) localStorage.setItem('habits', JSON.stringify(importedData.habits));
          if (importedData.timetable) localStorage.setItem('timetable', JSON.stringify(importedData.timetable));

          alert('Data imported successfully! Please refresh the page. ✅');
          window.location.reload();
        }
      } catch (error) {
        alert('Error importing data. Please check the file format. ❌');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleClearAllData = () => {
    if (window.confirm('⚠️ This will delete ALL your data permanently. Are you absolutely sure?')) {
      if (window.confirm('Last chance! This cannot be undone. Continue?')) {
        localStorage.clear();
        alert('All data cleared. Page will reload.');
        window.location.reload();
      }
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile Setup 👤</h2>
      
      <div className="profile-content">
        <div className="profile-form-section">
          <div className="profile-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label>Study Goals:</label>
              <textarea
                value={studyGoals}
                onChange={(e) => setStudyGoals(e.target.value)}
                placeholder="Enter your study goals"
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Motivational Quote:</label>
              <input
                type="text"
                value={motivationalQuote}
                onChange={(e) => setMotivationalQuote(e.target.value)}
                placeholder="Enter a motivational quote"
              />
            </div>
            <button onClick={handleSaveProfile} className="save-profile-btn">
              💾 Save Profile
            </button>
          </div>
        </div>

        <div className="profile-stats-section">
          <h3>Your Statistics 📊</h3>
          <div className="stats-cards">
            <div className="stat-item">
              <span className="stat-icon">📝</span>
              <div>
                <div className="stat-number">{stats.totalTasks}</div>
                <div className="stat-label">Total Tasks</div>
                <div className="stat-sublabel">{stats.completedTasks} completed</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📚</span>
              <div>
                <div className="stat-number">{stats.totalAssignments}</div>
                <div className="stat-label">Assignments</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📌</span>
              <div>
                <div className="stat-number">{stats.totalNotes}</div>
                <div className="stat-label">Notes</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">✨</span>
              <div>
                <div className="stat-number">{stats.totalHabits}</div>
                <div className="stat-label">Habits Tracked</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="data-management">
        <h3>Data Management 💾</h3>
        <div className="data-actions">
          <button onClick={handleExportData} className="export-btn">
            ⬇️ Export All Data
          </button>
          <label className="import-btn">
            ⬆️ Import Data
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              style={{ display: 'none' }}
            />
          </label>
          <button onClick={handleClearAllData} className="clear-btn">
            🗑️ Clear All Data
          </button>
        </div>
        <p className="data-note">
          💡 Export your data to backup all tasks, assignments, notes, and settings. 
          You can import it later to restore everything.
        </p>
      </div>
    </div>
  );
};

export default Profile;
