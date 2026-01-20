import React, { useState, useEffect } from 'react';
import '../styles/Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = () => {
    if (!currentNote.title.trim() && !currentNote.content.trim()) return;

    if (editingId !== null) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === editingId 
          ? { ...note, ...currentNote, updatedAt: new Date().toISOString() }
          : note
      ));
      setEditingId(null);
    } else {
      // Create new note
      const newNote = {
        id: Date.now(),
        ...currentNote,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: getRandomColor()
      };
      setNotes([newNote, ...notes]);
    }

    setCurrentNote({ title: '', content: '' });
  };

  const handleEditNote = (note) => {
    setCurrentNote({ title: note.title, content: note.content });
    setEditingId(note.id);
  };

  const handleDeleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
      if (editingId === id) {
        setCurrentNote({ title: '', content: '' });
        setEditingId(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setCurrentNote({ title: '', content: '' });
    setEditingId(null);
  };

  const getRandomColor = () => {
    const colors = ['#fff9c4', '#f8bbd0', '#b2dfdb', '#c5cae9', '#ffccbc', '#e1bee7'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="notes-container">
      <h2>My Notes 📝</h2>

      <div className="notes-editor">
        <input
          type="text"
          placeholder="Note title..."
          value={currentNote.title}
          onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
          className="note-title-input"
        />
        <textarea
          placeholder="Write your note here..."
          value={currentNote.content}
          onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
          className="note-content-input"
          rows="6"
        />
        <div className="editor-actions">
          <button onClick={handleSaveNote} className="save-btn">
            {editingId !== null ? '💾 Update Note' : '➕ Add Note'}
          </button>
          {editingId !== null && (
            <button onClick={handleCancelEdit} className="cancel-btn">
              ❌ Cancel
            </button>
          )}
        </div>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="notes-count">{filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="notes-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <div 
              key={note.id} 
              className="note-card"
              style={{ backgroundColor: note.color }}
            >
              <h3 className="note-card-title">{note.title || 'Untitled'}</h3>
              <p className="note-card-content">{note.content}</p>
              <div className="note-card-footer">
                <span className="note-date">{formatDate(note.updatedAt)}</span>
                <div className="note-card-actions">
                  <button onClick={() => handleEditNote(note)} className="note-edit-btn">
                    ✏️
                  </button>
                  <button onClick={() => handleDeleteNote(note.id)} className="note-delete-btn">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-notes">
            <p>No notes found. {searchTerm ? 'Try a different search.' : 'Start by creating your first note!'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
