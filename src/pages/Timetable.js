import React, { useState, useEffect } from 'react';
import '../styles/Timetable.css';

const times = [
  "8:00 - 9:00",
  "9:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 1:00",
  "1:00 - 2:00",
  "2:00 - 3:00",
  "3:00 - 4:00"
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const EditableTimetable = () => {
  const [timetable, setTimetable] = useState(() => {
    // Try to load saved timetable from localStorage
    const saved = localStorage.getItem("timetable");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("timetable", JSON.stringify(timetable));
  }, [timetable]);

  const handleChange = (day, time, value) => {
    setTimetable(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: value
      }
    }));
  };

  return (
    <div className="timetable-container">
      <h2>My Editable Timetable</h2>
      <table className="timetable">
        <thead>
          <tr>
            <th>Time</th>
            {days.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map(time => (
            <tr key={time}>
              <td><strong>{time}</strong></td>
              {days.map(day => (
                <td key={day}>
                  <input
                    type="text"
                    value={(timetable[day] && timetable[day][time]) || ""}
                    onChange={(e) => handleChange(day, time, e.target.value)}
                    placeholder="Subject"
                    className="timetable-input"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTimetable;
