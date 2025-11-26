import React, { useState } from 'react';
import API, { setAuthToken } from '../api/api';

export default function Login({ onLogin }){
  const [u, setU] = useState('admin');
  const [p, setP] = useState('');
  async function submit(e){ e.preventDefault(); const res = await API.post('/auth/login', { username: u, password: p }); setAuthToken(res.data.token); onLogin(res.data.token); }
  return (<form onSubmit={submit}><input value={u} onChange={e=>setU(e.target.value)} /><input type="password" value={p} onChange={e=>setP(e.target.value)} /><button>Login</button></form>);
}
