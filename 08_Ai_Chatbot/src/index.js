const mongoose = require('mongoose');
const app = require('./app.js');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// ── Connect to MongoDB then start server ────────────────
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });