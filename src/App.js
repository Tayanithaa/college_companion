import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Assignments from './pages/Assignments';
import Timetable from './pages/Timetable';
import Pomodoro from './pages/Pomodoro';
import ExamCountdown from './pages/ExamCountdown';
import HabitTracker from './pages/HabitTracker';
import Profile from './pages/Profile'; // Added import for Profile component

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/exam-countdown" element={<ExamCountdown />} />
        <Route path="/habit-tracker" element={<HabitTracker />} />
        <Route path="/profile" element={<Profile />} /> {/* Added Profile route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
