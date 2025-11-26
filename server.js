import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config.js';

import authRoutes from './routes/auth.js';
import workerRoutes from './routes/workers.js';
import summaryRoutes from './routes/summaries.js';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/summaries', summaryRoutes);

async function main(){
  await mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');
  app.listen(config.port, () => console.log(`Server listening on ${config.port}`));
}

main().catch(err => { console.error(err); process.exit(1); });
