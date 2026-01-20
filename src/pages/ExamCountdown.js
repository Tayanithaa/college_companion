import React, { useState, useEffect } from "react";
import '../styles/ExamCountdown.css'; // Make sure this is imported

const ExamCountdown = () => {
  const [examDate, setExamDate] = useState("");
  const [countdown, setCountdown] = useState(null);

  const calculateTimeLeft = (examDate) => {
    const examTime = new Date(examDate).getTime();
    const currentTime = new Date().getTime();
    const timeLeft = examTime - currentTime;

    if (timeLeft <= 0) return null;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    if (!examDate) return;

    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft(examDate);
      console.log(timeLeft); // Debugging log to check countdown
      setCountdown(timeLeft);
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [examDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (examDate) {
      setCountdown(calculateTimeLeft(examDate));
    }
  };

  return (
    <div className="exam-countdown-container">
      <h2>Exam Countdown</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
        />
        <button type="submit">Set Exam Date</button>
      </form>

      {countdown && countdown.days !== undefined ? (
        <div>
          <h3>Time Remaining</h3>
          <div className="countdown">
            <span className={`days ${countdown.days <= 1 ? 'low-time' : ''}`}>
              {countdown.days} Days
            </span>
            <span className={`hours ${countdown.hours <= 1 ? 'low-time' : ''}`}>
              {countdown.hours} Hours
            </span>
            <span className={`minutes ${countdown.minutes <= 1 ? 'low-time' : ''}`}>
              {countdown.minutes} Minutes
            </span>
            <span className={`seconds ${countdown.seconds <= 10 ? 'low-time' : ''}`}>
              {countdown.seconds} Seconds
            </span>
          </div>
        </div>
      ) : (
        <p>Exam has already passed or not set yet.</p>
      )}
    </div>
  );
};

export default ExamCountdown;
