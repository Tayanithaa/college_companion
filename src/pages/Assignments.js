import React, { useState, useEffect } from "react";
import '../styles/Assignments.css'; // Make sure you have a CSS file for styles

const Assignments = () => {
  // Load assignments from localStorage when the component mounts
  const loadAssignments = () => {
    const savedAssignments = JSON.parse(localStorage.getItem("assignments"));
    return savedAssignments ? savedAssignments : [];
  };

  const [assignments, setAssignments] = useState(loadAssignments());
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending");

  // Save assignments to localStorage whenever the assignments list changes
  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  const handleAddAssignment = (e) => {
    e.preventDefault();
    const newAssignment = {
      id: Date.now(),  // Unique ID for each assignment
      subject,
      dueDate,
      priority,
      status,
    };
    setAssignments([...assignments, newAssignment]);
    setSubject("");
    setDueDate("");
    setPriority("Low");
    setStatus("Pending");
  };

  const handleMarkComplete = (id) => {
    setAssignments(assignments.map((assignment) =>
      assignment.id === id ? { ...assignment, status: "Completed" } : assignment
    ));
  };

  const sortedAssignments = [...assignments].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.dueDate) - new Date(b.dueDate); // Sort by due date if priority is the same
  });

  return (
    <div className="assignments-container">
      <h2>Assignments</h2>

      {/* Add Assignment Form */}
      <form onSubmit={handleAddAssignment} className="assignment-form">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Assignment</button>
      </form>

      {/* Assignment List */}
      <div className="assignment-list">
        {sortedAssignments.length > 0 ? (
          sortedAssignments.map((assignment) => (
            <div className="assignment-item" key={assignment.id}>
              <div className="assignment-details">
                <h3>{assignment.subject}</h3>
                <p>Due: {new Date(assignment.dueDate).toLocaleString()}</p>
                <p>Priority: {assignment.priority}</p>
              </div>
              <div className="assignment-status">
                <span className={`status ${assignment.status.toLowerCase()}`}>
                  {assignment.status}
                </span>
                {assignment.status === "Pending" && (
                  <button onClick={() => handleMarkComplete(assignment.id)}>
                    Mark as Complete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No assignments added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Assignments;
