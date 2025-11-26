import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config.js';

const router = express.Router();

// Demo staff user
const staff = [
  { id: 'staff-1', username: 'admin', passwordHash: bcrypt.hashSync('adminpass', 10), role: 'admin' },
];

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = staff.find(s => s.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, config.jwtSecret, { expiresIn: '8h' });
  res.json({ token });
});

export default router;
