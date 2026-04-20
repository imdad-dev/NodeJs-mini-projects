import mongoose from 'mongoose';

// ── Message Schema (embedded inside Conversation) ───────
const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// ── Conversation Schema ─────────────────────────────────
const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    default: 'New Conversation',
    trim: true,
  },
  messages: [messageSchema],
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;