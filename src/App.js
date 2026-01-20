import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Assignments from './pages/Assignments';
import Timetable from './pages/Timetable';
import Pomodoro from './pages/Pomodoro';
import ExamCountdown from './pages/ExamCountdown';
import HabitTracker from './pages/HabitTracker';
import Profile from './pages/Profile';
import Notes from './pages/Notes';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={
              <PrivateRoute>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/assignments" element={<Assignments />} />
                  <Route path="/timetable" element={<Timetable />} />
                  <Route path="/pomodoro" element={<Pomodoro />} />
                  <Route path="/exam-countdown" element={<ExamCountdown />} />
                  <Route path="/habit-tracker" element={<HabitTracker />} />
                  <Route path="/notes" element={<Notes />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </PrivateRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
