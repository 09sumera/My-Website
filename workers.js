import express from 'express';
import Worker from '../models/Worker.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { encryptJSON, decryptJSON } from '../utils/crypto.js';
import { generateSmartHealthId } from '../utils/idGenerator.js';

const router = express.Router();

router.post('/enroll', requireAuth, async (req, res) => {
  const { personal, medical, language } = req.body; // personal & medical are JS objects
  const smartHealthId = generateSmartHealthId();
  try {
    const w = new Worker({
      smartHealthId,
      nameEncrypted: encryptJSON(personal.name),
      dobEncrypted: encryptJSON(personal.dob),
      contactEncrypted: encryptJSON(personal.contact),
      language: language || 'en',
      medicalRecordsEncrypted: encryptJSON(medical || {})
    });
    await w.save();
    res.json({ ok: true, smartHealthId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to enroll' });
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  const id = req.params.id;
  const w = await Worker.findOne({ smartHealthId: id }).exec();
  if (!w) return res.status(404).json({ error: 'Not found' });
  const personal = {
    name: decryptJSON(w.nameEncrypted),
    dob: decryptJSON(w.dobEncrypted),
    contact: decryptJSON(w.contactEncrypted)
  };
  const medical = decryptJSON(w.medicalRecordsEncrypted);
  res.json({ smartHealthId: w.smartHealthId, personal, medical, language: w.language });
});

export default router;
