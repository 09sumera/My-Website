import React, { useState } from 'react';
import API from '../api/api';

export default function Dashboard(){
  const [id, setId] = useState('');
  const [worker, setWorker] = useState(null);
  async function lookup(){ const r = await API.get(`/workers/${id}`); setWorker(r.data); }
  return (<div><h2>Dashboard</h2><input value={id} onChange={e=>setId(e.target.value)} placeholder="SHID-..." /><button onClick={lookup}>Lookup</button>{worker && (<div><pre>{JSON.stringify(worker, null, 2)}</pre></div>)}</div>);
}
