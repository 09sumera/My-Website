import { openDB } from 'idb';

export async function getDb(){
  return openDB('migrant-health', 1, { upgrade(db){ db.createObjectStore('outbox', { keyPath: 'id', autoIncrement: true }); db.createObjectStore('workers', { keyPath: 'smartHealthId' }); } });
}

export async function enqueueOutbox(item){ const db = await getDb(); await db.put('outbox', item); }
export async function getOutbox(){ const db = await getDb(); return db.getAll('outbox'); }
export async function clearOutbox(){ const db = await getDb(); const tx = db.transaction('outbox', 'readwrite'); await tx.objectStore('outbox').clear(); await tx.done; }
