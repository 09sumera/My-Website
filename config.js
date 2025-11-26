import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  aesKeyBase64: process.env.AES_KEY_BASE64,
  geminiApiKey: process.env.GEMINI_API_KEY
};
