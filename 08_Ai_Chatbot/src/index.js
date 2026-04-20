import mongoose from 'mongoose';
import app from './app.js';
import connectMongo from './DB/connectDB.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// ── Connect to MongoDB then start server ────────────────
connectMongo(MONGODB_URI);

app.listen(PORT , ()=>{
console.log(`Server is lisnetng at https://localhost:${PORT}`);
})
 