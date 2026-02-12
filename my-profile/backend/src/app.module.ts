import { useEffect, useState } from 'react';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const API = "/api/guestbook";

  const load = () => fetch(API).then(r => r.json()).then(setEntries);
  useEffect(() => { load(); }, []);

  const send = async (e) => {
    e.preventDefault();
    await fetch(API, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name, message: msg}) });
    setName(''); setMsg(''); load();
  };

  const del = async (id) => { await fetch(`${API}/${id}`, {method: 'DELETE'}); load(); };

  return (
    <div style={{padding: '20px', fontFamily: 'sans-serif'}}>
      <h1>Guestbook</h1>
      <form onSubmit={send}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required /><br/>
        <textarea placeholder="Message" value={msg} onChange={e => setMsg(e.target.value)} required /><br/>
        <button type="submit">Post</button>
      </form>
      {entries?.map(e => (
        <div key={e.id} style={{borderBottom: '1px solid #ccc', margin: '10px 0'}}>
          <p><strong>{e.name}</strong>: {e.message}</p>
          <button onClick={() => del(e.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
