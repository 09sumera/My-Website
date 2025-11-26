import { v4 as uuidv4 } from 'uuid';

export function generateSmartHealthId() {
  return `SHID-${uuidv4().toUpperCase()}`;
}
