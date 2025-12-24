import React, { useState, useEffect } from "react";
import bellSound from "../assets/bell.mp3"; // Make sure this file exists
import '../styles/Pomodoro.css'; // Your external CSS

const Pomodoro = () => {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [time, setTime] = useState(focusMinutes * 60);
  const [mode, setMode] = useState("focus");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    } else if (time === 0) {
      const audio = new Audio(bellSound);
      audio.play();

      if (mode === "focus") {
        setMode("break");
        setTime(breakMinutes * 60);
      } else {
        setMode("focus");
        setTime(focusMinutes * 60);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, time, mode, focusMinutes, breakMinutes]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSetTimer = () => {
    setMode("focus");
    setTime(focusMinutes * 60);
    setIsRunning(false);
  };

  return (
    <div className="pomodoro-container">
      <h2>{mode === "focus" ? "Focus Time" : "Break Time"}</h2>

      <div className="input-group">
        <label>
          Focus Minutes:
          <input
            type="number"
            value={focusMinutes}
            onChange={(e) => setFocusMinutes(Number(e.target.value))}
          />
        </label>
        <label>
          Break Minutes:
          <input
            type="number"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Number(e.target.value))}
          />
        </label>
        <button onClick={handleSetTimer}>
          Set Timer
        </button>
      </div>

      <h1 className="timer-display">{formatTime(time)}</h1>

      <div className="button-group">
        {!isRunning ? (
          <button onClick={() => setIsRunning(true)}>Start</button>
        ) : (
          <button onClick={() => setIsRunning(false)}>Pause</button>
        )}
        <button onClick={handleSetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Pomodoro;
