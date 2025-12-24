import React, { useState, useEffect } from 'react';
import '../styles/HabitTracker.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getLastResetDate = () => localStorage.getItem('lastResetDate');
const setLastResetDate = (dateStr) => localStorage.setItem('lastResetDate', dateStr);
const isMonday = () => new Date().getDay() === 1;

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');

  // Load from localStorage
  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    setHabits(storedHabits);

    const lastReset = getLastResetDate();
    const today = new Date();
    const todayStr = today.toDateString();

    if (isMonday() && lastReset !== todayStr) {
      const reset = storedHabits.map((habit) => ({
        ...habit,
        tracking: Array(7).fill(false),
      }));
      setHabits(reset);
      localStorage.setItem('habits', JSON.stringify(reset));
      setLastResetDate(todayStr);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (habitName.trim()) {
      const newHabit = {
        name: habitName,
        tracking: Array(7).fill(false),
        addedAt: Date.now(),
      };
      setHabits([...habits, newHabit]);
      setHabitName('');
    }
  };

  const toggleDay = (habitIndex, dayIndex) => {
    const updated = [...habits];
    updated[habitIndex].tracking[dayIndex] = !updated[habitIndex].tracking[dayIndex];
    setHabits(updated);
  };

  const deleteHabit = (index) => {
    const updated = habits.filter((_, i) => i !== index);
    setHabits(updated);
  };

  const getStreak = (tracking) => tracking.filter(Boolean).length;

  return (
    <div className="habit-tracker">
      <h2>Weekly Habit Tracker</h2>
      <div className="add-habit">
        <input
          type="text"
          placeholder="Enter habit name"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
        <button onClick={addHabit}>Add Habit</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Habit</th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
            <th>Streak</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, i) => (
            <tr key={i} className="fade-in">
              <td>{habit.name}</td>
              {habit.tracking.map((checked, dayIndex) => (
                <td key={dayIndex}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleDay(i, dayIndex)}
                  />
                </td>
              ))}
              <td>{getStreak(habit.tracking)}</td>
              <td>
                <button onClick={() => deleteHabit(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitTracker;
