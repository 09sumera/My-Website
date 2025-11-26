import crypto from 'crypto';
import config from '../config.js';

const KEY = config.aesKeyBase64 ? Buffer.from(config.aesKeyBase64, 'base64') : null;
if (!KEY || KEY.length !== 32) {
  console.warn('AES key not set or not 32 bytes. Provide a 32-byte base64 key in AES_KEY_BASE64.');
}

export function encryptJSON(obj) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const text = JSON.stringify(obj);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

export function decryptJSON(b64) {
  if (!b64) return null;
  const data = Buffer.from(b64, 'base64');
  const iv = data.slice(0, 12);
  const tag = data.slice(12, 28);
  const encrypted = data.slice(28);
  const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv);
  decipher.setAuthTag(tag);
  const out = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return JSON.parse(out.toString('utf8'));
}
