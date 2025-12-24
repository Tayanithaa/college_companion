// src/components/Navbar.js
import { Link } from 'react-router-dom';
import './Navbar.css'; // You can create this for styling

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/assignments">Assignments</Link>
      <Link to="/timetable">Timetable</Link>
      <Link to="/pomodoro">Pomodoro</Link>
      <Link to="/exam-countdown">Exam Countdown</Link>
      <Link to="/habit-tracker">Habit Tracker</Link>
    </nav>
  );
}

export default Navbar;
