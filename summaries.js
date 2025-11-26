import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { decryptJSON } from '../utils/crypto.js';
import Worker from '../models/Worker.js';

const router = express.Router();

router.post('/summarize/:id', requireAuth, async (req, res) => {
  const id = req.params.id;
  const w = await Worker.findOne({ smartHealthId: id }).exec();
  if (!w) return res.status(404).json({ error: 'Not found' });
  const medical = decryptJSON(w.medicalRecordsEncrypted);

  // For demo: return a short server-side summary using naive rules
  const summary = `Patient has ${Object.keys(medical || {}).length} medical record sections. Key items: ${Object.keys(medical || {}).slice(0,5).join(', ')}`;
  res.json({ summary, recordText: JSON.stringify(medical) });
});

export default router;
