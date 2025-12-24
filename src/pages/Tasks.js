import React, { useState, useEffect } from "react";
import "../styles/Tasks.css";

function Tasks() {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [editingIndex, setEditingIndex] = useState(null);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 🔔 One-time notifications per visit for tasks due tomorrow
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    tasks.forEach((task) => {
      if (!task.dueDate || task.completed) return;

      const taskDue = new Date(task.dueDate);
      const isDueTomorrow =
        taskDue.getFullYear() === tomorrow.getFullYear() &&
        taskDue.getMonth() === tomorrow.getMonth() &&
        taskDue.getDate() === tomorrow.getDate();

      if (isDueTomorrow) {
        new Notification("Task Reminder", {
          body: `"${task.text}" is due tomorrow!`,
        });
      }
    });
  }, []); // Empty array ensures it runs once

  const handleAddOrEdit = () => {
    if (task.trim() === "") return;

    const newTask = {
      text: task,
      dueDate,
      priority,
      completed: false,
    };

    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex] = { ...updated[editingIndex], ...newTask };
      setTasks(updated);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    setTask("");
    setDueDate("");
    setPriority("medium");
  };

  const handleDelete = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleToggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleEdit = (index) => {
    const t = tasks[index];
    setTask(t.text);
    setDueDate(t.dueDate);
    setPriority(t.priority);
    setEditingIndex(index);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="tasks-container">
      <h2>My Tasks</h2>

      <div className="task-input">
        <input
          type="text"
          placeholder="Task name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleAddOrEdit}>
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p style={{ textAlign: "center" }}>{progress}% Completed</p>

      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className={t.completed ? "completed" : ""}>
            <div>
              <span onClick={() => handleToggleComplete(index)}>
                {t.text}
              </span>{" "}
              <span className="priority-label">
                • <span className={`priority ${t.priority}`}>{t.priority}</span>
              </span>{" "}
              <span> (Due: {t.dueDate || "N/A"})</span>
            </div>
            <div>
              <button onClick={() => handleEdit(index)}>✏️</button>
              <button onClick={() => handleDelete(index)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
