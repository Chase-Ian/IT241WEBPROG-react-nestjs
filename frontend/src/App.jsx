import { useEffect, useState } from 'react';
import axios from 'axios';

const API = "http://localhost:3000/guestbook";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });

  const fetchEntries = async () => {
    const res = await axios.get(API);
    setEntries(res.data);
  };

  const handleSubmit = async (e) => {
  e.preventDefault(); // This stops the page from refreshing
  try {
    await axios.post(API, form);
    setForm({ name: '', message: '' }); // Clears the inputs
    fetchEntries(); // Refreshes the list
  } catch (error) {
    console.error("Error posting to guestbook:", error);
  }
};

  const deleteEntry = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchEntries();
  };

  const editEntry = async (id) => {
    const newMessage = prompt("Update your message:");
    if (newMessage) {
      await axios.put(`${API}/${id}`, { message: newMessage });
      fetchEntries();
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>My Guestbook</h1>
      
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
        <button type="submit">Sign Guestbook</button>
      </form>

      <hr />

      {entries.map(entry => (
        <div key={entry.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
          <strong>{entry.name}</strong>: {entry.message}
          <br />
          <button onClick={() => editEntry(entry.id)}>Edit</button>
          <button onClick={() => deleteEntry(entry.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}