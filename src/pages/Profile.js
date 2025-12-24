// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [studyGoals, setStudyGoals] = useState('');
  const [motivationalQuote, setMotivationalQuote] = useState('');

  // Remove these if you're not using them yet
  // const [taskCompletion, setTaskCompletion] = useState(0); 
  // const [habitProgress, setHabitProgress] = useState(0);

  useEffect(() => {
    // Load profile info from localStorage or set defaults
    const savedName = localStorage.getItem('name');
    const savedGoals = localStorage.getItem('studyGoals');
    const savedQuote = localStorage.getItem('motivationalQuote');
    if (savedName) setName(savedName);
    if (savedGoals) setStudyGoals(savedGoals);
    if (savedQuote) setMotivationalQuote(savedQuote);
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem('name', name);
    localStorage.setItem('studyGoals', studyGoals);
    localStorage.setItem('motivationalQuote', motivationalQuote);
  };

  return (
    <div className="profile-container">
      <h2>Profile Setup</h2>
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
        <button onClick={handleSaveProfile}>Save Profile</button>
      </div>
      
      {/* Progress section */}
      {/* You can add this later when you dynamically calculate progress */}
      {/* <div className="profile-progress">
        <h3>Progress</h3>
        <p>Task Completion: {taskCompletion}%</p>
        <p>Habit Tracker Progress: {habitProgress}%</p>
      </div> */}
    </div>
  );
};

export default Profile;
