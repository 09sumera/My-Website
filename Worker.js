import mongoose from 'mongoose';

const WorkerSchema = new mongoose.Schema({
  smartHealthId: { type: String, index: true, unique: true },
  nameEncrypted: { type: String },
  dobEncrypted: { type: String },
  contactEncrypted: { type: String },
  language: { type: String, default: 'en' },
  medicalRecordsEncrypted: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Worker', WorkerSchema);
