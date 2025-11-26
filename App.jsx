import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import OfflineSync from './components/OfflineSync';
import { registerServiceWorker } from './serviceWorkerRegistration';
import './i18n';

export default function App(){
  const [token, setToken] = useState(null);
  React.useEffect(()=>{ registerServiceWorker(); }, []);
  return (<div><h1>Migrant Health</h1>{!token ? <Login onLogin={t=>setToken(t)} /> : <><Dashboard /><OfflineSync /></>}</div>);
}
