import React, { useState, useEffect } from "react";
import "../styles/Tasks.css";

function Tasks() {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures it runs once

  const handleAddOrEdit = () => {
    if (task.trim() === "") return;

    const newTask = {
      text: task,
      dueDate,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
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

  // Filter and sort tasks
  const getFilteredAndSortedTasks = () => {
    let filtered = tasks;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Priority filter
    if (filterPriority !== "all") {
      filtered = filtered.filter(t => t.priority === filterPriority);
    }

    // Status filter
    if (filterStatus === "completed") {
      filtered = filtered.filter(t => t.completed);
    } else if (filterStatus === "pending") {
      filtered = filtered.filter(t => !t.completed);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "date") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === "priority") {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === "name") {
        return a.text.localeCompare(b.text);
      }
      return 0;
    });

    return sorted;
  };

  const filteredTasks = getFilteredAndSortedTasks();
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="tasks-container">
      <h2>My Tasks 📝</h2>

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

      <div className="progress-section">
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="progress-text">{progress}% Completed ({completedCount}/{tasks.length})</p>
      </div>

      {/* Search and Filter Section */}
      <div className="filters-section">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="filter-select"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      <ul className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((t, index) => {
            const originalIndex = tasks.indexOf(t);
            return (
              <li key={originalIndex} className={t.completed ? "completed" : ""}>
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => handleToggleComplete(originalIndex)}
                    className="task-checkbox"
                  />
                  <span className="task-text" onClick={() => handleToggleComplete(originalIndex)}>
                    {t.text}
                  </span>
                  <span className="task-meta">
                    <span className={`priority-badge ${t.priority}`}>
                      {t.priority}
                    </span>
                    <span className="due-date">
                      {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "No date"}
                    </span>
                  </span>
                </div>
                <div className="task-actions">
                  <button onClick={() => handleEdit(originalIndex)} className="edit-btn">✏️</button>
                  <button onClick={() => handleDelete(originalIndex)} className="delete-btn">🗑️</button>
                </div>
              </li>
            );
          })
        ) : (
          <p className="no-tasks">No tasks found. {searchTerm || filterPriority !== "all" || filterStatus !== "all" ? "Try adjusting your filters." : "Add a new task to get started!"}</p>
        )}
      </ul>
    </div>
  );
}

export default Tasks;
