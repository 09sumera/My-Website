import React from 'react';
import { getOutbox, clearOutbox } from '../idb/idb';
import API from '../api/api';

export default function OfflineSync(){
  async function sync() {
    const out = await getOutbox();
    for (const item of out) {
      try { await API.post(item.path, item.payload); } catch (err) { console.error('failed to sync', err); }
    }
    await clearOutbox();
    alert('Sync complete');
  }
  return <button onClick={sync}>Sync offline data</button>;
}
