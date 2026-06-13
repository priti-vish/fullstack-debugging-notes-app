import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import "./Notes.css";

export function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:3000/notes";

  const fetchNotes = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    }

    setTitle("");
    setContent("");
    setEditId(null);
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    fetchNotes();
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  return (
    <div className="app-layout">
      <NavBar />

      <main className="main">
        <h2>Notes</h2>

        {/* FORM */}
        <form className="note-form" onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">
            {editId ? "Update Note" : "Add Note"}
          </button>
        </form>

        {/* NOTES */}
        <div className="notes-grid">
          {notes.length === 0 ? (
            <div className="empty">
              <h3>No Notes Yet</h3>
              <p>Create your first note above 👆</p>
            </div>
          ) : (
            notes.map((note) => (
              <div className="note-card" key={note._id}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>

                <div className="actions">
                  <button onClick={() => handleEdit(note)}>Edit</button>
                  <button onClick={() => handleDelete(note._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}